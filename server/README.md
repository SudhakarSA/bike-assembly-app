# **Bike Assembly System - Backend**

This is the backend server for the **Bike Assembly System**, built with **Node.js**, **Express**, and **MongoDB**. The server handles employee authentication, bike assembly operations, and provides data for the admin dashboard.

---

## **Features**
- Employee login with JWT-based authentication.
- Track bike assembly times and records for employees.
- Admin dashboard APIs for:
  - Total bikes assembled within a date range.
  - Employee productivity data.

---

## **Tech Stack**
- **Node.js**: Backend runtime.
- **Express**: Web framework for API development.
- **MongoDB**: Database for storing employee and production data.
- **JWT**: Authentication using JSON Web Tokens.

---

## **Installation**

### **Prerequisites**
1. **Node.js** (v14 or higher) installed on your system.
2. **MongoDB** installed and running locally or on a server.
3. A package manager like `npm` or `yarn`.

### **Steps to Run**
1. **Clone the repository**:
   ```bash
   tar xvzf bike-assembly-app.tar.gz
   cd bike-assembly-backend/server
   npm i
   node seed.js (One Time)
   node server.js
