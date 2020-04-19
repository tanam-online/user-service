var express = require('express')
var router = express.Router()
var Cryptr = require('cryptr')
var cryptr = new Cryptr(process.env.SECRET_KEY)
var bcrypt = require('bcrypt')
var User = require('../models/User')

/* 
 * Check if API is live. 
 */
router.get('/', (req, res) => {
  res.send('You are connected')
})

/* 
 * Login endpoint. 
 */
router.post('/login', async (req, res) => {
  try {
    if (!req.body.email || !req.body.password) {
      return res.status(400).send({ status: 400, message: 'No email or password provided' })
    }
    const result = await User.getByEmail(req.body.email)
    const user = (result) ? result.rows[0] : null
    if (!user) {
      return res.status(400).send({ status: 400, message: 'Wrong email' })
    }
    if (bcrypt.compare(req.body.password, user.password)) {
      const results = {
        status: 'Login success',
        data: (result) ? result.rows : null
      }
      res.send(results)
    }
    else {
      return res.status(400).send({ status: 400, message: 'Wrong password' })
    }
  } catch (err) {
    console.error(err)
    return res.status(500).send(err)
  }
})

/* 
 * Generate link for password recovery. 
 */
router.post('/recover', async (req, res) => {
  // Sending email to user containing link
  // Link is used to change password but with Postman
  // Link is in form of hashed email
  try {
    if (!req.body.email) {
      return res.status(400).send({ status: 400, message: 'No email provided' })
    }
    const result = await User.getByEmail(req.body.email)
    const user = (result) ? result.rows[0] : null
    if (!user) {
      return res.status(400).send({ status: 400, message: 'User not found' })
    }
    const id = cryptr.encrypt(user.id)
    const link = `http://tanam.online/change-password/${id}`
    const results = {
      status: 'Link generated',
      data: link
    }
    res.send(results)
  } catch (err) {
    console.error(err)
    return res.status(500).json(err)
  }
})

/* 
 * Change password endpoint. 
 */
router.post('/change-password', async (req, res) => {
  try {
    if (!req.body.id || !req.body.password) {
      return res.status(400).send({ status: 400, message: 'No id or password provided' })
    }
    const id = cryptr.decrypt(req.body.id)
    const resultUser = await User.getById(id)
    const user = (resultUser) ? resultUser.rows[0] : null
    if (!user) {
      return res.status(400).send({ status: 400, message: 'User not found' })
    }
    const hashedPassword = await bcrypt.hash(req.body.password, 10)
    const payload = [
      user.nama,
      hashedPassword,
      user.no_telepon,
      id
    ]
    const result = await User.update(payload)
    const results = {
      status: 'Change password success',
      data: (result) ? result.rows : null
    }
    res.send(results)
  } catch (err) {
    console.error(err)
    return res.status(500).send(err)
  }
})

module.exports = router
