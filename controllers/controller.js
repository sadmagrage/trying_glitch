const get = (req, res) => {
    res.send("public acess");
};

const post = (req, res) => {
    res.send("private acess");
};

module.exports = { get, post };