const express = require('express')
const app = express()
const socket = require('socket.io')
const server =  app.listen(8000,() =>{
    console.log('listen to local host 8000')
})
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/Pull_Play')
mongoose.Promise = global.Promise
app.use(express.static('static'))
app.use(bodyParser.json())
app.use('/api',require('./routes/api'))
app.use((err,req,res,next) => {
res.status(422).send({
    "error":err.message
})
})
var io = socket(server)
io.on('connection',(socket) =>{
    console.log('socket server connection is made')
})