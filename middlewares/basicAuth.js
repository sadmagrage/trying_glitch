const basicAuth = require("basic-auth");
const bcrypt = require("bcrypt");
const db = require("../configs/mysql");

const auth = async (req, res, next) => {
    const credentials = basicAuth(req);

    const unauthorized = () => {
        res.set('WWW-Authenticate', 'Basic realm="Authorization Required"');
        res.status(401).send('Authentication required.');
    }

    if (!credentials || !credentials.name || !credentials.pass) {
        unauthorized();
        return;
    };

    const user = await db.getUserByUsername(credentials.name);
    
    if (!user) {
        unauthorized();
        return;
    }

    const isMatch = await bcrypt.compare(credentials.pass, user.password);

    if (!isMatch) {
        unauthorized();
        return;
    }

    next();
}

module.exports = { auth };