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
        width: 50%;
        border-collapse: collapse;
        margin-top: 10px;
    }
    th, td {
        border: 1px solid #dddddd;
        text-align: left;
        padding: 8px;
    }
    tr:hover{
        background-color: blue;
        color:white;
    }
    
    th {
        background-color: #f2f2f2;
    }
    a {
        background-color: blue;
        padding:10px;
        color:white;
        text-decoration: none;
        margin-bottom:20px;
    }
</style>
</head>
<body>

<center>
    <h1>Active Champ API Documentation</h1> 
    <br>
    <a href='https://documenter.getpostman.com/view/19754715/2sA3Bj7ZDj' ">Full Documentation here</a>
</center>

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
        <th colspan="3"><h4>BOOKING</h4></th>
    </tr>
    <tr>
        <td>bookings</td>
        <td>GET</td>
        <td>Retrieve list of bookings</td>
    </tr>
    <tr>
        <td>bookings/:id</td>
        <td>GET</td>
        <td>Retrieve details of a specific booking</td>
    </tr>
    <tr>
        <td>bookings</td>
        <td>POST</td>
        <td>Create a new booking</td>
    </tr>
    <tr>
        <td>bookings/:id</td>
        <td>PUT</td>
        <td>Update details of a specific booking</td>
    </tr>
    <tr>
        <td>bookings/:id</td>
        <td>DELETE</td>
        <td>Delete a specific booking</td>
    </tr>
    <tr>
        <th colspan="3"><h4>GAME MANAGEMENT</h4></th>
    </tr>
    <tr>
        <td>games</td>
        <td>GET</td>
        <td>Retrieve list of games</td>
    </tr>
    <tr>
        <td>games/:id</td>
        <td>GET</td>
        <td>Retrieve details of a specific game</td>
    </tr>
    <tr>
        <td>games</td>
        <td>POST</td>
        <td>Create a new game</td>
    </tr>
    <tr>
        <td>games/:id</td>
        <td>PUT</td>
        <td>Update details of a specific game</td>
    </tr>
    <tr>
        <td>games/:id</td>
        <td>DELETE</td>
        <td>Delete a specific game</td>
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