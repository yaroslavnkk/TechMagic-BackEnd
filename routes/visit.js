const express = require('express');
const router = express.Router();
const Visit = require('../models/Visit');
const mongoose = require('mongoose');


router.post('/visit', async (req,res) => {
    const visit = new Visit({
        doctor : req.body.doctor,
        user : req.body.user,
        date : req.body.date,
        diagnosis : req.body.diagnosis,
        treatmentCost : req.body.treatmentCost,
        finalCost : req.body.finalCost
    });
    try{
        const newVisit = await visit.save();
        res.json(newVisit);
    }catch(err){
        res.status(500).json({message : 'Failed to save visit', error : err.message });
    }
});

router.get('/visit/:id', async (req,res) => {
    const { id } = req.params;

        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(400).json({message : 'Invalid ID format'});
        };

    try{
        const visit = Visit.findById(id);
        if(!visit){
            res.status(404).json({message : 'Visit not found'});
        }
        res.json(visit);
    }catch(err){
        res.status(500).json({message : 'Failed to get visit', error : err.message});
    }
});

router.get('/visits', async (res) => {
    try{
        const visits = await Visit.find();
        res.status(200).json(visits);
    }catch(err){
        res.status(500).json({message : 'Failed to get visits', error : err.message});
    }
});

router.delete('/visit/:id', async (req,res) => {
    const { id } = req.params;

        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(400).json({message : 'Invalid ID format'});
        };
    try{
        const visitToDelete = await Visit.findByIdAndDelete(id);
        if(!visitToDelete){
            res.status(404).json({message : 'Visit not found'});
        }
        res.status(200).json({message : 'Visit was successfully deleted'});
    }catch(err){
        res.status(500).json({message : 'Failed to delete visit', error : err.message});
    };
})

router.put('/visit/:id', async (req,res) =>{
    const { id } = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({message : 'Invalid ID format'});
    };
    try{
        const visitToUpdate = await Visit.findByIdAndUpdate(id, req.body, {new : true, overwrite : true});
        if(!visitToUpdate){
            res.status(400).json({message : 'Visit not found'});
        }
        res.status(200).json(visitToUpdate);
    }catch(err){
        res.status(500).json({message : 'Failed to update visit', error : err.message});
    };
});

router.patch('/visit/:id', async (req,res) => {
    const { id } = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({message : 'Invalid ID format'});
    };
    try{
        const visitToUpdate = await Visit.findByIdAndUpdate(id, req.body, {new : true});
        if(!visitToUpdate){
            res.status(400).json({message : 'Visit not found'});
        }
        res.status(200).json(visitToUpdate);
    }catch(err){
        res.status(500).json({message : 'Failed to update visit', error : err.message});
    };
});

module.exports = router;