const express = require('express')
const connectDB = require("./databaseConnections/dbConnect")
const bodyParser = require('body-parser'); // Import body-parser middleware
const cookiePerser = require("cookie-parser")
require('dotenv').config()
const userRoute = require("./routes/public/auth")
const bookings = require("./routes/admin/bookings")
const facility = require("./routes/admin/operations")
// router 
const isAdminAuthRouter = require("./routes/admin/auth")
// middleware 

const app = express()
app.use(express.json())
app.use(express.json());
app.use(cookiePerser())

// route

app.get('/', (req, res) => {
    res.send( `<center>
                <h1>Active Champ API </h1> 
                <br /><a href='https://documenter.getpostman.com/view/19754715/2sA3Bj7ZDj'>here is the link</a>
                <table>
                </table>
                <center>`)
})


// user routes
app.use("/api/v1/auth", userRoute)

// admin routes
app.use("/api/v1/admin/auth", isAdminAuthRouter)
app.use("/api/v1/bookings", bookings)
app.use("/api/v1/facility", facility)


const port = process.env.PORT || 3004

const start = async () => {
    try {
        await connectDB(process.env.MONGODB_URI_local)
        app.listen(port, console.log(`Server is listen port ${port}`))
    } catch (error) {
        console.log(error)
    }
}

start();