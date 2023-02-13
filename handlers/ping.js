const ping = (req, res) => {
    res.status(200).send("The Real Pong!");
};

module.exports = ping;