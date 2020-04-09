var express = require('express')
var router = express.Router()
var User = require('../models/User')

/* Check if API is live. */
router.get('/', (req, res) => {
  res.send('You are connected')
})

/* Login endpoint. */
router.post('/login', async (req, res) => {
  const user = await User.findOne({ username: req.body.username })
  if (bcrypt.compare(req.body.password, user.password)) {
    // Passwords match
    res.send(user)
  } else {
    // Passwords don't match
    res.send('Wrong username or password')
  }
})

/* Generate link for password recovery. */
router.post('/recover', async (req, res) => {
  // Sending email to user containing link
  // Link is used to change password but with Postman
  // Link is in form of hashed email
  const user = await User.findOne({ email: req.body.email })
  console.log(user)
  res.send('http://localhost:3000/change-password/' + user._id)
})

/* Change password endpoint. */
router.post('/change-password/:id', async (req, res) => {
  const hashedPassword = await bcrypt.hash(req.body.password, 10)
  const result = await User.findByIdAndUpdate(req.params.id, { password: hashedPassword })
  res.send(result)
})

module.exports = router
