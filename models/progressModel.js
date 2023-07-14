const { db } = require("../configs/mysql");

const findAll = async () => {
    const [result] = await db.execute("SELECT BIN_TO_UUID(progress_id) progress_id, nome, ano, mes, dia, hora, minuto, segundo from progress;");
    return result;
};

const findOne = async (progressId) => {
    const [result] = await db.execute("SELECT BIN_TO_UUID(progress_id) progress_id, nome, ano, mes, dia, hora, minuto, segundo from progress WHERE BIN_TO_UUID(progress_id) = ?;", [progressId]);
    return result[0];
};

const save = async (progressDto) => {
    await db.execute("INSERT INTO progress (progress_id, nome, ano, mes, dia, hora, minuto, segundo) values (UUID_TO_BIN(UUID()), ?, ?, ?, ? ,? ,? ,?);", [progressDto.nome, progressDto.ano, progressDto.mes, progressDto.dia, progressDto.hora, progressDto.minuto, progressDto.segundo]);
    return progressDto;
};

const update = async (progressId, progressDto) => {
    await db.execute("UPDATE progress set nome = ?, ano = ?, mes = ?, dia = ?, hora = ?, minuto = ?, segundo = ? WHERE BIN_TO_UUID(progress_id) = ?", [progressDto.nome, progressDto.ano, progressDto.mes, progressDto.dia, progressDto.hora, progressDto.minuto, progressDto.segundo, progressId]);
    return progressDto;
};

const del = async (progressId) => {
    await db.execute("DELETE FROM progress WHERE BIN_TO_UUID(progress_id) = ?", [progressId]);
};

module.exports = { findAll, findOne, save, update, del }