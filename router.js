const express = require('express');
const router = express.Router();

// Handlers
const ping = require('./handlers/ping');


router.get('/ping', (req, res) => ping(req, res));

router.get('/getuser',async (req, res) => (
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

router.post('/adduser', (req, res) => {
    if (!req.body.fullname) return res.status(400).send("No username availabe can't process.");

    //validate if string is either empty or is an email
   validator.isEmpty(req.body,fullname)
   validator.isEmail(req.body.email)
   validator.isEmpty(req.body.username)
   validator.isEmpty(req.body.gender)

   
    db.any(`INSERT INTO Registration(fullname, username, gender, email) VALUES ('${req.body.fullname}', '${req.body.username}', '${req.body.gender}', '${req.body.email}')`)
    .then((newUserData) => {     

        console.log(`The user: ${req.body.username} has been added on ${Date()}`);
        res.status(200).send(`${req.body.username} Username created.`);
    })
    .catch((error) => {
        console.log('Error:', error)
        res.status(400).send('Users not added.') 
    })
    
});





router.post('/addpassword', (req, res) => {
    const { username } = req.query;
    const { password } = req.query

    const hashedPassword = Buffer.from(password);

    //To hash a password
    pwd.hash(hashedPassword, function (err, hash) {

            console.log(hashedPassword)
        if (err) throw err

        pwd.verify(hashedPassword, hash, function(err, result) {

            if (err) throw  err

            switch (result) {
                case securePassword.INVALID_UNRECOGNIZED_HASH:
                  return console.error('This hash was not made with secure-password. Attempt legacy algorithm')
                case securePassword.INVALID:
                  return console.log('Invalid password')
                case securePassword.VALID:
                  return console.log('Authenticated')
                case securePassword.VALID_NEEDS_REHASH:
                  console.log('Yay you made it, wait for us to improve your safety')

                pwd.hash(hashedPassword, function (err, improvedHash) {
                    if (err) console.log('You are authenticated, but we could not improve your safety this time around')
            })
         };
    })
});
   
    db.any(`UPDATE Registration SET password = $1 WHERE username = $2`, [hashedPassword, username])
    .then((newUserData) => {     

        console.log(`The user: ${username} has been added on ${Date()} with password`);
        res.status(200).send(`New password created`);
    })
    .catch((error) => {
        console.log('Error:', error)
        res.status(400).send('Users not added.') 
    })
    
});

router.get('/searchuser',async (req, res) => {
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
        });
    
        router.get('/searchuserbyfirstletter',async (req, res) => {
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
                });       

module.exports = router;
