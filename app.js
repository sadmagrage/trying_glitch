const express = require('express');
const router = require("./routes/route");

const app = express();
app.use(router.router);

const port = 3000;
app.listen(port, () => console.log(`running on port ${port}`));