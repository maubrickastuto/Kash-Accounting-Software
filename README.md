# Kash. 💼✨

**Kash.** is a modern, premium, and fully-featured financial and accounting application built for desktops. It acts as an all-in-one hub for managing your business's operations, banking, payroll, and core accounting, featuring real-time data sync through Firebase.

<div align="center">
  <em>Sleek, fast, and designed to make accounting look and feel premium.</em>
</div>

---

## 🚀 Features

### 1. Operations Hub
Manage the core physical aspects of your business:
- **Inventory Management**: Track stock levels, unit prices, and product catalogs.
- **Inventory Adjustments**: Handle write-offs and write-ons with direct integration to the general ledger.
- **Fixed Assets**: Track properties, vehicles, and equipment with automated depreciation (Straight-Line, Declining Balance, SYD, or Units of Production).

### 2. Sales Hub
Handle accounts receivable and customer relationships:
- **Customers**: Manage clients, their contact information, and track outstanding balances.
- **Sales Invoices**: Create professional invoices with automated tax calculations and ledger posting.
- **Receipts**: Easily record payments against invoices.

### 3. Purchases Hub
Handle accounts payable and supplier relationships:
- **Suppliers**: Maintain supplier directories and billing information.
- **Purchase Bills**: Log expenses and inventory purchases.
- **Payments**: Record outgoing cash flow and match it against vendor bills.

### 4. Banking Hub
Stay on top of your cash flow:
- **Bank Accounts**: Create and manage multiple checking, savings, or petty cash accounts.
- **Bank Feed**: Reconcile transactions, build bank rules, and match deposits/withdrawals.
- **Transfers**: Log inter-account transfers seamlessly.

### 5. Payroll Hub
Ensure your team gets paid on time:
- **Employees**: Store employee details and hourly rates.
- **Timesheets**: Log billable and non-billable hours.
- **Payslips**: Generate payslips automatically factoring in earnings, deductions, and tax contributions.

### 6. Accounting Hub
For the numbers experts:
- **Chart of Accounts**: Fully customizable multi-level account structure (Assets, Liabilities, Equity, Income, Expenses).
- **Journal Entries**: Post manual adjusting entries for complex scenarios.
- **General Ledger**: A robust dual-entry accounting engine running under the hood for perfect financial integrity.

---

## 🛠️ Tech Stack

- **Frontend Framework**: React 19 + Vite
- **Desktop Wrapper**: Electron
- **Styling**: Tailwind CSS (v4) + Custom Premium Theme + Framer Motion (Animations)
- **Icons**: Lucide React
- **Database & Auth**: Firebase (Firestore & Authentication)

---

## 💻 Getting Started (Local Development)

**Prerequisites:**  
- [Node.js](https://nodejs.org/en/) (v18+ recommended)
- A Firebase Project (for Auth and Firestore)

### 1. Clone & Install
Clone the repository and install all dependencies:
```bash
git clone https://github.com/your-username/kash.git
cd kash
npm install
```

### 2. Configure Firebase Environment Variables
Create a `.env` file in the root directory and add your Firebase credentials:
```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```
*(Note: A `.env.example` file is provided in the repository for reference. Your real `.env` file is safely ignored by git!)*

### 3. Run the App
To run the app locally in development mode (which starts the Vite dev server and opens the Electron app):
```bash
npm run electron:dev
```

### 4. Build for Production
To package the app into a standalone `.exe` installer for Windows:
```bash
npm run electron:build
```
Once finished, you can find the installer inside the `release/` directory.

---

## 🛡️ Security Note

All API keys, secrets, and environment configurations must remain in the `.env` file. This file is tracked by `.gitignore` and **will not** be uploaded to GitHub. 

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
