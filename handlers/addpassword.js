// const pgp = require('pg-promise')({});
// const db = pgp('postrgres://postgres:Nathifa@localhost:8033/Client_Registration')
const securePassword = require('secure-password');
const pwd = securePassword();

const addpassword = async (req, res) => {
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
    
};

module.exports = addpassword;