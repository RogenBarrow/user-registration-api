const pgp = require('pg-promise')({});
const db = pgp('postrgres://postgres:Nathifa@localhost:8033/Client_Registration')

const searchuserbyfirstletter = async (req, res) => {
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
    };
    
module.exports = searchuserbyfirstletter;