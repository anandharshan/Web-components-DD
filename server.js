var express = require("express"),
    app = express(),
    //    bodyParser = require('body-parser'),
    //  errorHandler = require('errorhandler'),
    //methodOverride = require('method-override'),
    port = parseInt(process.env.PORT, 10) || 3000;

//app.get("/", function (req, res) {
//  res.redirect("/index.html");
//});

//app.use(methodOverride());
//app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({
//  extended: true
//}));
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
app.use(express.static(__dirname + '/'));

//app.use(errorHandler({
//  dumpExceptions: true, 
//  showStack: true
//}));

console.log("Simple static server listening at http://localhost:" + port);
app.listen(port);

var fs    = require("fs");

app.get('/api/filecontent', function(req, res) {
	console.log('api called');
	// console.log(req);
	fs.readFile(req.query.url,'utf8', function (err, data) {
		if (err){
            res.send("Error ErrorErrorErrorErrorErrorErrorErrorErrorErrorErrorErrorError.\n Developer has not set the links correctly, go to assets/modules/app.js and set the links correctly.")
        }else{
            res.send(data).end();
        }
		// console.log(data);
		
	});
	

        // use mongoose to get all todos in the database
       
});