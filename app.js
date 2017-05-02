'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const hbs = require('express-handlebars')
const app = express()
const api = require('./routes/')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Fronend - Motor de plantillas
app.engine('.hbs', hbs({
  defaultLayout: 'default',
  extname: '.hbs'
}))
app.set('view engine', '.hbs')

app.use('/api', api)
// Vistas
app.get('/login', (req, res) => {
  res.render('login')
})
app.get('/product', (req, res) => {
  res.render('product')
})

module.exports = app
