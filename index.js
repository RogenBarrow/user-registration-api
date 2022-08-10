import postgres from 'postgres';

const express = require('express')
const app = express()
const port = 55;



const sql = postgres('postgres://postgres:nathifa@host:8033/Client_Registration')
        .then( () => {
            console.log('Connected to database')
        })
        .catch( (err) => {
            console.error('Error connecting to the database')
        })


const selectAll = await sql`
SELECT  *
FROM    Registration
`



app.listen(
    port,
    console.log(`http://localhost:${port}`)
);

app.get('/getuser', (req, res) => (
    res.status(200).send({selectAll})
));