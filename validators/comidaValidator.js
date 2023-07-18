const Joi = require("joi");

const comida = Joi.object({
    nome: Joi.string().required(),
    quantidade: Joi.number().default(1).positive(),
    carb: Joi.number().default(0).positive(),
    protl: Joi.number().default(0).positive(),
    proth: Joi.number().default(0).positive(),
    fat: Joi.number().default(0).positive(),
    img: Joi.string().default("")
});

const validateComida = (params) => {
    const { error, value } = comida.validate(params);

    if (error) throw error;
    return value;
};

module.exports = { validateComida };