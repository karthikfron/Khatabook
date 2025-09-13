# 📘 Khatabook

**Khatabook** is a modern, responsive web application built with React + TypeScript that helps small shopkeepers manage credit sales, track customers, record repayments, and monitor outstanding balances — all from a single dashboard.  

It features secure authentication (via [DummyJSON Auth](https://dummyjson.com/docs/auth)), customer detail cards, transaction history, PDF export, toast notifications, and a dark/light theme toggle for a smooth and professional user experience.

---

## ✨ Features

### 🔑 Authentication
- **Login** using DummyJSON Auth API  
  - **Endpoint:** `POST https://dummyjson.com/auth/login`  
  - **Request Example:**  
    ```json
    {
      "username": "emilys",
      "password": "emilyspass"
    }
    ```
  - **Response:** Returns `accessToken`, `refreshToken`, and user details  
- **Sign-Up (Mocked):** Client-side form to simulate account creation (no backend)  

### 📊 Dashboard
- View all customers with:
  - Name, balance, next due date, and status  
- Overdue entries are highlighted  
- Click any row to open a **Customer Detail Card**  

### 🧾 Customer Detail Card
- Navigate between customers (Previous / Next)  
- Displays:
  - Contact info, address, join date  
  - Total credit, outstanding balance, next due date  
- Transactions list (loans + repayments)  
- **Export to PDF** (styled report using `jsPDF` + `jspdf-autotable`)  

### 📝 Forms
- Add Customer  
- Add Loan  
- Record Repayment  

### 🎨 UI/UX
- Tailwind CSS v3 for clean, mobile-responsive design  
- **Dark/Light theme toggle** (saved in `localStorage`)  
- Sidebar + Header navigation with Material-UI Icons  
- Toast notifications with [Sonner](https://github.com/phntmxyz/sonner)  
- Loading spinner on login (`react-spinners`)  

---

## 🛠 Tech Stack

- **Framework:** React 18 + Vite  
- **Language:** TypeScript  
- **Styling:** Tailwind CSS v3 (`dark:` mode support)  
- **Routing:** React Router v7  
- **HTTP Client:** Axios  
- **Toasts:** Sonner  
- **PDF Export:** jsPDF + jspdf-autotable  
- **Icons:** Material UI Icons  
- **Auth Mock:** DummyJSON  

---

## 🚀 Getting Started

### ✅ Prerequisites
- Node.js **≥ 18.x**  

### ⚡ Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/karthikfron/Khatabook.git
   cd Khatabook
   
2.**Install Dependencies**
  ```bash
     npm install
3.**Start development server**
   ```bash
     npm run dev
