const request = require('request');

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1Ijoidml0ZXNoMjAwMiIsImEiOiJjbDdzenpzZjUwcGV6M3dtcWJuNTc2czdkIn0.YtFAeXePUIZ6tVJRshst2A&limit=1'

    request({ url: url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to locatoin services', undefined);
        } else if (body.features.length === 0) {
            callback('Unable to find coordinates for specified location', undefined);
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name,
            })
        }
    })
};

module.exports = geocode;







// geocode('Cary', (error, data) => {
//     console.log('Error', error);
//     console.log('Data', data);

// })
// geocode('Philadelphia', (error, data) => {
//     console.log('Error', error);
//     console.log('Data', data);
// })


// const urlMapBox = 'https://api.mapbox.com/geocoding/v5/mapbox.places/cary.json?access_token=pk.eyJ1Ijoidml0ZXNoMjAwMiIsImEiOiJjbDdzenpzZjUwcGV6M3dtcWJuNTc2czdkIn0.YtFAeXePUIZ6tVJRshst2A&limit=1';

// request({ url: urlMapBox, json: true }, (error, response) => {
//     if (error) {
//         console.log('Unable to connect to location services');
//     } else if (response.body.features.length === 0) {
//         console.log('Unable to find coordinates for specified location.')
//     } else {
//         const latitude = response.body.features[0].center[1];
//         const longitude = response.body.features[0].center[0]
//         console.log(`Grid coordinates: (${latitude}, ${longitude})`);
//     }

// })
