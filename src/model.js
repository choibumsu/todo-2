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
      'SELECT user.name, card.id, card.title, card.next_card_id, card.column_id FROM tododb.user LEFT JOIN tododb.card ON card.user_id=user.id;'
    )

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

exports.createCard = async ({ cardTitle, columnId, userId, nextCardId }) => {
  try {
    const query = `INSERT INTO card (title, column_id, user_id, next_card_id) VALUES (?, ?, ?, ?)`
    const result = await connection
      .promise()
      .query(query, [cardTitle, columnId, userId, nextCardId])

    return result
  } catch (err) {
    throw err
  }
}

exports.moveCard = async ({ cardId, columnId, userId }) => {
  try {
    const query = `UPDATE card SET column_id=${+columnId} WHERE id=${+cardId}`
    await connection.promise().query(query)

    return
  } catch (err) {
    throw err
  }
}

exports.updateNextCardId = async ({ cardId, nextCardId, userId }) => {
  try {
    console.log(cardId, nextCardId)
    const query = `UPDATE card SET next_card_id=${+nextCardId} WHERE id=${+cardId}`
    await connection.promise().query(query)

    return
  } catch (err) {
    throw err
  }
}
