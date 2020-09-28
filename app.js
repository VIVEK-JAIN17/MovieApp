const express = require("express");
const app = express();
const request = require("request");
surl = "http://omdbapi.com/?apikey=thewdb&s=";
iurl = "http://omdbapi.com/?apikey=thewdb&plot=full&i=";

// Configuring the app 
app.set("view engine", "ejs");
app.use(express.static(__dirname + '/public'));

// Landing Page
app.get('/', function (req, res) {
    res.render('landing');
});

// INDEX : Show all items (here, results of a query)
app.get('/results', function (req, res) {
    const search = req.query.search;
    request(surl + search, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            data = JSON.parse(body);
            res.render('index', { data: data });
        }
    });
});

// SHOW : Display details of item (here, selected movie/series)
app.get('/results/:id', function (req, res) {
    var id = req.params.id;
    request(iurl + id, function (err, response, body) {
        if (!err && response.statusCode == 200) {
            details = JSON.parse(body);
            res.render('details', { movie: details });
        }
    })
})

app.listen(3000, function () {
    console.log("The Movie App server is up and running at localhost:3000");
})