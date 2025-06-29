# 🧑‍💼 Employee Management System (EMS)

A full-stack Employee Management System for managing employees and tasks, built with **Node.js**, **Express.js**, **React.js**, **Tailwind CSS**, and **MongoDB**.

Admins can create tasks and assign them to employees, and employees can mark tasks as completed or failed.

---

## ✨ Features

✅ **Secure authentication** with JWT and password hashing using bcrypt  
✅ **Role-based authorization** for Admin and Employee users  
✅ **Admin dashboard**: Create and assign tasks to employees  
✅ **Employee dashboard**: View assigned tasks and mark them as completed or failed  
✅ **Modern UI** built with React.js and Tailwind CSS  
✅ **RESTful API** backend with Express.js  
✅ **MongoDB database** for storing users, roles, and tasks

---

## 🚀 Tech Stack

- **Frontend**: React.js, Tailwind CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (Mongoose ODM)
- **Authentication**: JWT, bcrypt
- **Other**: React Router

---

## 🗂️ Backend Folder Structure

backend/
-  ├─ model/
-   ├─ admin.js           # Mongoose schema for admin users
-   ├─ employee.js        # Mongoose schema for employees
-   └─ task.js            # Mongoose schema for tasks
-  ├─ routes/
-   ├─ admin_routes.js    # Express routes for admin operations
-   ├─ employee_routes.js # Express routes for employee operations
-   └─ task_routes.js     # Express routes for task management
- ├─ node_modules/         # Project dependencies
-  ├─ .env                  # Environment variables (database URI, JWT secret)
-  ├─ db.js                 # Database connection setup
-  ├─ index.js              # Main entry point for the Express server
-  ├─ jwt.js                # JWT utility functions for authentication
-  ├─ package.json          # Project metadata and dependencies
-  └─ package-lock.json     # Exact dependency versions for reproducible installs

---

## 📚 API Endpoints

### 🔐 Admin Routes (`/admin`)
- **POST** `/signup` — Register a new admin
- **POST** `/signin` — Admin login

---

### 👨‍💼 Employee Routes (`/employee`)
- **POST** `/signup` — Register a new employee
- **POST** `/signin` — Employee login
- **GET** `/` — Get all employees
- **GET** `/:id` — Get details of a specific employee by ID

---

### 📋 Task Routes (`/task`)
- **GET** `/` — Get all tasks
- **GET** `/:employeeId` — Get all tasks assigned to a specific employee by their Employee ID
- **POST** `/:username` — Create a new task assigned to the specified employee username
- **PATCH** `/:employeeId/:taskId` — Update a specific task for a specific employee

---

### ⚙️ Notes
- All routes return JSON responses.
- Protected routes require a valid JWT token in the `Authorization` header.
- Admin and employee users have different permissions:
  - **Admins** can create tasks and manage employees.
  - **Employees** can view their own tasks and update task statuses.

Example authenticated request header:
http
Authorization: Bearer your.jwt.token


---



## 📦 Installation

### 1️⃣ Clone the repository

```bash
git clone https://github.com/yourusername/ems.git
cd ems
