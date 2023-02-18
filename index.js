const express = require('express')
const app = express()
const port = 55;
const bodyParser = require('body-parser');
const { query } = require('express');
const securePassword = require('secure-password');

const router = require('./router');
const database = require('./db/database');


database
    .connect()
    .then(() => console.log('Database connected.'))
    .catch((error) => console.error('Database error: ', error))

app.use(bodyParser.json());
app.use(router);

app.listen(
    port,
    console.log(`http://localhost:${port}`)
);
