# Install Kash

Download the matching package from [Kash releases](https://github.com/maubrickastuto/Kash-Accounting-Software/releases/tag/v1.0.0-preview.1). Filenames have no `test` suffix. This release is a preview connected to the existing free staging backend. It requires Internet access and Firebase sign-in.

| Computer                 | Package                    |
| ------------------------ | -------------------------- |
| Windows x64              | `Kash-1.0.0-win-x64.exe`   |
| Mac with Apple Silicon   | `Kash-1.0.0-mac-arm64.dmg` |
| Mac with Intel processor | `Kash-1.0.0-mac-x64.dmg`   |

Compare the file's SHA-256 with `SHA256SUMS.txt` from the same release. On Windows, use PowerShell `Get-FileHash -Algorithm SHA256 <file>`. On Mac, use `shasum -a 256 <file>`.

Run the Windows installer with normal user permissions. On Mac, open the DMG, drag Kash.app to Applications and eject the disk. ZIP archives contain the same application bundles. Windows is unsigned, and Mac builds use ad hoc signing without Apple notarization. Review any OS trust decision deliberately; keep system security protections enabled.

Native install, mount/Gatekeeper, launch, provider sign-in, update and uninstall acceptance remain pending. Use a designated preview company first. Post an invoice and partial manual receipt, reload, compare reports, print and verify an attachment download. Export a protected backup and restore it into a separate company. Keep the original files and backup password separately.

Before upgrading an older Kash installation, export its original books first. Unversioned legacy books remain read-only until reviewed migration. The installer is not an independent backup or an offline server. Do not put private server credentials into client configuration.

Actual-company settings, opening balances, migration and tax/payroll policy need business/accountant review before real books. Philippine presets do not provide statutory filing. Free provider quotas can pause service; no paid subscription or signing service is required for this preview. See [the business guide](BUSINESS_GUIDE.md) for supported workflows and limits.
