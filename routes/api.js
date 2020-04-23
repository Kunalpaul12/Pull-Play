const express = require("express");
const routes = express.Router();
const user = require("../models/user");
var path = require("path");
var fs = require("fs");
var shell = require("shelljs");
var multer = require("multer");
var counter = shell.ls("-d", "./static/uploads").length;
var io = require("socket.io");
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log(counter);
    var path = `static/uploads/${counter}`;
    fs.exists(path, function (exists) {
      if (exists) {
        cb(null, path);
      } else {
        fs.mkdir(path, (e) => {
          if (e) {
            console.log("can't created a path");
          } else {
            cb(null, path);
          }
        });
      }
    });
  },
  filename: function (req, file, cb) {
    if (file.fieldname == "userImage") {
      var filename = "userImage";
      var extension = file.mimetype == "image/jpeg" ? ".jpg" : ".png";
      cb(null, filename + extension);
      return;
    }
    if (file.fieldname == "dedicatedToImage") {
      var filename = "dedicatedToImage";
      var extension = file.mimetype == "image/jpeg" ? ".jpg" : ".png";
      cb(null, filename + extension);
      return;
    }
    cb(null, file.originalname);
  },
});
var upload = multer({ storage: storage });

routes.get("/get", (req, res, next) => {
  user
    .find({})
    .then((response) => {
      let count = String(shell.ls("./static/uploads").length);
      let folder = shell.ls("./static/uploads");
      let data = [];
      for (var i = 0; i < count; i++) {
        let refData = {};
        refData.userImage = path.join(
          __dirname,
          `../static/uploads/${folder[i]}/userImage.png`
        );
        refData.dedicatedImage = path.join(
          __dirname,
          `../static/uploads/${folder[i]}/dedicatedToImage.png`
        );
        refData.mp3 = shell
          .find(`./static/uploads/${folder[i]}`)
          .filter(function (file) {
            return file.match(/\.mp3$/);
          })[0];
        refData.data = response[i];
        data.push(refData);
      }
      res.send(data);
    })
    .catch(next);
});

routes.post("/post", upload.any(), (req, res, next) => {
  user
    .create(req.body)
    .then((response) => {
      res.send({ response });
      counter++;
    })
    .catch(next);
});

routes.get("/list_count", (req, res, next) => {
  res.send(String(shell.ls("./static/uploads").length));
});
routes.get("/mp3", (req, res, next) => {
  res.send(
    shell.find("./static/uploads").filter(function (file) {
      return file.match(/\.mp3$/);
    })
  );
});
routes.get("/file", (req, res) => {
  console.log(path.join(__dirname, "../static/uploads/0/userImage.png"));
  res.sendFile(path.join(__dirname, "../static/uploads/0/userImage.png"));
});

module.exports = routes;
