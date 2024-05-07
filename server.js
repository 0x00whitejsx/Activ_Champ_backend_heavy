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
    <style>
    table {
        width: 100%;
        border-collapse: collapse;
    }
    th, td {
        border: 1px solid #dddddd;
        text-align: left;
        padding: 8px;
    }
    th {
        background-color: #f2f2f2;
    }
</style>
                <h1>Active Champ API </h1> 
                <br /><a href='https://documenter.getpostman.com/view/19754715/2sA3Bj7ZDj'>here is the link</a>
                <table>
                <tr>
                  <th>API</th>
                  <th>Method</th>
                  <th>Description</th>
                </tr>
                <tr>
                  <td>users</td>
                  <td>GET</td>
                  <td>Retrieve list of users</td>
                </tr>
                <tr>
                  <td>users/:id</td>
                  <td>GET</td>
                  <td>Retrieve details of a specific user</td>
                </tr>
                <tr>
                  <td>users</td>
                  <td>POST</td>
                  <td>Create a new user</td>
                </tr>
                <tr>
                  <td>users/:id</td>
                  <td>PUT</td>
                  <td>Update details of a specific user</td>
                </tr>
                <tr>
                  <td>users/:id</td>
                  <td>DELETE</td>
                  <td>Delete a specific user</td>
                </tr>
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