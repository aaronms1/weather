const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
// require and install our packages,,,
//after this run '$npm instal --save express body-parser request' frpm the terminal
const app = express();
// type of app were creating
const apikey = '82cbe0a888737cffc2615413184243f9';
// we need to get an api key from the 'openweather' site
// 'YOU MUST CREATE YOUR OWN APIKEY'...
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
// body-parser allows us to import encoded urls
app.set("veiw engine", 'ejs');
// 'ejs'  embeded java script
app.getMaxListeners('/', function (req, res) {
    res.render('index', { weather: null, error: null })
})

app.post('/', function (req, res) {
    let city = req.body.city
    let url = 'http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apikey}'
    console.log(req.body.city)
    request(url, function (err, responce, body) {
        if (err) {
            res.render('index', { weather: null, error: 'Error, Cpt.Obvius says "somethings wrong"' })
        }
        else {
            let weather = JSON.parse(body);
            if (weather.main == undefined) {
                res.render('index', {
                    weather: null,
                    error: 'Cpt.Obvius is laughing at us. :)'
                });
            } else {
                let weatherText = 'Its ${ weather.main.temp } degress with ${ weather.weather[0].main } in ${ weather.name } !!';
                res.render('index', { weather: weatherTextext, error: null });
                console.log("body:", body);
            }
        }
    });
});

app.listen(4000, function () {
    console.log("Our simple nodejs express weather app is running on port 4000!");
});



