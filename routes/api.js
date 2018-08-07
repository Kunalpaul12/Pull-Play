const express = require('express')
const routes = express.Router()
const user = require('../models/user')

routes.get('/get',(req,res,next) => {
    user.find({})
    .then((response) =>{res.send(response)})
    .catch(next)
})

routes.post('/post',(req,res,next) => {
    user.create(req.body)
    .then((response) => {res.send({response})})
    .catch(next)
})

module.exports = routes