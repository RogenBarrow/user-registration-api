const express = require('express')
const app = express()
const port = 55;
const bodyParser = require('body-parser');
const { query } = require('express');

//import validator from 'validator';

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

   //validator.isEmpty(req.body,fullname)
    db.any(`INSERT INTO Registration(fullname, username, gender, email) VALUES ('${req.body.fullname}', '${req.body.username}', '${req.body.gender}', '${req.body.email}')`)
    .then((newUserData) => {
        // const [{fullname, username, gender, email}] = newUserData;
        

        console.log(`The user: ${req.body.username} has been added on ${Date()}`);
        res.status(200).send(`${req.body.username} Username created.`);
    })
    .catch((error) => {
        console.log('Error:', error)
        res.status(400).send('Users not added.') 
    })
    
});

app.get('/searchuser',async (req, res) => (
    await db.any( `SELECT username FROM Registration`)
         .then((databaseData) => {
             console.log('Data:', databaseData)
             const queryrequest = req.query;
             console.log(queryrequest);
             const result = databaseData.map(queryrequest => {
                return queryrequest.username;
             });
             console.log(result);
                                   
             res.status(200).send(result);
             
             
             
         })
         .catch((error) => {
             console.log('Error:', error)
             res.status(400).send('Request not found');
         })
     ));
    