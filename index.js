const express = require('express')
const app = express()
const port = 55;
const bodyParser = require('body-parser');
const { query } = require('express');
const { queryResult } = require('pg-promise');
const validator = require('validator');
const securePassword = require('secure-password');

const router = require('./router');

const pwd = securePassword();

const pgp = require('pg-promise')({});
var db = pgp('postrgres://postgres:Nathifa@localhost:8033/Client_Registration')

app.use(bodyParser.json());
app.use(router);

app.listen(
    port,
    console.log(`http://localhost:${port}`)
);
