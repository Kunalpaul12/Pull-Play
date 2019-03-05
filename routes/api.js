
const express = require('express')
const routes = express.Router()
const user = require('../models/user')
var fs = require("fs")
var shell = require("shelljs")
var multer  = require('multer')
var counter = 0;
var io = require('socket.io')
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    var path = `static/uploads/${counter}`
    fs.exists(path, function(exists) {
      if (exists) {
        cb(null, path)
      }else{
        fs.mkdir(path,(e) =>{
          if(e){console.log("can't created a path")}
          else{cb(null, path)}
        })
      }
  });
  },
  filename: function (req, file, cb) {
    console.log("this is request :- ",req)
    if(file.fieldname == "userImage"){
      var filename = "userImage"
      var extension = file.mimetype == "image/jpeg" ? ".jpg" : ".png"
      cb(null,filename+extension)
      return
    }
    if(file.fieldname == "dedicatedToImage"){
      var filename = "dedicatedToImage"
      var extension = file.mimetype == "image/jpeg" ? ".jpg" : ".png"
      cb(null,filename+extension)
      return
    }
    cb(null, file.originalname)
  }
})
var upload = multer({ storage: storage })

routes.get('/get',(req,res,next) => {
    user.find({})
    .then((response) =>{res.send(response)})
    .catch(next)
})

routes.post('/post',upload.any(),(req,res,next) => {
    user.create(req.body)
    .then((response) => {
      res.send({response});
      counter = shell.ls("./static/uploads").length + 1
    })
    .catch(next)
})

routes.get('/list_count',(req,res,next) => {
  res.send(String(shell.ls("./static/uploads").length))
})
routes.get('/mp3',(req,res,next) => {
  res.send(
    shell.find('./static/uploads')
    .filter(function(file) { return file.match(/\.mp3$/); }))
})

module.exports = routes