const comidaModel = require("../models/comidaModel");
const { validateComida } = require("../validators/comidaValidator");
const { Comida } = require("../dto/Comida");

const findAll = async (req, res) => {
    try {
        res.status(200).json(await comidaModel.findAll());
    } catch (error) {
        res.status(400).json(error.message);
    }
};

const findOne = async (req, res) => {
    const comidaModelOptional = await comidaModel.findOne(req.params.comida_id);

    if (!comidaModelOptional) {
        res.status(404).send("Comida not found.");
        return;
    }

    try {
        res.status(200).json(comidaModelOptional);   
    } catch (error) {
        res.status(400).json(error.message);
    }
};

const save = async (req, res) => {
    try {
        const comida = new Comida(validateComida(req.body.nome, req.body.quantidade, req.body.carb, req.body.protl, req.body.proth, req.body.fat, req.body.img));
    
        await comidaModel.save(comida);
        res.status(201).json(comida);   
    } catch (error) {
        res.status(401).json(error.message);
    }
};

const update = async (req, res) => {
    const comidaModelOptional = await comidaModel.findOne(req.params.comida_id);

    if (!comidaModelOptional) {
        res.status(404).send("Comida not found.");
        return;
    }

    try {
        const comida = new Comida(validateComida(req.body.nome, req.body.quantidade, req.body.carb, req.body.protl, req.body.proth, req.body.fat, req.body.img));
    
        await comidaModel.update(req.params.comida_id, comida);
        res.status(201).json(comida);   
    } catch (error) {
        res.status(401).json(error.message);
    }
};

const del = async (req, res) => {
    const comidaModelOptional = await comidaModel.findOne(req.params.comida_id);

    if (!comidaModelOptional) {
        res.status(404).send("Comida not found.");
        return;
    }

    try {
        await comidaModel.del(req.params.comida_id);
    
        res.status(200).json("Comida deleted.");   
    } catch (error) {
        res.status(400).json(error.message);   
    }
};

module.exports = { findAll, findOne, save, update, del };