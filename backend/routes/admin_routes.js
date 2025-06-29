const express = require("express");
const Admin = require("../model/admin");
const {generate_token} = require('../jwt') ;
const router = express.Router();

// ✅ 1. Admin Signup (Register)
router.post("/signup", async (req, res) => {
    try {
        const { email, username, password } = req.body;
        // console.log(req.body)
        // Check if admin already exists
        const existingAdmin = await Admin.findOne({ email });
        if (existingAdmin) {
            return res.status(400).json({ message: "Email already registered" });
        }

        // Create a new admin
        const newAdmin = new Admin({
            email,
            username,
            password, // Password is stored as plain text (not recommended)
        });

        const token = 
        generate_token({email, password }) ;



        await newAdmin.save();

        res.status(201).json({ message: "Admin registered successfully" ,token : token , newAdmin });
    } catch (error) {
        // console.timeLog(error);
        res.status(500).json({ message: "Error signing up", error : error} );
    }
});

// ✅ 2. Admin Signin (Login without authentication)
router.post("/signin", async (req, res) => {
    try {
        const { email, password } = req.body;
       


        // Check if admin exists
        const admin = await Admin.findOne({ email });
        if (!admin) {
            return res.status(404).json({ message: "Admin not found" });
        }

        const isMatch = await admin.comparePassword(password);

        if (!isMatch) {
            return res.status(404).json({ message: "Password incorrect" , isMatch : isMatch});
        }

        const token = 
        generate_token({email, password }) ;


      

        res.status(200).json({ message: "Login successful", admin ,token : token});
    } catch (error) {
        res.status(500).json({ message: "Error signing in", error });
    }
});

module.exports = router;
