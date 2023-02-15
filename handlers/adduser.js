const validator = require('validator');
const pgp = require('pg-promise')({});
const db = pgp('postrgres://postgres:Nathifa@localhost:8033/Client_Registration');

const addUser = async (req, res) => {

if (!req.body.fullname) return res.status(400).send("No username availabe can't process.");

    //validate if string is either empty or is an email
   validator.isEmpty(req.body.fullname)
   validator.isEmail(req.body.email)
   validator.isEmpty(req.body.username)
   validator.isEmpty(req.body.gender)

   
  await  db.any(`INSERT INTO Registration(fullname, username, gender, email) VALUES ('${req.body.fullname}', '${req.body.username}', '${req.body.gender}', '${req.body.email}')`)
    .then((newUserData) => {     

        console.log(`The user: ${req.body.username} has been added on ${Date()}`);
        res.status(200).send(`${req.body.username} Username created.`);
    })
    .catch((error) => {
        console.log('Error:', error)
        res.status(400).send('Users not added.') 
    })
    
};

module.exports = addUser;
