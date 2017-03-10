// load the express package and create our app
var express = require('express');
var path = require('path');
var app = express();
var GitHubApi = require("github");
var vault = require('avault').createVault(__dirname  ); //+ "\\node_modules\\avault"
//------------------------------------------
var Client = require(__dirname );//+ "\\node_modules\\github\\lib\\index"
//var github = new Client({
//    debug: true
//});

var github = new GitHubApi({});

//------------------------------------------




//console.log(__dirname+ "\\node_modules\\avault");


	function funct(req){
	var method = req.method;
	console.log(method);
							//var object = Object.keys(req.res);
 	 var response = {
 	 			 'method' : method,
 	 			 'headers' : req.headers,
				 'query' : req.query,
				 'body' : req.body,
				};
	return response;
	};


	function infomation(req, res, github) {
    "use strict";

    var responce = res;

        github.repos.getContent({
            owner: "JohnWilliams1990",
            repo: "csci-3800-hw3",
            path: ""//https://github.com/JohnWilliams1990/csci-3800-hw3"//C:\\Users\\John\\Desktop\"
        },  function (err, res) {
            console.log(funct(req));

            responce.header.Data_From_GIT = res.data[0];
            res.data[0].incomming_header = funct(req);
            console.log(funct(req));

            responce.json(res.data[0]);

        }), responce, req;

	};



//console.log(parsedUrl.query);

app.get('/oauth', function(req, res,next) {
        var key = "";
        vault.get('GitSafe', function (profileString) {
        var profile = JSON.parse(profileString);
        //console.log(JSON.stringify(profile.GitToken));
        key += profile.GitToken;

            },key);

                github.authenticate({
                    type: "oauth",
                    token: key
        });

//
        infomation(req, res, github);
   //res.json(req.headers);
    //
});
	

// catch all for bad requests against the url
app.use("/", function (req, res,next){

var method = req.method;
console.log(method + " Failed with error 405");

res.status(405);        // HTTP status 405: method not allowed
   res.send('Method is not supported by server');

		next();
});

// start the server
app.listen(1337);
console.log('1337 is the magic port!');
console.log("http://localhost:1337/");