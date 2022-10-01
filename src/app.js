const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express();
const port = process.env.PORT || 3000;

const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Vitesh Kambara'
    });
})
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Vitesh Kambara',
    })
})
app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide a address'
        })
    }
    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error });
        }
        
        console.log(`Location: ${location}\nLatitude: ${latitude}\nLongitude: ${longitude}`);
        forecast(latitude, longitude, (error, { temperature, feelsLike, description, windSpeed, humidity, uvIndex, precip }) => {
            if (error) {
                return res.send(error);
            }
            console.log(`Temperature: ${temperature}\nFeels Like: ${feelsLike}\nDescription: ${description}\nWind Speed: ${windSpeed}\nHumidity: ${humidity}\nUV Index: ${uvIndex}\nPrecipitation in the last 24 hours: ${precip}`);
            res.send({
                temperature: temperature,
                feelsLike: feelsLike,
                description: description,
                windSpeed: windSpeed,
                humidity: humidity,
                uvIndex: uvIndex,
                precip: precip,
                location,
                address: req.query.address,
            })
        })
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }
    console.log(req.query)
    res.send({
        products: []
    })
})
app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Page',
        message: 'Help message',
        name: 'Vitesh Kambara'
    })
})

app.get('/help/*', (req, res) => {
    res.render('page_not_found', {
        title: '404',
        error: 'Error: Help article not found'
    })
})
app.get('*', (req, res) => {
    res.render('page_not_found', {
        title: '404',
        error: 'Error: Page not found'
    })
})
//app.com
//app.com/weather
//app.com/help
//app.com/about
app.listen(port, () => {
    console.log('Server is up and running on port ' + port);
})