const express = require('express')
const geocode = require('./utils/geocode')
const path = require('path')
const hbs = require('hbs')
const app = express()
// console.log(path.join(__dirname, '../public'))
// console.log(__filename)
//Define path for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../template/views')
const partialsPath = path.join(__dirname, '../template/partials')
//setup handleBars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)
//setup static directory to serve
app.use(express.static(publicDirectoryPath))
app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather App',
    name: 'Sarthak Gupta'
  })
})
app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About me',
    name: 'Sarthak Gupta'
  })
})
app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help Page',
    name: 'Sarthak Gupta'
  })
})
app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: 'You must provide an address'
    })
  }
  geocode(req.query.address, (error, response) => {
    if (error) {
      return res.send({ error })
    }
    res.send({
      latitude: response.latitude,
      longitude: response.longitude,
      location: response.location
    })
  })
})
app.get('/products', (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: 'You must provide a search term'
    })
  }
  // console.log(req.query)
  res.send({
    products: []
  })
})
app.get('/about/*', (req, res) => {
  res.send('about filed not gofsjgn')
})
app.get('*', (req, res) => {
  res.render('404', {
    title: '404',
    name: 'Sarthak Gupta',
    errorMessage: 'Page not found'
  })
})
// app.get('', (req, res) => {
//   res.send([
//     {
//       name: 'Sarthak',
//       age: 24
//     },
//     {
//       name: 'Samarth',
//       age: 28
//     }
//   ])
// })
// app.get('/help', (req, res) => {
//   res.send('<h1>Weather</h1>')
// })
// app.get('/about', (req, res) => {
//   res.send('<h1>Its an about page</h1>')
// })

app.listen(3000, () => {
  console.log('Server is Up on port 3000')
})
