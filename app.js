const express = require("express");
const app = express();
const request = require("request");
surl = "http://omdbapi.com/?apikey=thewdb&s=";
turl = "http://omdbapi.com/?apikey=thewdb&plot=full&t=";

// Configuring the app 
app.set("view engine", "ejs");

// Landing Page
app.get('/', function (req, res) {
    res.render('index');
});

// INDEX : Show all items (here, results of a query)
app.get('/results', function (req, res) {
    const search = req.query.search;
    request(surl + search, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            data = JSON.parse(body);
            res.render('results', { data: data });
        }
    });
});

app.get('/details', function (req, res) {
    res.send("welcome to details page");
})

app.listen(3000, function () {
    console.log("The Movie App server is up and running!");
})