const express = require("express");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const authMiddleware = require("../middleware/auth.middleware");

const router = express.Router();

router.post("/register", async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });

        if (user) {
            // res.status(403);
            return res.json({
                success: false,
                message: "User already exists"
            });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        req.body.password = hashedPassword;
        
        const newUser = new User(req.body);
        await newUser.save();

        // res.status(201);
        res.json({
            success: true,
            message: "User registered successfully",
            data: newUser
        });
    }
    catch (error) {
        // res.status(400);
        res.json({
            success: false,
            message: "User registration failed",
            data: error
        });
    }
});

router.post("/login", async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });

        if (!user) {
            // res.status(403);
            return res.json({
                success: false,
                message: "User not found"
            });
        }

        const realPwd = user.password;
        const enteredPwd = req.body.password;

        const validPassword = await bcrypt.compare(enteredPwd, realPwd);

        if (!validPassword) {
            // res.status(403);
            return res.json({
                success: false,
                message: "Invalid password"
            });
        }

        const token = jwt.sign({
            userId: user._id
        }, process.env.JWT_SECRET_TOKEN, {
            expiresIn: "1m"
        });

        // res.status(200);
        res.json({
            success: true,
            message: "User logged in successfully",
            data: user,
            token: token
        });
    }
    catch (error) {
        // res.status(400);
        res.json({
            success: false,
            message: "User login failed",
            data: error
        });
    }
});

router.get("/login/verify", authMiddleware, async (req, res) => {
    if (!req.body.userId) {
        return res.json({
            success: false,
            message: "User not found"
        });
    }

    try {
        const user = await User.findById(req.body.userId).select("-password");
        res.send({
            success: true,
            message: "User Authorized",
            data: user
        });
    } catch (error) {
        return res.json({
            success: false,
            message: "User not found"
        });
    }
});

module.exports = router;