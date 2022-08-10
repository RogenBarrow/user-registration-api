const express = require('express')
const app = express()
const cors = require('cors')
const port = 55;

app.listen(
    port,
    console.log(`http://localhost:${port}`)
);

app.get('getuser', (req, res) (
    res.status(200).send('request received')
)

)