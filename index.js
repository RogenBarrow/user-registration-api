const express = require('express')
const app = express()
const port = 55;
const bodyParser = require('body-parser');
const { query } = require('express');
const { queryResult } = require('pg-promise');
const validator = require('validator');
const securePassword = require('secure-password');

const pwd = securePassword();

const pgp = require('pg-promise')({});
const db = pgp('postrgres://postgres:Nathifa@localhost:8033/Client_Registration')

app.use(bodyParser.json());


app.listen(
    port,
    console.log(`http://localhost:${port}`)
);


app.get('/getuser',async (req, res) => (
   await db.any( `SELECT fullname, username, gender, email FROM Registration`)
        .then((databaseData) => {
            console.log('Data:', databaseData)
            res.status(200).send(databaseData);
            
        })
        .catch((error) => {
            console.log('Error:', error)
            res.status(400).send('Request not found');
        })
    ));

app.post('/adduser', (req, res) => {
    if (!req.body.fullname) return res.status(400).send("No username availabe can't process.");

    //validate if string is either empty or is an email
   validator.isEmpty(req.body,fullname)
   validator.isEmail(req.body.email)
   validator.isEmpty(req.body.username)
   validator.isEmpty(req.body.gender)

   
    db.any(`INSERT INTO Registration(fullname, username, gender, email) VALUES ('${req.body.fullname}', '${req.body.username}', '${req.body.gender}', '${req.body.email}')`)
    .then((newUserData) => {     

        console.log(`The user: ${req.body.username} has been added on ${Date()}`);
        res.status(200).send(`${req.body.username} Username created.`);
    })
    .catch((error) => {
        console.log('Error:', error)
        res.status(400).send('Users not added.') 
    })
    
});

app.post('/addpassword', (req, res) => {
    const { username } = req.query;
    const { password } = req.query

    pwd.hash(password, function (err, hash))
   
    db.any(`UPDATE Registration SET password = $1 WHERE username = $2`, [password, username])
    .then((newUserData) => {     

        console.log(`The user: ${username} has been added on ${Date()} with password`);
        res.status(200).send(`New password created`);
    })
    .catch((error) => {
        console.log('Error:', error)
        res.status(400).send('Users not added.') 
    })
    
});

app.get('/searchuser',async (req, res) => {
    const {username} = req.query;
    console.log(username);
    await db.one( `SELECT username FROM Registration WHERE username = $1`, username)
         .then((databaseData) => {
             console.log('Data:', databaseData)                
             res.status(200).send(databaseData);
         })
         .catch((error) => {
             console.log('Error:', error)
             res.status(400).send('Request not found');
         })
        });
    
        app.get('/searchuserbyfirstletter',async (req, res) => {
            const { firstletter } = req.query;
            const filter = firstletter + '%';
            console.log(firstletter);
            await db.any( `SELECT username FROM Registration WHERE username LIKE $1`, filter)
                 .then((databaseData) => {
                     console.log('Data:', databaseData)          
                     res.status(200).send(databaseData);
                 })
                 .catch((error) => {
                     console.log('Error:', error)
                     res.status(400).send('Request not found');
                 })
                });        