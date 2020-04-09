var express = require('express')
var bcrypt = require('bcrypt')
var router = express.Router()
var pool = require('../db/db_config')
// var User = require('../models/User')

/* GET all previously sent messages. */
router.get('/', async (req, res) => {
  try {
    const client = await pool.connect()
    const result = await client.query('SELECT * FROM pengguna;')
    const results = { data: (result) ? result.rows : null }
    res.send(results)
    client.release()
  } catch (err) {
    console.error(err)
    return res.status(500).send(err)
  }
})

/* GET user by id. */
router.get('/:id', async (req, res) => {
  try {
    if (!req.params.id) {
      return res.status(400).send({ status: 400, message: 'No id provided' })
    }
    const client = await pool.connect()
    const result = await client.query('SELECT * FROM pengguna WHERE id = $1;', [req.params.id])
    const results = { data: (result) ? result.rows : null }
    res.send(results)
    client.release()
  } catch (err) {
    console.error(err)
    return res.status(500).send(err)
  }
})

/*
* POST new user.
* @param req in JSON format
*/
router.post('/', async (req, res) => {
  try {
    if (!req.body.nama || !req.body.email || !req.body.password || !req.body.no_telepon || !req.body.role) {
      return res.status(400).send({ status: 400, message: 'One or more data is missing' })
    }
    const hashedPassword = await bcrypt.hash(req.body.password, 10)
    const payload = [
      req.body.nama,
      req.body.email,
      hashedPassword,
      req.body.no_telepon,
      req.body.role
    ]
    console.log(payload)
    const client = await pool.connect()
    const result = await client.query('INSERT INTO pengguna (nama, email, password, no_telepon, role, created_at) VALUES ($1, $2, $3, $4, $5, CURRENT_TIMESTAMP) RETURNING *;', payload)
    const results = {
      status: 'User created successfully',
      data: (result) ? result.rows : null
    }
    res.send(results)
    client.release()
  } catch (err) {
    console.error(err)
    return res.status(500).send(err)
  }
})

/*
* PUT edit user by id.
* @param req in JSON format
*/
router.put('/:id', async (req, res) => {
  try {
    if (!req.params.id) {
      return res.status(400).send({ status: 400, message: 'No id provided' })
    }
    const hashedPassword = await bcrypt.hash(req.body.password, 10)
    const payload = [
      req.body.nama,
      hashedPassword,
      req.body.no_telepon,
      req.params.id
    ]
    const client = await pool.connect()
    const result = await client.query('UPDATE pengguna SET nama = $1, password = $2, no_telepon = $3 WHERE id = $4 RETURNING *;', payload)
    const results = {
      status: 'User updated successfully',
      data: (result) ? result.rows : null
    }
    res.send(results)
    client.release()
  } catch (err) {
    console.error(err)
    return res.status(500).send(err)
  }
})

/* DELETE user by id. */
router.delete('/:id', async (req, res) => {
  try {
    if (!req.params.id) {
      return res.status(400).send({ status: 400, message: 'No id provided' })
    }
    const client = await pool.connect()
    const result = await client.query('DELETE FROM pengguna WHERE id = $1 RETURNING *;', [req.params.id])
    const results = { data: (result) ? result.rows : null }
    res.send(results)
    client.release()
  } catch (err) {
    console.error(err)
    return res.status(500).send(err)
  }
})

module.exports = router
