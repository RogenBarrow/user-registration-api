const database = require("../db/database");

const getuser = async (req,res) => {
    try {
        const usersFromDb = await database.getAllUsers();
        res.status(200).send(usersFromDb);
    } catch (error) {
        console.error("GET USERS ERROR: ", error);
        res.status(400).send("Error retreiving Users");        
    }
}

module.exports = getuser;