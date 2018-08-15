const express = require('express')
const routes = express.Router()
const user = require('../models/user')
var multer  = require('multer')
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploadImages')
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now())
    }
  })
var upload = multer({ storage: storage })

routes.get('/get',(req,res,next) => {
    user.find({})
    .then((response) =>{res.send(response)})
    .catch(next)
})

routes.post('/post',upload.any(),(req,res,next) => {
    // Everything went fine
    user.create(req.body)
    .then((response) => {res.send({response})})
    .catch(next)
    
})

module.exports = routes