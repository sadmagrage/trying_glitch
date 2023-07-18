const { Progress } = require("../dto/Progress");
const progressModel = require("../models/progressModel");
const { validateProgress} = require("../validators/progressValidator");

const findAll = async (req, res) => {
    try {
        res.status(200).json(await progressModel.findAll());
    } catch (error) {
        res.status(400).json(error.message);
    }
};

const findOne = async (req, res) => {
    const progressModelOptional = await progressModel.findOne(req.params.progress_id);

    if (!progressModelOptional) {
        res.status(404).send("Progress not found.");
        return;
    }
    try {
        res.status(200).json(progressModelOptional);
    } catch (error) {
        res.status(400).json(error.message);   
    }
}

const save = async (req, res) => {
    try {
        const progress = new Progress(validateProgress(req.body.attempt, req.body.ano, req.body.mes, req.body.dia, req.body.hora, req.body.minuto, req.body.segundo));
        
        await progressModel.save(progress);
    
        res.status(201).json(progress);   
    } catch (error) {
        res.status(401).json(error.message);
    }
};

const update = async (req, res) => {
    const progressModelOptional = await progressModel.findOne(req.params.progress_id);

    if (!progressModelOptional) {
        res.status(404).send("Progress not found.");
        return;
    }

    try {
        const progress = new Progress(validateProgress(req.body.attempt, req.body.ano, req.body.mes, req.body.dia, req.body.hora, req.body.minuto, req.body.segundo));
    
        await progressModel.update(req.params.progress_id, progress);
    
        res.status(201).json(progress);
    } catch (error) {
        res.status(401).json(error.message);
    }
};

const del = async (req, res) => {
    const progressModelOptional = await progressModel.findOne(req.params.progress_id);

    if (!progressModelOptional) {
        res.status(404).send("Progress not found.");
        return;
    }
    
    try {
        await progressModel.del(req.params.progress_id);
    
        res.status(200).send("Progress deleted.");
    } catch (error) {
        res.status(200).json(error.message);
    }

};

module.exports = { findAll, findOne, save, update, del }