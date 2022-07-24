const express = require('express');
const { update } = require('../models/vehicle');
const router = express.Router();
const Vehicle = require('../models/vehicle');
const vinGenerator = require('vin-generator');

const getVehicle = async (req, res, next) => {
    let vehicle
    try {
        vehicle = await Vehicle.findOne({"vin": req.params.id})
        if(vehicle === null) {
            return res.status(404).json({
                message: 'Vehicle not found in inventory!'
            })
        }
    } catch(error) {
        res.status(500).json({
            message: error.message
        })
    }
    res.vehicle = vehicle;
    next();
}

router.get('/', async (req, res) => {
    try {
        const inventory = await Vehicle.find()
        res.json(inventory)
    } catch(error) {
        res.status(500).json({
            message: error.message
        })
    }
});

router.get('/:id', getVehicle, async (req, res) => {
    res.json(res.vehicle)
});

router.post('/', async (req, res) => {
    const vehicle = new Vehicle({
        year: req.body.year,
        make: req.body.make,
        model: req.body.model,
        color: req.body.color,
        vin: vinGenerator.generateVin(),
        price: req.body.price
    })
    try {
        const newVehicle = await vehicle.save()
        res.status(201).json(newVehicle)
    } catch(error) {
        res.status(400).json({
            message: error.message
        })
    }
});

router.patch('/:id', getVehicle, async (req, res) => {
    if(req.body.year != null) {
        res.vehicle.year = req.body.year
    }
    if(req.body.make != null) {
        res.vehicle.make = req.body.make
    }
    if(req.body.model != null) {
        res.vehicle.model = req.body.model
    }
    if(req.body.color != null) {
        res.vehicle.color = req.body.color
    }
    if(req.body.vin != null) {
        res.vehicle.vin = req.body.vin
    }
    if(req.body.price != null) {
        res.vehicle.price = req.body.price
    }
    try {
        const updatedVehicle = await res.vehicle.save()
        res.json(updatedVehicle)
    } catch(error) {
        res.status(400).json({
            message: error.message
        })
    }
});

router.delete('/:id', getVehicle, async (req, res) => {
    try {
        await res.vehicle.remove()
        res.json({
            message: 'Inventory removed'
        })
    } catch(error) {
        res.status(500).json({
            message: error.message
        })
    }
});

module.exports = router;