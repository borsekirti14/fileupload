const express = require('express');
const bodyParser = require('body-parser');
var async = require('async');
const app = express();
const path = require('path');
const port = process.env.PORT || 3002;
const http = require('http');
// const mongoose = require('mongoose');
const router = require("./router/router");
var server = http.createServer(app);
app.use(bodyParser.json({ limit: '50mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

// mongoose.connect('mongodb://localhost/imageupload',{useNewUrlParser: true, useUnifiedTopology: true}, function(err,client) {
//     if (err) {
//         console.log("DB not connected");
//     }else {
//         console.log("DB connected ");
//     }
// });
router(app)
app.get('/hello', (req, res) => {
  res.send({ express: 'Hello From Express' });
});

//   app.use(express.static(path.resolve(process.cwd(), 'client/build')))
//   app.get('*', (req, res) => {
//     res.sendFile(path.resolve(process.cwd(), 'client/build/index.html'))
//   })

server.listen(port, function(){
   console.log('Server is running on Port : ' + port);
});
