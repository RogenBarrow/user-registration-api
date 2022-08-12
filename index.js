const express = require('express')
const app = express()
const port = 55;

const pgp = require('pg-promise')({});
const db = pgp('postrgres://postgres:Nathifa@localhost:8033/Client_Registration')


app.listen(
    port,
    console.log(`http://localhost:${port}`)
);


app.get('/getuser',async (req, res) => (
   await db.any( 'SELECT fullname, username, gender, email FROM Registration')
        .then((databaseData) => {
            const [{fullname, username, gender, email}] = databaseData;
            console.log('Data:', databaseData)
            res.status(200).send(fullname,  username,  gender, email);
        })
        .catch((error) => {
            console.log('Error:', error)
        })
    
));