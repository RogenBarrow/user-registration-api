const express = require('express')
const app = express()
const port = 55;

const pgp = require('pg-promise')
const db = pgp('postrgres://postgres:nathifa@localhost:8033/Client_Registration')


app.listen(
    port,
    console.log(`http://localhost:${port}`)
);

app.get('/getuser', (req, res) => (

    db.one( ('SELECT * FROM Registration')
        .then((databaseData) => {
            console.log('Data:', databaseData.value)
        })
        .catch((error) => {
            console.log('Error:', error)
        });

    )

    res.status(200).send()
));