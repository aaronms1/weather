// require and install our packages,,,
const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const http = require("http");
//after this run '$npm instal --save express body-parser request http' from-
// the CL...
// also installed via the CL,nodemon --save-dev. this refreshes the app every-
// time we make a change and save..
const app = express();
// type of app were creating...
app.set("view engine", "ejs");
// setting veiw engine to ejs...
app.get("/", function (req, res) {
    res.render("index");
});
// route for index page...
const apikey = "82cbe0a888737cffc2615413184243f9";
// we need to get an api key from 'Https://openweathermap.org'
// 'YOU MUST CREATE YOUR OWN APIKEY FOR THIS APP TO WORK ON YOUR BOX'...
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({ extended: true }));
// body-parser allows us to import encoded urls
app.getMaxListeners("/", function (req, res) {
    res.render("index", { weather: null, error: null })
});

app.post('/', function (req, res) {
    let city = req.body.city
    let url = "https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}" 
    //"https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apikey}"
    console.log(req.body.city)
    request(url, function (err, responce, body) {
        if (err) {
            res.render("index", { weather: null, error: "!ERROR!, Cpt.Obvius says...'somethings wrong'" })
        }
        else {
            let weather = JSON.parse(body);
            if (weather.main == undefined) {
                res.render("index", {
                    weather: null,
                    error: "Cpt.Obvius is laughing at us...!ERROR! :)"
                });
            } else {
                let weatherText = "Its ${ weather.main.temp } degress with ${ weather.weather[0].main } in ${ weather.name } !!";
                res.render("index", { weather: weatherTextext, error: null });
                res.render("index", { weather: weatherTextext, error: null });
                console.log("body:", body);
            };
        };
    });
});

app.listen(4000, function () {
    console.log("Our simple nodejs express weather app is running on port 4000!");
});
// start the server from the CL with "node index.js"...


