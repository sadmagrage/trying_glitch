const comidaModel = require("../models/comidaModel");
const { Comida } = require("../dto/Comida");

const findAll = async (req, res) => {
    res.status(200).json(await comidaModel.findAll());
};

const findOne = async (req, res) => {
    const comidaModelOptional = await comidaModel.findOne(req.params.comida_id);

    if (!comidaModelOptional) {
        res.status(404).send("Comida not found.");
        return;
    }

    res.status(200).json(comidaModelOptional);
};

const save = async (req, res) => {
    const comida = new Comida(req.body.nome, req.body.carb, req.body.protl, req.body.proth, req.body.fat, req.body.img);

    await comidaModel.save(comida);
    res.status(201).json(comida);
};

const update = async (req, res) => {
    const comidaModelOptional = await comidaModel.findOne(req.params.comida_id);

    if (!comidaModelOptional) {
        res.status(404).send("Comida not found.");
        return;
    }

    const comida = new Comida(req.body.nome, req.body.carb, req.body.protl, req.body.proth, req.body.fat, req.body.img);

    await comidaModel.update(req.params.comida_id, comida);
    res.status(201).json(comida);
};

const del = async (req, res) => {
    const comidaModelOptional = await comidaModel.findOne(req.params.comida_id);

    if (!comidaModelOptional) {
        res.status(404).send("Comida not found.");
        return;
    }

    await comidaModel.del(req.params.comida_id);

    res.status(200).json("Comida deleted.");
};

module.exports = { findAll, findOne, save, update, del };