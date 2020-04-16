var pool = require('../db/config')

exports.getAll = async () => {
  const client = await pool.connect()
  const result = await client.query('SELECT * FROM pengguna;')
  client.release()
  return result
}

exports.getOne = async (id) => {
  const client = await pool.connect()
  const result = await client.query('SELECT * FROM pengguna WHERE id = $1;', [id])
  client.release()
  return result
}

exports.create = async (payload) => {
  const client = await pool.connect()
  const result = await client.query(`INSERT INTO pengguna (nama, email, password, no_telepon, role, created_at) 
                                     VALUES ($1, $2, $3, $4, $5, CURRENT_TIMESTAMP) RETURNING *;`, payload)
  client.release()
  return result
}

exports.update = async (payload) => {
  const client = await pool.connect()
  const result = await client.query(`UPDATE pengguna SET nama = $1, password = $2, 
                                     no_telepon = $3 WHERE id = $4 RETURNING *;`, payload)
  client.release()
  return result
}

exports.delete = async (id) => {
  const client = await pool.connect()
  const result = await client.query('DELETE FROM pengguna WHERE id = $1 RETURNING *;', [id])
  client.release()
  return result
}
