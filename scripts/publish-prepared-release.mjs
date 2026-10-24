import fs from "node:fs/promises";
import { createReadStream, createWriteStream } from "node:fs";
import { createHash } from "node:crypto";
import { pipeline } from "node:stream/promises";
import { Readable, Transform } from "node:stream";
import path from "node:path";

const repository = "maubrickastuto/Kash-Accounting-Software";
const plan = JSON.parse(await fs.readFile("release-plan.json", "utf8"));
if (process.env.GITHUB_REPOSITORY !== repository || !process.env.GH_TOKEN)
  throw new Error("Run only in the public distribution repository workflow.");
const event = JSON.parse(
  await fs.readFile(process.env.GITHUB_EVENT_PATH, "utf8"),
);
if (event.repository?.private !== false)
  throw new Error("Public standard runners only.");
if (
  !/^https:\/\/desktop-release-[a-f0-9]{12}--kash-accounting-staging\.netlify\.app\/handoff-manifest\.json$/.test(
    plan.manifestURL,
  ) ||
  !/^[a-f0-9]{64}$/.test(plan.manifestSHA256) ||
  !/^[a-f0-9]{40}$/.test(plan.sourceCommit) ||
  !Number.isSafeInteger(plan.releaseId) ||
  plan.releaseId <= 0 ||
  !/^v\d+\.\d+\.\d+-preview\.\d+$/.test(plan.tag)
)
  throw new Error("Invalid prepared release plan.");
const headers = {
  Authorization: `Bearer ${process.env.GH_TOKEN}`,
  Accept: "application/vnd.github+json",
  "X-GitHub-Api-Version": "2022-11-28",
  "User-Agent": "Kash-desktop-release",
};
const base = `https://api.github.com/repos/${repository}`;
async function api(resource, options = {}) {
  const response = await fetch(base + resource, {
    ...options,
    headers: { ...headers, ...options.headers },
    signal: AbortSignal.timeout(120000),
  });
  if (!response.ok)
    throw new Error(`GitHub operation failed (${response.status}).`);
  return response.json();
}
const repo = await api("");
if (repo.private !== false)
  throw new Error("The distribution repository must remain public.");
const release = await api(`/releases/${plan.releaseId}`);
if (!release.draft || release.prerelease !== true)
  throw new Error("Upload only to the prepared preview draft.");
const response = await fetch(plan.manifestURL, {
  signal: AbortSignal.timeout(30000),
});
if (!response.ok) throw new Error("Prepared manifest is unavailable.");
const bytes = Buffer.from(await response.arrayBuffer());
if (
  bytes.length > 1048576 ||
  createHash("sha256").update(bytes).digest("hex") !== plan.manifestSHA256
)
  throw new Error("Prepared manifest checksum failed.");
const manifest = JSON.parse(bytes.toString("utf8"));
if (
  manifest.sourceCommit !== plan.sourceCommit ||
  manifest.sourceDirty !== false ||
  manifest.nativeExecutionTested !== false ||
  !Array.isArray(manifest.assets) ||
  manifest.assets.length < 5 ||
  manifest.assets.length > 20 ||
  new Set(manifest.assets.map((asset) => asset.name)).size !==
    manifest.assets.length
)
  throw new Error("Invalid artifact provenance.");
if (manifest.assets.reduce((sum, asset) => sum + asset.bytes, 0) > 800_000_000)
  throw new Error("Release exceeds prepared size bound.");
