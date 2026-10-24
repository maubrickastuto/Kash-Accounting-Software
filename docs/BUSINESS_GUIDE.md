# Running a business in Kash

This release candidate supports manual, single-base-currency bookkeeping. Use the staging environment and a separate test company for acceptance. Statutory filings, automated statutory payroll, foreign-exchange settlement, online checkout and unattended email delivery are not active services.

## Set up and review the books

1. Create the company with its actual base currency, country and contact details. In Settings, review the timezone, fiscal year, chart of accounts, control mappings, document numbering and payment terms before posting. Changing base currency or control mappings after posting requires a reviewed migration.
2. Configure tax codes for the business's actual treatment. A Philippine preset is a starting configuration, not BIR registration, approved invoicing, return preparation or tax advice. Have the responsible accountant review the setup and actual sample documents.
3. Agree a cutover date and opening trial balance. New companies start at zero. Enter ordinary bank/equity opening balances through a balanced manual journal; use source workflows for receivables, payables, stock, wages and fixed assets. Existing subledgers, accumulated depreciation and historical tax balances need a reviewed import/migration. Do not force them into an ordinary manual control-account journal or invent past invoices to make a balance match.
4. Compare the opening trial balance, balance sheet, aging, stock quantities/value and asset register with the approved source records. Stock opening equity is available only for the first positive movement of each item. Asset openings use equity, with unique asset codes assigned when omitted; a new purchase can start from a zero-value asset and be capitalized through its bill. Custom register accounts cannot be posted through ordinary journals or bank lines. Keep the original files. A balanced journal alone does not establish that an opening balance is correct.
5. Invite each member with the permissions they need. The owner controls membership changes and complete backups. Payroll/staff access is a separate explicit grant; posting and settings permissions still apply. Existing members receive no payroll grant automatically. Full audit snapshots require both report and payroll access because old audit records can contain staff information.

General-ledger amounts and narrations are shared with book members. New payroll journals use general descriptions; older postings may contain employee names and are retained unchanged. Payroll permission protects staff masters, payslips and timesheets rather than concealing the business's wage expense.

## Record day-to-day activity

Create a customer or supplier, then prepare the invoice or bill with its real issue date, due date, reviewed line prices, discounts and taxes. Check the printed view and customer/supplier details. Posting creates its journal and reference together. Posted tax and stock-cost snapshots remain fixed when settings change later.

Record receipts and payments only after the real bank/cash movement, choosing its actual date and account. Allocate partial amounts explicitly; unapplied payments remain credit available for later allocation or a manual refund. There is no simulated checkout. An allocation moves outstanding balances; it does not create another bank movement.

Use a quote or order for an unposted commercial document. Convert it once when ready to post. For recurring invoices or bills, review the due periods, prepare drafts, correct their lines and choose the posting date before approving them. A paused template retains missed periods; a skip requires an explicit record. Templates do not post automatically while the app is closed.

Delivery history records staff actions through email, post, hand delivery or another channel. “Prepare email” opens a draft in your email application. Mark “sent” only after you send it, and use a correction event if a previous record was wrong. Preparing a reminder does not send it or settle its invoice.

## Correct financial records

Use a credit note for a quantity return or price allowance. Quantity returns use their original issue cost. A purchase price allowance keeps quantities unchanged and needs a reviewed inventory/COGS split. Apply available credit to another invoice of the same party or record a separate actual bank refund. Reverse linked credit uses before undoing a source credit that has already been used.

Reverse a mistaken payment with an actual correction date and reason. Reconciled payments require the latest relevant bank statements to be reopened first. Reconciliation corrections retain the previous statement, actor and reason; replace it with a new reviewed reconciliation. Reopen later statements for the same bank first. Closed periods remain protected.

Post manual journals separately from invoices, payroll and other source-document commands. Source journals and reference numbers are derived by the accounting service. An ambiguous combined request is rejected rather than silently omitting a journal.

## Stock, assets and payroll

Stock quantities and weighted-average carrying values come from posted purchases, issues, returns and adjustments. Master items start at zero. Review the physical count and valuation before an adjustment. Negative stock and backdated movements that need revaluation are rejected. A complete issue clears the remaining rounded value.

Use the asset workflow for capitalization, depreciation, disposal and linked disposal correction. Complete earlier depreciation periods in order and enter production units explicitly where required. Existing assets with prior depreciation need a reviewed take-on history.

Payroll uses manually configured earnings, deductions and employer contributions. Review quantities, rates, pay periods and mappings before processing. A used payroll item's accounts/type cannot be rewritten; create a new item for a changed treatment. Processed timesheets cannot be reused or edited. Record the exact net salary payment with its actual date and bank account. If a bank rejects it, reverse the payment; the salary accrual remains due. Printable payslips retain the employee/company snapshot taken at posting. Statutory calculations and submission remain a separate reviewed process.

## Keep evidence and independent backups

Attach original PDF, PNG, JPEG or WebP files to invoices, non-payroll payments and manual journals. Book members can download these files. Downloads verify their stored checksum. The limits are 2 MiB per file, 500 retained files and 25 MiB per business, including archived files. Reselect the same original file to resume a stopped upload. Incomplete uploads can be discarded without deleting a published attachment.

The owner can download a complete JSON backup or a password-protected `.kash` backup from Settings or the company selector. Complete exports fetch and verify the actual files, including archived evidence. A missing or damaged file stops the export. Protect the backup with a separate password of at least 12 characters and keep that password separately. Encryption/decryption occurs on the device; the password cannot be reset by the service.

Restore always creates a separate company. Check its trial balance, aging and attachment downloads before treating it as a usable recovery. Reselect the same original backup to resume an interrupted upload. The selector lists incomplete imports for recovery or cancellation. The combined upload envelope is limited to 50 MB and decoded state to 48 MB; a large ledger and its files share this allowance. Restore transactions are also bounded by document bytes and write count. An oversized individual record requires a reviewed import.

Keep independent backups after significant work and before period close, and perform a periodic restore drill. A saved environment, installer or Firestore sync indicator is not an independent company backup. Protect exported files as business records.

## Recover an interrupted posting

If the response is lost while the book remains open, use **Retry original operation**. It reuses the original request ID.

If the tab or app closed, reopen the same company and use **Check pending operation**. A confirmed result reloads the original posting. If no completed operation exists, **Cancel uncommitted operation** prevents that request from posting later before you enter the transaction again. A cancellation racing a successful commit returns the confirmed posting. Only an opaque operation reference and time are stored for this recovery; the financial request is not cached on the device.

Offline books are read-only. If a free service quota is exhausted, retain the original operation or upload and retry it after service resumes. Do not enter a second financial transaction merely because an acknowledgement is missing.

## Reconcile and close

Resolve imported bank lines, compare cleared entries with each actual statement, review trial balance/control accounts and dated aging, then take a complete backup. Close through an agreed date in Settings. The close date cannot be moved backward through normal posting commands. Review all source documents and jurisdiction-specific obligations with the responsible accountant before an actual production cutover.

## Desktop testing

See [installation guide](INSTALLATION.md) for exact build commands, checksums, signing status and platform acceptance. Desktop packages connect to the configured online backend; they are not an offline accounting server. Keep the backend, rules and schema-compatible frontend together when releasing a new version.

Large tables show 50 rows by default, with 25/50/100 choices and page navigation. Search considers the full list. Printing and exports retain the complete selected dataset.
