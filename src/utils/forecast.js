const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/c098081b8df26ea458af6130b27a8528/' + encodeURIComponent(latitude) + ',' + encodeURIComponent(longitude) + '?units=si'

    request({ url, json: true }, (error, { body }) => {
        console.log(body.daily.data)
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + ' degress out. There is a ' + 
            body.currently.precipProbability + '% chance of rain. High temperature of ' + body.daily.data[0].temperatureHigh + '. Low temperature of ' + body.daily.data[0].temperatureLow)
        }
    })
}

module.exports = forecast