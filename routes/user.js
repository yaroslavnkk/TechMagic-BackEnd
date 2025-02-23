const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

function generateAccessToken(user){
    return jwt.sign(user, 'secret', {expiresIn : '1h'});
}
/**
 * @swagger
 * /register:
 *   post:
 *     summary: Register a new user
 *     description: Allows a user to register by providing their personal details and password. The password will be hashed before saving.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userFirstName:
 *                 type: string
 *                 example: Іван
 *               userMiddleName:
 *                 type: string
 *                 example: Олександрович
 *               userLastName:
 *                 type: string
 *                 example: Коваль
 *               userBirthDate:
 *                 type: string
 *                 format: date
 *                 example: 1990-05-15
 *               email:
 *                 type: string
 *                 format: email
 *                 example: ivan.koval@example.com
 *               password:
 *                 type: string
 *                 example: password123
 *     responses:
 *       201:
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User registered successfully
 *       400:
 *         description: User already exists
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User already exists
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Internal Server Error
 *                 error:
 *                   type: string
 *                   example: Some detailed error message
 */

router.post('/register', async (req,res) => {
     try {
            const { userFirstName, userMiddleName, userLastName, userBirthDate, email, password } = req.body;
            const saltRounds = 10;
        
            const existingUser = await User.findOne({ email });
            if (existingUser){
              return res.status(400).json({ message: "User already exists" });
            } 
        
            const hashedPassword = await bcrypt.hash(password, saltRounds);
        
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
/**
 * @swagger
 * /login:
 *   post:
 *     summary: Login an existing user
 *     description: Allows a registered user to log in by providing their email and password. If valid, a JWT token is returned.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: ivan.koval@example.com
 *               password:
 *                 type: string
 *                 example: password123
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   example: jwt_token_string
 *                 user:
 *                   type: object
 *                   properties:
 *                     userFirstName:
 *                       type: string
 *                       example: Іван
 *                     userMiddleName:
 *                       type: string
 *                       example: Олександрович
 *                     userLastName:
 *                       type: string
 *                       example: Коваль
 *                     userBirthDate:
 *                       type: string
 *                       format: date
 *                       example: 1990-05-15
 *                     email:
 *                       type: string
 *                       format: email
 *                       example: ivan.koval@example.com
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User not found
 *       401:
 *         description: Invalid password
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Invalid password
 */
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
       res.json({token, user : user.toJSON()});
});


module.exports = router;