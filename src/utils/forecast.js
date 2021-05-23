const request = require('request')

const forecast = (lat, long, callback) => {
  const apiUrl = ''
  request({ url: apiUrl, json: true }, (error, response) => {
    if (error) {
      callback('Unable to connect to the location service', undefined)
    } else if (response.body.features.length === 0) {
      callback('Unable to find location, Try another search', undefined)
    } else {
      callback(undefined, {
        latitude: response.body.features[0].center[0],
        longitude: response.body.features[0].center[1],
        location: response.body.features[0].place_name
      })
    }
  })
}
module.exports = forecast
