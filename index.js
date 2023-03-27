const express = require("express")
const app = express();
const mongoose = require("mongoose");
const { userRoute } = require("./routes/user.route");
const {noteRoute} = require("./routes/note.route");
const { auth } = require("./middleware/auth.middleware");
const cors = require("cors")
require("dotenv").config()
app.use(cors())

require("dotenv").config()
app.use(express.json())

app.use("/user",userRoute)

app.use(auth)

app.use("/notes",noteRoute)



app.listen(process.env.port,async ()=>{

    try {
        await mongoose.connect(process.env.mongoURL)
        console.log("Connected to DB")
    } catch (error) {
        console.log(error)
    }

    console.log( `server is running at ${process.env.port}` )
})