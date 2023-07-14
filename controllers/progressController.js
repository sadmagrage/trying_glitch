const { Progress } = require("../dto/Progress");
const progressModel = require("../models/progressModel");

const findAll = async (req, res) => {
    res.status(200).json(await progressModel.findAll());
};

const findOne = async (req, res) => {
    const progressModelOptional = await progressModel.findOne(req.params.progress_id);

    if (!progressModelOptional) {
        res.status(404).send("Progress not found.");
        return;
    }

    res.status(200).json(progressModelOptional);
}

const save = async (req, res) => {
    const progress = new Progress(req.body.nome, req.body.ano, req.body.mes, req.body.dia, req.body.hora, req.body.minuto, req.body.segundo);

    await progressModel.save(progress);

    res.status(201).json(progress);
};

const update = async (req, res) => {
    const progressModelOptional = await progressModel.findOne(req.params.progress_id);

    if (!progressModelOptional) {
        res.status(404).send("Progress not found.");
        return;
    }

    const progress = new Progress(req.body.nome, req.body.ano, req.body.mes, req.body.dia, req.body.hora, req.body.minuto, req.body.segundo);

    await progressModel.update(req.params.progress_id, progress);

    res.status(201).json(progress);
};

const del = async (req, res) => {
    const progressModelOptional = await progressModel.findOne(req.params.progress_id);

    if (!progressModelOptional) {
        res.status(404).send("Progress not found.");
        return;
    }
    
    await progressModel.del(req.params.progress_id);

    res.status(200).send("Progress deleted.");
};

module.exports = { findAll, findOne, save, update, del }