await fs.mkdir("downloads", { recursive: true });
const uploaded = [];
for (const asset of manifest.assets) {
  if (
    !/^[A-Za-z0-9][A-Za-z0-9._-]{0,149}$/.test(asset.name) ||
    /test/i.test(asset.name) ||
    !/\.(exe|dmg|zip|json|txt|md|blockmap)$/.test(asset.name) ||
    !/^[a-f0-9]{64}$/.test(asset.sha256) ||
    !Number.isSafeInteger(asset.bytes) ||
    asset.bytes <= 0 ||
    asset.bytes > 200_000_000
  )
    throw new Error("Invalid artifact metadata.");
  const expectedDigest = `sha256:${asset.sha256}`;
  const existing = release.assets.find((item) => item.name === asset.name);
  if (existing) {
    if (existing.size !== asset.bytes || existing.digest !== expectedDigest)
      throw new Error("Existing asset differs; refusing to replace it.");
    uploaded.push(asset.name);
    continue;
  }
  const parts = asset.parts || [
    { name: asset.name, bytes: asset.bytes, sha256: asset.sha256 },
  ];
  if (
    !Array.isArray(parts) ||
    !parts.length ||
    parts.length > 32 ||
    parts.reduce((sum, part) => sum + part.bytes, 0) !== asset.bytes
  )
    throw new Error("Invalid prepared file parts.");
  let size = 0;
  const hash = createHash("sha256");
  const file = path.join("downloads", asset.name);
  await fs.rm(file, { force: true });
  for (const part of parts) {
    if (
      !/^[A-Za-z0-9][A-Za-z0-9._-]{0,149}$/.test(part.name) ||
      !/^[a-f0-9]{64}$/.test(part.sha256) ||
      !Number.isSafeInteger(part.bytes) ||
      part.bytes <= 0 ||
      part.bytes > 10_000_000
    )
      throw new Error("Invalid prepared file part.");
    const url = new URL(part.name, plan.manifestURL);
    if (url.origin !== new URL(plan.manifestURL).origin)
      throw new Error("Unexpected artifact origin.");
    const downloaded = await fetch(url, {
      signal: AbortSignal.timeout(180000),
    });
    if (!downloaded.ok || !downloaded.body)
      throw new Error("Prepared file download failed.");
    let partSize = 0;
    const partHash = createHash("sha256");
    const check = new Transform({
      transform(chunk, _encoding, callback) {
        partSize += chunk.length;
        size += chunk.length;
        if (partSize > part.bytes || size > asset.bytes)
          return callback(new Error("Artifact exceeds expected size."));
        partHash.update(chunk);
        hash.update(chunk);
        callback(null, chunk);
      },
    });
    await pipeline(
      Readable.fromWeb(downloaded.body),
      check,
      createWriteStream(file, { flags: "a" }),
    );
    if (partSize !== part.bytes || partHash.digest("hex") !== part.sha256)
      throw new Error("Prepared file part checksum failed.");
  }
  if (size !== asset.bytes || hash.digest("hex") !== asset.sha256)
    throw new Error("Downloaded artifact checksum failed.");
  const target = new URL(release.upload_url.split("{")[0]);
  if (target.hostname !== "uploads.github.com" || target.protocol !== "https:")
    throw new Error("Unexpected GitHub upload endpoint.");
  target.searchParams.set("name", asset.name);
  const result = await fetch(target, {
    method: "POST",
    headers: {
      ...headers,
      "Content-Type": "application/octet-stream",
      "Content-Length": String(size),
    },
    body: createReadStream(file),
    duplex: "half",
    signal: AbortSignal.timeout(300000),
  });
  if (!result.ok)
    throw new Error(`GitHub asset upload failed (${result.status}).`);
  const remote = await result.json();
  if (remote.size !== size || remote.digest !== expectedDigest)
    throw new Error("GitHub asset checksum differs.");
  uploaded.push(asset.name);
  await fs.unlink(file);
  console.log(
    JSON.stringify({ uploaded: asset.name, bytes: size, sha256: asset.sha256 }),
  );
}
await fs.writeFile(
  process.env.GITHUB_STEP_SUMMARY,
  `Verified and uploaded ${uploaded.length} files to preview draft ${plan.releaseId}.\n\nSource: ${plan.sourceCommit}\n\nPublishing remains a separate final step.\n`,
);
console.log(
  JSON.stringify({
    releaseId: plan.releaseId,
    uploaded: uploaded.length,
    published: false,
  }),
);
