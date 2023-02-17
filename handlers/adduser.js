const database = require("../db/database");

const addUser = async (req, res) => {

    const fullname = req.body.fullname;
    const username = req.body.username;
    const gender = req.body.gender;
    const email = req.body.email;
    
    try {
        if (fullname) {
            return res.status(400).send('Fullname is not present.');
        } 
        if (username) {
            return res.status(400).send('Username is not present.');
        } 
        if (gender) {
            return res.status(400).send('Gender is not present.');
        } 
        if (email) {
            return res.status(400).send('Email is not present.');
        } 

        const newUserstoDB = await database.addUsers(fullname, username, gender, email);

        res.status(200).json(newUserstoDB)
    } catch (error) {
        console.error("ADD USERS ERROR: ", error);
        res.status(400).send("Error adding Users");
    }
};

module.exports = addUser;
