const { db } = require("../configs/mysql");

const findAll = async () => {
    const [result] = await db.execute("SELECT BIN_TO_UUID(progress_id) progress_id, attempt, timestamp from new_progress ORDER BY attempt;");
    return result;
};

const findOne = async (progressId) => {
    const [result] = await db.execute("SELECT BIN_TO_UUID(progress_id) progress_id, attempt, timestamp from new_progress WHERE BIN_TO_UUID(progress_id) = ?;", [progressId]);
    return result[0];
};

const findByAttempt = async (attempt) => {
    const [result] = await db.execute("SELECT BIN_TO_UUID(progress_id), attempt, timestamp from new_progress WHERE attempt = ?;", [attempt]);
    return result[0];
}

const save = async (progressDto) => {
    await db.execute("INSERT INTO new_progress (progress_id, attempt, timestamp) values (UUID_TO_BIN(UUID()), ?, ?);", [progressDto.attempt, progressDto.timestamp]);
    return progressDto;
};

const update = async (progressId, progressDto) => {
    await db.execute("UPDATE new_progress set attempt = ?, timestamp = ? WHERE BIN_TO_UUID(progress_id) = ?", [progressDto.attempt, progressDto.timestamp, progressId]);
    return progressDto;
};

const del = async (progressId) => {
    await db.execute("DELETE FROM new_progress WHERE BIN_TO_UUID(progress_id) = ?", [progressId]);
};

module.exports = { findAll, findOne, findByAttempt, save, update, del }