const database = () => {
    const pgp = require('pg-promise')({});
    const db = pgp('postrgres://postgres:Nathifa@localhost:8033/Client_Registration')
    };



module.exports = database;