import express, { response } from "express";
import axios from "axios";
import fetch from "node-fetch";
import LED from "../models/Led.js";
import DHT from "../models/DHT.js";

const router = express.Router();

//Manage LED
router.post('/manageLed', async (req, res)=>{
    const body ={
        name: req.body.name,
        mode: req.body.mode,
        status: req.body.status
    }

    const response = await fetch('http://10.0.0.48:80/handleLED', {
        method: 'post',
        body: JSON.stringify(body),
        headers: {'Content-Type': 'application/json'}
    });
    const responseData = await response.json();

    if(responseData.success == "true"){

        const data = new LED({
            name: req.body.name,
            time: Date.now(),
            ledStatus: req.body.status,
            mode: req.body.mode
        })

        try{
            const dataToSave = await data.save();
            res.status(200).json(dataToSave);
        }
        catch(error){
            res.status(400).json({message: error.message});
        }
    }
});

router.get("/manageDHT", async (req, res)=>{

    const response = await fetch('http://10.0.0.48:80/handleDHT');

    const responseData = await response.json();

    if(responseData.success == "true"){
        const data = new DHT({
            temperature: responseData.temperature,
            humidity: responseData.humidity
        });

        try{
            const dataToSave = await data.save();
            res.status(200).json(dataToSave);
        }
        catch(error){
            res.status(400).json({message: error.message});
        }  
    }

});

//Post Method
router.post('/post', (req, res) => {
    res.send('Post API');
});

//Get all Method
router.get('/getAll', (req, res) => {
    res.send('Get All API');
});

//Get by ID Method
router.get('/getOne/:id', (req, res) => {
    res.send(req.params.id)
});

//Update by ID Method
router.patch('/update/:id', (req, res) => {
    res.send('Update by ID API');
});

//Delete by ID Method
router.delete('/delete/:id', (req, res) => {
    res.send('Delete by ID API');
});

export default router;