const request = require('request')
const geocode = (address, callback) => {
  const geoCodeUrl =
    'https://api.mapbox.com/geocoding/v5/mapbox.places/' +
    encodeURIComponent(address) +
    '.json?access_token=pk.eyJ1Ijoic3J0aGtncHQwIiwiYSI6ImNrb3YyYWhhNDA0NHIyd3BldGIwc290eTUifQ.p7p5jwjrJhXpNLSMf9L5OQ'

  request({ url: geoCodeUrl, json: true }, (error, response) => {
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
module.exports = geocode
