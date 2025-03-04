const dotenv = require('dotenv')
dotenv.config()
const express = require('express')
const cors = require('cors')
const app = express();
const cookieParser = require('cookie-parser')
const connectToDb = require('./db/db')
const userRoutes = require('./routes/userRoutes')
const auctionRoutes = require('./routes/auctionRoutes')


connectToDb()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())

app.get("/",function(req,res){
    res.send("hello")
})

app.use("/users",userRoutes)
app.use("/auctions",auctionRoutes);
app.use("/bids", require("./routes/auctionRoutes"));

module.exports = app