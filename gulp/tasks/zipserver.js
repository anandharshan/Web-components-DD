'use strict';

var config = require('../config');
var http = require('http');
var express = require('express');
var gulp = require('gulp');
var gutil = require('gulp-util');
var morgan = require('morgan');
var multer = require('multer');

var done = false;
var fs = require('fs');
var check = require('../node_zip/check');
gulp.task('zipserver', function() {

  var app = express();
  var  port = parseInt(process.env.PORT, 10) || 8000;

	// log all requests to the console
	app.use(morgan('dev'));
	app.use(express.static(config.dist.root));
	var auth = require('basic-auth');
	var crypto = require('crypto');
	 // app.use(function(req, res, next) {
	 //     var user = auth(req);
	 //     if (user === undefined || user['name'] !== 'vmf' || crypto.createHash('md5').update(user['pass']).digest('hex') !== '799763bf7234f31a8eaf56b4b700e0c5') {
	 //         res.statusCode = 401;
	 //         res.setHeader('WWW-Authenticate', 'Basic realm="MyRealmName"');
	 //         res.end('Unauthorized');
	 //     } else {
	 //         next();
	 //     }
	 // });
	console.log(__dirname);
	app.use(multer({
		dest : './uploads/',
		rename : function(fieldname, filename) {
			return filename + Date.now();
		},
		onFileUploadStart : function(file) {
			console.log(file.originalname + ' is starting ...');
		},
		onFileUploadComplete : function(file) {
			console.log(file.fieldname + ' uploaded to  ' + file.path);
			done = true;
		}
	}));
	app.use(express.static(__dirname + '/../../'));
	console.log("Simple static server listening at http://localhost:" + port);
	app.listen(port);
	var fs = require("fs");
	app.get('/api/filecontent', function(req, res) {
		console.log('api called');
		console.log(req.query.url);
		fs.readFile(__dirname + '/../../dev/' + req.query.url, 'utf8', function(err, data) {
			if (err) {
				res.send("Error ErrorErrorErrorErrorErrorErrorErrorErrorErrorErrorErrorError.\n Developer has not set the links correctly, go to assets/modules/app.js and set the links correctly.");
			} else {
				res.send(data).end();
			}
		});
	});

	app.post('/api/uploadFile', function(req, res) {
		if (done) {
			console.log(req.files);
			res.end(JSON.stringify({
				message : "File uploaded.",
				fileName : req.files.fileToUpload.name
			}));
		}
	});

	app.post('/api/deleteFile', function(req, res) {
		var body = '';
		var fileName = '';

		req.on('data', function(chunk) {
			body += chunk;
		});
		req.on('end', function() {
			fileName = JSON.parse(body).fileName;
			fs.unlink('./uploads/' + fileName, function(err) {
				if (!err) {
					console.log(fileName + " deleted successfully");
					res.end("File deleted successfully");
				}
			});
		});
	});


	app.post('/api/generate',function(req,res){
		var queryData = "";
		req.on('data', function(data) {
            queryData += data;
            console.log(queryData);
            check.concat_js(queryData,res);
            if(queryData.length > 1e6) {
                queryData = "";
                res.writeHead(413, {'Content-Type': 'text/plain'}).end();
                req.connection.destroy();
            }
        });
		// console.log(req.body);
	});

 
       
});






