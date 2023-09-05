const path = require("path");

const { Progress } = require("../dto/Progress");
const progressModel = require("../models/progressModel");
const { validateProgress} = require("../validators/progressValidator");

const convertTimestamp = (req, res) => {
    const { timestamp } = req.query;
    const date = new Date(parseInt(timestamp));
    
    date.setHours(date.getHours() - 3);

    res.status(200).json(date.toUTCString());
};

const findAll = async (req, res) => {
    try {
        res.status(200).json(await progressModel.findAll());
    } catch (error) {
        res.status(400).json(error.message);
    }
};

const formGet = (req, res) => {
    res.sendFile(path.join(__dirname, "../public/progress_form.html"));
}

const formPost = async (req, res) => {
    try {
        const dateTime = new Date(req.body.datetime);

        const allProgress = await progressModel.findAll();

        const attempt = allProgress.length + 1;

        const progress = new Progress(validateProgress({ attempt: attempt, ano: dateTime.getFullYear(), mes: dateTime.getMonth() + 1, dia: dateTime.getDate(), hora: dateTime.getHours(), minuto: dateTime.getMinutes(), segundo: 20 }));

        await progressModel.save(progress);

        res.json(progress);
    } catch (error) {
        res.json(error.message);
    }
}

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
        const progressByAttempt = await progressModel.findByAttempt(req.body.attempt);

        if (progressByAttempt) {
            res.status(400).send("Attempt already exists !");
            return;
        }

        const progress = new Progress(validateProgress(req.body));
        
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
        const progress = new Progress(validateProgress(req.body));
    
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

module.exports = { convertTimestamp, findAll, formGet, formPost, findOne, save, update, del }