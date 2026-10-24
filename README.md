# Kash Accounting

Desktop bookkeeping for Windows and macOS, using the existing free online backend.

## Download

[Kash 1.0.0 preview release](https://github.com/maubrickastuto/Kash-Accounting-Software/releases/tag/v1.0.0-preview.1)

- [Windows x64 installer](https://github.com/maubrickastuto/Kash-Accounting-Software/releases/download/v1.0.0-preview.1/Kash-1.0.0-win-x64.exe)
- [Mac Apple Silicon installer](https://github.com/maubrickastuto/Kash-Accounting-Software/releases/download/v1.0.0-preview.1/Kash-1.0.0-mac-arm64.dmg)
- [Mac Intel installer](https://github.com/maubrickastuto/Kash-Accounting-Software/releases/download/v1.0.0-preview.1/Kash-1.0.0-mac-x64.dmg)

ZIP alternatives, checksums, build provenance and integrity reports are attached to the same release. Generated installers are Release assets and are excluded from the Git source folders.

Read the [installation guide](docs/INSTALLATION.md) and [business guide](docs/BUSINESS_GUIDE.md). These are unsigned Windows/ad hoc Mac preview packages, without notarization. Native platform acceptance remains pending. They require Internet access and connect to the staging service; use a designated preview company and independent protected backups. Actual-company policy/opening/migration acceptance remains necessary before real books.

## Included workflows

Manual invoices/bills/payments and corrections, dated reports, stock and asset registers, configured payroll with explicit access, reviewed recurring drafts and delivery records, private original documents, and complete encrypted independent recovery. New books use schema 6; posted schemas 2–5 remain supported and legacy schema 1 stays read-only. Statutory filing, live bank/payment integration and foreign exchange are outside this release.

Firebase remains Spark and hosting remains the existing hard-capped Netlify Free plan. Release uploads use a standard public GitHub Actions runner, which is free. No private CI minutes, paid storage, subscription, automatic top-up or certificate was purchased.

Development source is maintained in [Kash-Accounting-App](https://github.com/maubrickastuto/Kash-Accounting-App) with repository access required. Release manifests identify its exact source commit. The older PDF manual in this repository is historical; the guides above describe the current release.
