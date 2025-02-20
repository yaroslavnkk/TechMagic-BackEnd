const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

function generateAccessToken(user){
    return jwt.sign(user, 'secret');
}

router.post('/register', async (req,res) => {
     try {
            const { userFirstName, userMiddleName, userLastName, userBirthDate, email, password } = req.body;
        
            const existingUser = await User.findOne({ email });
            if (existingUser) return res.status(400).json({ message: "User already exists" });
        
            const hashedPassword = await bcrypt.hash(password, 10);
        
            const newUser = new User({
              userFirstName,
              userMiddleName,
              userLastName,
              userBirthDate,
              email,
              password: hashedPassword,
            });
        
            await newUser.save();
            res.status(201).json({ message: "User registered successfully" });
          } catch (error) {
            res.status(500).json({ message: "Internal Server Error", error : error.message});
          }
});

router.post('/login', async (req,res) => {
   const { email, password } = req.body;
   
       const user = await User.findOne({email});
       if(!user){
           return res.status(404).send('User not found');
       }
   
       const validPassword = await bcrypt.compare(password, user.password);
       if(!validPassword){
           return res.status(401).send('Invalid password');
       }
   
       const token = generateAccessToken({email});
       res.json({token});
});

module.exports = router;