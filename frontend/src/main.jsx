import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AppProvider } from "./Context/AppContext.jsx";
import Login from "./Component/EmployeeAuth/Login.jsx";
import { SnackbarProvider } from "notistack";
import AdminLogin from "./Component/AdminAuth/Login.jsx";
import AdminRegistration from "./Component/AdminAuth/Registration.jsx";
import Registration from "./Component/EmployeeAuth/Registration.jsx";
import AdminDashboard from "./Component/Dashboard/AdminDashboard.jsx";
import Home from "./Component/Home.jsx";
// import  Chart  from "chart.js";
import  DashboardChart  from "./Component/Chart/Chart.jsx";
import EmployeeDashboard from "./Component/Dashboard/EmployeeDashboard.jsx";
import "./index.css";
import App from "./App.jsx";
import "./App.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <SnackbarProvider>
      <AppProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/employee/:id" element={<EmployeeDashboard />} />
            <Route path="/adminlogin" element={<AdminLogin />} />
            <Route path="/employeelogin" element={<Login />} />
            <Route path="/chart" element={<DashboardChart />} />
            <Route path="/adminregistration" element={<AdminRegistration />} />
            <Route path="/employeeregistration" element={<Registration />} />

            <Route path="/" element={<Home />} />
          </Routes>
        </BrowserRouter>
      </AppProvider>
    </SnackbarProvider>
  </StrictMode>
);
