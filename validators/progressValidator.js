const Joi = require("joi");

const progress = Joi.object({
    attempt: Joi.number().integer().positive().required(),
    timestamp: Joi.string().required()
});

const validateProgress = (params) => {
    const { error, value } = progress.validate(params);

    if (error) throw error;
    return value;
}

module.exports = { validateProgress };