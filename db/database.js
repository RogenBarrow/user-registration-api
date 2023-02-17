// const pgp = require('pg-promise')();
// const db = pgp('postrgres://postgres:Nathifa@localhost:8033/Client_Registration');

const { Client } = require('pg')
const client = new Client({
    user: 'postgres',
    host: '127.0.0.1',
    database: 'Client_Registration',
    password: 'Nathifa',
    port: 8033,
})

// Conenct to Dabatase
const connect = async () => {
    try {
        await client.connect()
    } catch (error) {
        console.error("PG-DB ERROR: ", error);
    }
};



// Disconnect from Database
const disconnect = async () => {
    try {
        await client.end()
    } catch (error) {
        console.error("PG-DB ERROR: ", error);
    }
};

// Get All Users from Database
const getAllUsers = () => (
    client
        .query("SELECT fullname, username, gender, email FROM Registration")
        .then((allUsersfromDb) => {
            return allUsersfromDb;
        })
        .catch((error) => {
            throw error;
        })
);


const addUsers = (fullname, username, gender, email) => (
client
    .query("INSERT INTO Registration(fullname, username, gender, email) VALUES ($1, $2, $3, $4)", [fullname, username, gender, email])
    .then((newUserData) => {
        console.log('New user added: ', newUserData)
        return newUserData;
    })
    .catch((error) => {
        throw error;
    })
);




// if (!req.body.fullname) return res.status(400).send("No username availabe can't process.");

//     //validate if string is either empty or is an email
//    validator.isEmpty(req.body.fullname)
//    validator.isEmail(req.body.email)
//    validator.isEmpty(req.body.username)
//    validator.isEmpty(req.body.gender)

   
//   await  db.any(`INSERT INTO Registration(fullname, username, gender, email) VALUES ('${req.body.fullname}', '${req.body.username}', '${req.body.gender}', '${req.body.email}')`)
//     .then((newUserData) => {     

//         console.log(`The user: ${req.body.username} has been added on ${Date()}`);
//         res.status(200).send(`${req.body.username} Username created.`);
//     })
//     .catch((error) => {
//         console.log('Error:', error)
//         res.status(400).send('Users not added.') 
//     })
    
//     ;

// Main Export Object
const database = {
    connect,
    disconnect,
    getAllUsers,
    addUsers,
};

module.exports = database;