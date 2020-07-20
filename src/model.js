const mysql = require('mysql2')
const { DB_CONFIG } = require('../config/secrets')

// mysql setup
const connection = mysql.createConnection(DB_CONFIG)

exports.fetchColumn = async () => {
  const [rows, fields] = await connection
    .promise()
    .query('SELECT * FROM columns')
  return rows
}

exports.fetchCard = async () => {
  const [rows, fields] = await connection
    .promise()
    .query(
      'SELECT user.name, card.id, card.title, card.nextcard_id, card.column_id FROM tododb.user LEFT JOIN tododb.card ON card.user_id=user.id;'
    )
  console.log(rows)
  return rows
}

exports.updateColumnTitle = async (title, id) => {
  return await connection
    .promise()
    .query(`UPDATE columns SET title='${title}' WHERE id=${id}`)
}

exports.updateCardTitle = async (title, id) => {
  return await connection
    .promise()
    .query(`UPDATE card SET title='${title}' WHERE id=${id}`)
}

exports.deleteCard = async (id) => {
  return await connection.promise().query(`DELETE FROM card WHERE id=${id}`)
}

exports.createCard = async ({ cardTitle, columnId, userId }) => {
  try {
    const query = `INSERT INTO card (title, column_id, user_id) VALUES ('${cardTitle}', ${+columnId}, ${+userId})`
    const result = await connection.promise().query(query)

    return result
  } catch (err) {
    throw err
  }
}
