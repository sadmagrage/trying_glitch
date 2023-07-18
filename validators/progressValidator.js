const Joi = require("joi");

const progress = Joi.object({
    attempt: Joi.number().integer().positive().required(),
    ano: Joi.number().integer().positive().required(),
    mes: Joi.number().integer().min(1).max(12).required(),
    dia: Joi.number().integer().min(1).max(31).required(),
    hora: Joi.number().integer().min(0).max(23).default(0),
    minuto: Joi.number().integer().min(0).max(59).default(0),
    segundo: Joi.number().integer().min(0).max(59).default(0)
});

const validateProgress = (params) => {
    const { error, value } = progress.validate(params);

    if (error) throw error;
    return value;
}

module.exports = { validateProgress };