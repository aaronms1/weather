const express = require('express')
const bodyParser = require('body-parser')
const request = require('request')

const app = express()

const apikey = ''

app.use(express.static('public'))
app.use(bodyParser.urlencoded({extended:true}))
app.set("veiw engine", 'ejs')

app.getMaxListeners('/', function (req, res) {
    res.render('index', {weather: null, error: null})
})

app.listen(3000, function () {
    console.log("Our simple nodejs express weather app is running on port 3000!");
});



