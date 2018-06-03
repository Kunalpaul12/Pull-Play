const express = require('express')
const app = express()
const socket = require('socket.io')
const server =  app.listen(8000,() =>{
    console.log('listen to local host 8000')
})
app.use(express.static('static'))
var io = socket(server)
io.on('connection',() =>{
    console.log('socket server connection is made')
})
