const database = require("../db/database");

const addUser = async (req, res) => {

    try {
        if (!req.body.fullname) {
            return res.status(400).send('Fullname is not present.');
        }
        const newUserstoDB = await database.addUsers(req.body.fullname, req.body.username, req.body.gender, req.body.email);

        res.status(200).json(newUserstoDB)
    } catch (error) {
        console.error("ADD USERS ERROR: ", error);
        res.status(400).send("Error adding Users");
    }
};

module.exports = addUser;
