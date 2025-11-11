'use strict' // palabra reservada que nos permite usar las Funciones de ES6

const express = require('express'); // amos Express
const bodyParser = require('body-parser');
const app = express();
const api = require('./routes/index');
const cors = require('cors');
var path = require('path');
// const connect = require('./db/connect');


app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: false }));
app.use(bodyParser.json());
app.use(cors({origin: '*'}));
app.use('/bavv', api);

const web = express.Router();
web.get('', (req, res) => {
    res.sendFile(path.resolve('./web/index.html'))
});
app.use('/', web);


module.exports = app;
