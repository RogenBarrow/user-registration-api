const express = require('express')
const app = express()
const port = 55;
const bodyParser = require('body-parser');

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

app.post('/adduser', (req, res) => (
    db.any(`INSERT INTO Registration(fullname, username, gender, email) VALUES ('${req.body.fullname}', '${req.body.username}', '${req.body.gender}', '${req.body.email}')`)
    .then((newUserData) => {
        // const [{fullname, username, gender, email}] = newUserData;
        if (!req.body.fullname) return res.status(400).send("No username availabe can't process.");

        console.log(`The user: ${req.body.username} has been added on ${Date()}`);
        res.status(200).send(`${req.body.username} Username created.`);
    })
    .catch((error) => {
        console.log('Error:', error)
        res.status(400).send('Users not added.') 
    })
    
));        
    