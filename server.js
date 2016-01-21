"use strict";

var http = require("http");
var md5 = require('md5');

var server = http.createServer(function(req, res){
  var urlParts = req.url.match(/[^/]+/g);
  if(urlParts === null){
    res.end("No call made\n");
  }
  else{
    switch(urlParts[0]){
      case "gravatar":
        if(urlParts[1] === undefined){
          res.end("No email provided\n400 - Bad Request\n")
        }
        res.end("http://www.gravatar.com/avatar/" + md5(urlParts[1]) + "\n");
        break;
      case "square":
        if(urlParts[1] === undefined || isNaN(Number(urlParts[1])) || urlParts[2] !== undefined){
          res.end("Invalid input\nMust call with a single number\n400 - Bad Request\n")
        }
        else{
          res.end(Math.pow(Number(urlParts[1]),2)+"\n");
        }
        break;
      default:
        res.end("400 - Bad Request\n");
        break;
    }
  }
});
server.listen(4000);
