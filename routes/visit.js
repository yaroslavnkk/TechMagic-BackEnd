const express = require('express');
const router = express.Router();
const Visit = require('../models/Visit');
const mongoose = require('mongoose');
/**
 * @swagger
 * /visit:
 *   post:
 *     summary: Create a new visit record
 *     description: Allows creating a new visit record with details such as doctor, user, diagnosis, and treatment costs.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               doctor:
 *                 type: string
 *                 example: "Doctor ID"
 *               user:
 *                 type: string
 *                 example: "User ID"
 *               date:
 *                 type: string
 *                 format: date-time
 *                 example: "2025-02-23T15:00:00Z"
 *               diagnosis:
 *                 type: string
 *                 example: "Cold"
 *               treatmentCost:
 *                 type: number
 *                 example: 50
 *               finalCost:
 *                 type: number
 *                 example: 50
 *     responses:
 *       200:
 *         description: Visit successfully created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 doctor:
 *                   type: string
 *                   example: "Doctor ID"
 *                 user:
 *                   type: string
 *                   example: "User ID"
 *                 date:
 *                   type: string
 *                   format: date-time
 *                   example: "2025-02-23T15:00:00Z"
 *                 diagnosis:
 *                   type: string
 *                   example: "Cold"
 *                 treatmentCost:
 *                   type: number
 *                   example: 50
 *                 finalCost:
 *                   type: number
 *                   example: 50
 *       500:
 *         description: Failed to save visit
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Failed to save visit"
 *                 error:
 *                   type: string
 *                   example: "Error details"
 */

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
/**
 * @swagger
 * /visit/{id}:
 *   get:
 *     summary: Get a visit record by ID
 *     description: Retrieve a visit record by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The visit ID
 *     responses:
 *       200:
 *         description: Successful retrieval of visit record
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 doctor:
 *                   type: string
 *                   example: "Doctor ID"
 *                 user:
 *                   type: string
 *                   example: "User ID"
 *                 date:
 *                   type: string
 *                   format: date-time
 *                   example: "2025-02-23T15:00:00Z"
 *                 diagnosis:
 *                   type: string
 *                   example: "Cold"
 *                 treatmentCost:
 *                   type: number
 *                   example: 50
 *                 finalCost:
 *                   type: number
 *                   example: 50
 *       400:
 *         description: Invalid ID format
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Invalid ID format"
 *       404:
 *         description: Visit not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Visit not found"
 */
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
/**
 * @swagger
 * /visits:
 *   get:
 *     summary: Get all visit records
 *     description: Retrieve a list of all visit records.
 *     responses:
 *       200:
 *         description: Successful retrieval of all visits
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   doctor:
 *                     type: string
 *                     example: "Doctor ID"
 *                   user:
 *                     type: string
 *                     example: "User ID"
 *                   date:
 *                     type: string
 *                     format: date-time
 *                     example: "2025-02-23T15:00:00Z"
 *                   diagnosis:
 *                     type: string
 *                     example: "Cold"
 *                   treatmentCost:
 *                     type: number
 *                     example: 50
 *                   finalCost:
 *                     type: number
 *                     example: 50
 *       500:
 *         description: Failed to get visits
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Failed to get visits"
 *                 error:
 *                   type: string
 *                   example: "Error details"
 */
router.get('/visits', async (req,res) => {
    try{
        const visits = await Visit.find();
        res.status(200).json(visits);
    }catch(err){
        res.status(500).json({message : 'Failed to get visits', error : err.message});
    }
});
/**
 * @swagger
 * /visit/{id}:
 *   delete:
 *     summary: Delete a visit record by ID
 *     description: Delete a specific visit record using its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The visit ID
 *     responses:
 *       200:
 *         description: Visit successfully deleted
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Visit was successfully deleted"
 *       400:
 *         description: Invalid ID format
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Invalid ID format"
 *       404:
 *         description: Visit not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Visit not found"
 *       500:
 *         description: Failed to delete visit
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Failed to delete visit"
 *                 error:
 *                   type: string
 *                   example: "Error details"
 */

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
/**
 * @swagger
 * /visit/{id}:
 *   put:
 *     summary: Update a visit record by ID
 *     description: Update the details of a specific visit using its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The visit ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               doctor:
 *                 type: string
 *                 example: "Updated Doctor ID"
 *               user:
 *                 type: string
 *                 example: "Updated User ID"
 *               date:
 *                 type: string
 *                 format: date-time
 *                 example: "2025-02-23T15:00:00Z"
 *               diagnosis:
 *                 type: string
 *                 example: "Updated Diagnosis"
 *               treatmentCost:
 *                 type: number
 *                 example: 60
 *               finalCost:
 *                 type: number
 *                 example: 60
 *     responses:
 *       200:
 *         description: Visit successfully updated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 doctor:
 *                   type: string
 *                   example: "Updated Doctor ID"
 *                 user:
 *                   type: string
 *                   example: "Updated User ID"
 *                 date:
 *                   type: string
 *                   format: date-time
 *                   example: "2025-02-23T15:00:00Z"
 *                 diagnosis:
 *                   type: string
 *                   example: "Updated Diagnosis"
 *                 treatmentCost:
 *                   type: number
 *                   example: 60
 *                 finalCost:
 *                   type: number
 *                   example: 60
 *       400:
 *         description: Invalid ID format
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Invalid ID format"
 *       404:
 *         description: Visit not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Visit not found"
 *       500:
 *         description: Failed to update visit
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Failed to update visit"
 *                 error:
 *                   type: string
 *                   example: "Error details"
 */

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


module.exports = router;