const mysql = require('mysql2')
const { DB_CONFIG } = require('../config/secrets')

// mysql setup
const connection = mysql.createConnection(DB_CONFIG)

exports.fetchTest = async () => {
  try {
    const [rows, fields] = await connection
      .promise()
      .query('SELECT * FROM test')
    return rows[0]
  } catch (err) {
    console.log(err)
    return
  }
}
