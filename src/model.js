const mysql = require('mysql2')
const { DB_CONFIG } = require('../config/secrets')

// mysql setup
const connection = mysql.createConnection(DB_CONFIG)

exports.fetchColumn = async () => {
  [rows, fields] = await connection.promise().query('SELECT * FROM columns')
  return rows
}

exports.fetchCard = async () => {
  [rows, fields] = await connection.promise().query('SELECT * FROM card')
  return rows
}
