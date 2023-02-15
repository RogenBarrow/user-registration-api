const express = require('express');
const router = express.Router();

// Handlers
const ping = require('./handlers/ping');
const getuser = require('./handlers/getuser');
const adduser = require('./handlers/adduser');
const addpassword = require('./handlers/addpassword');
const searchuser = require('./handlers/searchuser');
const searchuserbyfirstletter = require('./handlers/searchuserbyfirstletter');


router.get('/ping', (req, res) => ping(req, res));
router.get('/getuser', (req, res) => getuser(req, res));
router.post('/adduser', (req, res) => adduser(req, res));
router.post('/addpassword', (req, res) => addpassword(req, res));
router.get('/searchuser', (req, res) => searchuser(req, res));
router.get('/searchuserbyfirstletter', (req, res) => searchuserbyfirstletter(req, res));
           

module.exports = router;
