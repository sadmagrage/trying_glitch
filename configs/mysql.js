const mysql = require("mysql2/promise");
require("dotenv").config();

const db = mysql.createPool(process.env.DB_URI);

const getUserByUsername = async (username) => {
    const [result] = await db.execute('SELECT username, password FROM tb_user WHERE username = ?;', [username]);
    return result[0];
};

module.exports = { getUserByUsername };