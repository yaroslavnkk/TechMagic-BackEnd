const express = require('express');
const router = express.Router();
const Doctor = require('../models/Doctor');
const mongoose = require('mongoose');

router.get('/doctors', async(res) => {
    try{
        const doctors = Doctor.find();
        res.json(doctors);
    }catch(err){
        res.status(500).json('Failed to load doctors', err);
    };
});

router.get('/doctors/:id', async (req, res) => {
      const { id } = req.params;
    
            if(!mongoose.Types.ObjectId.isValid(id)){
                return res.status(400).json({message : 'Invalid ID format'});
            };
    try{
        const doctor = Doctor.findById(id);
        if(!doctor){
            res.status(400).json({message : 'Doctor not found'});
        }
    }catch(err){
        res.status(500).json({message : 'Failed to find doctor', error : err.message});
    };
});

router.post('/doctors', async(req,res) => {
    const doctor = new Doctor({
        firstName : req.body.firstName,
        lastName : req.body.lastName,
        patronymic : req.body.patronymic,
        specialty : req.body.specialty,
        qualification : req.body.qualification
    });
    try{
        const newDoctor = await doctor.save();
        res.status(200).json('Successfully saved new doctor: ', newDoctor);
    }catch(err){
        res.status(400).json({message : err.message});
    };
})

module.exports = router;