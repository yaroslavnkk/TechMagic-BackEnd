const express = require('express');
const router = express.Router();
const Doctor = require('../models/Doctor');
const mongoose = require('mongoose');
/**
 * @swagger
 * /doctors:
 *   get:
 *     summary: Get info about doctors
 *     description: Retrieve information about doctors from MongoDB
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 items:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       firstName:
 *                         type: string
 *                         example: Іван
 *                       patronymic:
 *                         type: string
 *                         example: Тимофійович
 *                       lastName:
 *                         type: string
 *                         example: Коваль
 *                       specialty:
 *                         type: string
 *                         example: Онколог
 *                       qualification:
 *                         type: string
 *                         example: вища
 */

router.get('/doctors', async(req, res) => {
    try{
        const doctors = await Doctor.find();
        res.status(200).json(doctors);
    }catch(err){
        res.status(500).json({message : 'Failed to load doctors', error : err.message});
    };
});
/**
 * @swagger
 * /doctors/:id:
 *   get:
 *     summary: Get info about doctor
 *     description: Retrieve information about doctor from mongo db
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 firstName:
 *                   type: string
 *                   example: Іван
 *                 patronymic:
 *                   type: string
 *                   example : Тимофійович
 *                 lastName:
 *                   type: string,
 *                   example: Коваль 
 *                 specialty:
 *                   type: string
 *                   example: Онколог
 *                 qualification:
 *                   type: string,
 *                   example: вища
 */
router.get('/doctor/:id', async (req, res) => {
      const { id } = req.params;
    
            if(!mongoose.Types.ObjectId.isValid(id)){
                return res.status(400).json({message : 'Invalid ID format'});
            };
    try{
        const doctor = await Doctor.findById(id);
        if(!doctor){
            res.status(400).json({message : 'Doctor not found'});
        }
        res.status(200).json(doctor);
    }catch(err){
        res.status(500).json({message : 'Failed to find doctor', error : err.message});
    };
});


module.exports = router;