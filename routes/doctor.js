const express = require('express');
const router = express.Router();
const Doctor = require('../models/Doctor');
const mongoose = require('mongoose');

router.get('/doctors', async(req, res) => {
    try{
        const doctors = await Doctor.find();
        res.json(doctors);
    }catch(err){
        res.status(500).json({message : 'Failed to load doctors', error : err.message});
    };
});

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