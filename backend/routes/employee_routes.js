const express = require("express");
const Employee = require("../model/employee");
const {generate_token, verify_token}  = require('../jwt') ; 
const router = express.Router();

// ✅ 1. Get all employees
router.get("/",verify_token , async (req, res) => {
    try {
        const employees = await Employee.find();
        res.status(200).json(employees);
    } catch (error) {
        res.status(500).json({ message: "Error fetching employees", error });
    }
});

// ✅ 2. Get one employee by ID
router.get("/:id", verify_token , async (req, res) => {
    try {
        const employee = await Employee.findById(req.params.id);
        if (!employee) {
            return res.status(404).json({ message: "Employee not found" });
        }
        res.status(200).json(employee);
    } catch (error) {
        res.status(500).json({ message: "Error fetching employee", error });
    }
});

// ✅ 3. Employee Signup (Register)
router.post("/signup" ,async (req, res) => {
    try {
        const { email, username, password } = req.body;
        
        // console.log(req.body) ;
        // Check if employee already exists
        const existingEmployee = await Employee.findOne({ email });
        if (existingEmployee) {
            return res.status(400).json({ message: "Email already registered" });
        }

        // Create a new employee
        const newEmployee = new Employee({
            email,
            username,
            password,
            
             // Password is stored as plain text (not recommended)
        });

        const token = 
        generate_token({email, password }) ;

        const temp = await newEmployee.save();

        res.status(201).json({ message: "Employee registered successfully" , token:token , temp:temp });
    } catch (error) {
        // console.log(error) ;
        res.status(500).json({ message: "Error signing up", error });
    }
});

// ✅ 4. Employee Signin (Login without authentication)
router.post("/signin", async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if employee exists
        const employee = await Employee.findOne({ email });
        if (!employee) {
            return res.status(404).json({ message: "Employee not found" });
        }

        const isMatch = await employee.comparePassword(password);

        if (!isMatch) {
            return res.status(404).json({ message: "Password incorrect" , isMatch : isMatch});
        }

        const token = 
        generate_token({email, password }) ;
        // console.log(employee) ;




        res.status(200).json({ message: "Login successful", employee  ,token : token});
    } catch (error) {
        res.status(500).json({ message: "Error signing in", error });
    }
});

module.exports = router;
