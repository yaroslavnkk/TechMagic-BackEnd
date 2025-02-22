const express = require('express');
const router = express.Router();
const Doctor = require('../models/Doctor');

router.get('/doctors', async(req,res) => {
    try{
        const doctors = Doctor.find();
        res.json(doctors);
    }catch(err){
        res.status(500).json('Failed to load doctors', err);
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

