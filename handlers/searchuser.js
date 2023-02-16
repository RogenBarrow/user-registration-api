const pgp = require('pg-promise')({});
const db = pgp('postrgres://postgres:Nathifa@localhost:8033/Client_Registration')


const searchuser = async (req, res) => {
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
    };

module.exports = searchuser;