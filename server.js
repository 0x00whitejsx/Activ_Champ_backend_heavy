const express = require('express')
const connectDB = require("./databaseConnections/dbConnect")
const bodyParser = require('body-parser'); // Import body-parser middleware
const cookiePerser = require("cookie-parser")
require('dotenv').config()

// middleware 

const app = express()
app.use(express.json())
app.use(express.json());
app.use(cookiePerser())

// route

app.get('/', (req, res) => {
    res.send("<h1>active Champ API </h1> <a href='#'>here is the link</a>")
})





const port = process.env.PORT || 3004

const start = async () => {
    try {
        await connectDB(process.env.MONGODB_URI)
        app.listen(port, console.log(`Server is listen port ${port}`))
    } catch (error) {
        console.log(error)
    }
}

start();