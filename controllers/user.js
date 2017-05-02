'use strict'

const User = require('../models/user')
const service = require('../services')

function signUp (req, res) {
  const user = new User({
    email: req.body.email,
    displayName: req.body.displayName,
    password: req.body.password
  })

  user.save((err) => {
    if (err) res.status(500).send({ mesagge: `Error al crear el usuario: ${err}` })

    return res.status(201).send({ token: service.createToken(user) })
  })
}

function signIn (req, res) {
  User.find({ email: req.body.email }, (err, user) => {
    if (err) return res.status(500).send({ mesagge: err })
    if (!user) return res.status(404).send({ mensagge: 'No existe el usuario' })

    req.user = user
    res.status(200).send({
      mensagge: 'Te has logeado correctamente',
      token: service.createToken(user)
    })
  })
}

module.exports = {
  signUp,
  signIn
}
