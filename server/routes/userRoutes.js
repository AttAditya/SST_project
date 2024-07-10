const express = require("express");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");

const router = express.Router();

router.post("/register", async (req, res) => {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        req.body.password = hashedPassword;
        
        const newUser = new User(req.body);
        await newUser.save();

        res.send(201).json(newUser);
    }
    catch (error) {
        res.json({ error });
    }
});

router.post("/login", async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });

        if (!user) {
            res.status(403);
            return res.send("Wrong credentials");
        }

        const realPwd = user.password;
        const enteredPwd = req.body.password;

        const validPassword = await bcrypt.compare(enteredPwd, realPwd);

        if (!validPassword) {
            res.status(403);
            res.send("Invalid password");
        }

        res.json(user);
    }
    catch (error) {
        res.json({ error });
    }
});


module.exports = router;