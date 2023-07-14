const { db } = require("../configs/mysql");

const findAll = async () => {
    const [result] = await db.execute("SELECT BIN_TO_UUID(comida_id) comida_id, nome, carb, protl, proth, fat, img from comida;");
    return result;
};

const findOne = async (comidaId) => {
    const [result] = await db.execute("SELECT BIN_TO_UUID(comida_id) comida_id, nome, carb, protl, proth, fat, img from comida where BIN_TO_UUID(comida_id) = ?", [comidaId]);
    return result[0];
};

const save = async (comidaDto) => {
    await db.execute("INSERT INTO comida (comida_id, nome, carb, protl, proth, fat, img) values (UUID_TO_BIN(UUID()),?, ?, ?, ?, ?, ?)", [comidaDto.nome, comidaDto.carb, comidaDto.protl, comidaDto.proth, comidaDto.fat, comidaDto.img]);
};

const update = async (comidaId, comidaDto) => {
    await db.execute("UPDATE comida set nome = ?, carb = ?, protl = ?, proth = ?, fat = ?, img = ? WHERE BIN_TO_UUID(comida_id) = ?", [comidaDto.nome, comidaDto.carb, comidaDto.protl, comidaDto.proth, comidaDto.fat, comidaDto.img, comidaId]);
};

const del = async (comidaId) => {
    await db.execute("DELETE from comida where BIN_TO_UUID(comida_id) = ?", [comidaId]);
};

module.exports = { findAll, findOne, save, update, del };