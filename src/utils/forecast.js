const request = require('request');


const forecast = (lat, long, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=c47d3a7cfe99e60e6ec60bae774feda4&query=${(lat)},${(long)}&units=f`;

    request ({ url: url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service. ');
        } else if (body.error) {
            callback('Unable to find location.');
        } else {
            callback(undefined, {
                // location: response.body.location.name,
                // region: response.body.location.region,
                //forecast: `It is currently ${body.current.weather_descriptions[0]} in ${response.body.location.name} and the temperature is ${body.current.temperature} and it currently feels like ${body.current.feelsLike}`,
                temperature: `${body.current.temperature}\u00B0F`,
                feelsLike: `${body.current.feelslike}\u00B0F`,
                description: body.current.weather_descriptions[0]
            })
        }
    })
};

module.exports = forecast;















// const url = `http://api.weatherstack.com/current?access_key=c47d3a7cfe99e60e6ec60bae774feda4&query=${lat},${long}&units=f`;

// request({ url: url, json: true }, (error, response) => {
//     if (error) {
//         console.log('Unable to connect to weather service.')
//     } else if (response.body.error) {
//         console.log('Unable to find location.')
//     } else {
//         console.log(`It is currently ${response.body.current.temperature} degrees outside in ${response.body.location.name}, ${response.body.location.region}.`);
//         console.log(`It feels like ${response.body.current.feelslike} degrees, and it is ${response.body.current.weather_descriptions[0]}`);
//     }
// })
