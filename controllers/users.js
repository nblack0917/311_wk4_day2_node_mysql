const mysql = require('mysql')
const pool = require('../sql/connection')
const { handleSQLError } = require('../sql/error')



const getAllUsers = (req, res) => {
  // SELECT ALL USERS
  pool.query("SELECT * FROM users JOIN usersAddress ON users.id=usersAddress.user_id JOIN usersContact ON users.id=usersContact.user_id", (err, rows) => {
    if (err) return handleSQLError(res, err)
    return res.json(rows);
  })
}

const getUserById = (req, res) => {
  // SELECT USERS WHERE ID = <REQ PARAMS ID>
  let sql = `SELECT ?? FROM ?? WHERE ?? = ?`
  // WHAT GOES IN THE BRACKETS
  sql = mysql.format(sql, ['*', 'users', 'id', req.params.id])

  pool.query(sql, (err, rows) => {
    if (err) return handleSQLError(res, err)
    return res.json(rows);
  })
}

// Create only user info
// const createUser = (req, res) => {
//   // INSERT INTO USERS FIRST AND LAST NAME 
//   let sql = `INSERT INTO ?? (??, ??) VALUES (?, ?)`
//   // WHAT GOES IN THE BRACKETS
//   sql = mysql.format(sql, ['users', 'first_name', 'last_name', 
//       firstName, lastName])
// };

//Sample user body info
// {
//   "first_name": "I.P.",
//   "last_name": "Freely",
//   "address": "123 Moe Steet",
//   "city": "Springfelld",
//   "county": "Flaming",
//   "state": "IL",
//   "zip": "56431",
//   "phone1": "973-625-4286",
//   "phone2": "973-627-2285",
//   "email": "MoesTavern@email.com"
// }

// Create user with all info from body
const createUser = (req, res) => {
  pool.getConnection(function(err, connection) {
    if (err) throw err; // not connected!

      connection.beginTransaction(function(err) {
        if (err) { throw err; }
        connection.query('INSERT INTO ?? (??, ??) VALUES (?, ?)',
            ['users', 'first_name', 'last_name', req.body.first_name, req.body.last_name], function (error, results, fields) {
          if (error) {
            return connection.rollback(function() {
              throw error;
            });
          }
      
          connection.query('INSERT INTO ?? (??, ??, ??, ??, ??, ??) VALUES (LAST_INSERT_ID(), ?, ?, ?, ?, ?)',
              ["usersAddress", "user_id", "address", "city", "county", "state", "zip",
              req.body.address, req.body.city, req.body.county, req.body.state, req.body.zip], function (error, results, fields) {
            if (error) {
              return connection.rollback(function() {
                throw error;
              });
            }
            connection.query('INSERT INTO ?? (??, ??, ??, ??)VALUES(LAST_INSERT_ID(), ?, ?, ?)',
            ["usersContact", "user_id", "phone1", "phone2", "email",
            req.body.phone1, req.body.phone2, req.body.email], function (error, results, fields) {
              if (error) {
                return connection.rollback(function() {
                  throw error;
                });
              }
              connection.commit(function(err) {
                if (err) {
                  return connection.rollback(function() {
                    throw err;
                  });
                }
              console.log('success!');
              return res.json({ newId: results.insertId })
            });
          });
        });
      });
    })
  })
}

const updateUserById = (req, res) => {
  // UPDATE USERS AND SET FIRST AND LAST NAME WHERE ID = <REQ PARAMS ID>
  let sql = "UPDATE ?? SET ??=?, ??=? WHERE ??=?"
  // WHAT GOES IN THE BRACKETS
  sql = mysql.format(sql, ['users', 'first_name', req.body.first_name, 'last_name', req.body.last_name, 'id', req.params.id])

  pool.query(sql, (err, results) => {
    if (err) return handleSQLError(res, err)
    return res.status(204).json();
  })
}

const deleteUserByFirstName = (req, res) => {
  // DELETE FROM USERS WHERE FIRST NAME = <REQ PARAMS FIRST_NAME>
  let sql = "DELETE FROM ?? WHERE ??=?"
  // WHAT GOES IN THE BRACKETS
  sql = mysql.format(sql, ['users', 'first_name', req.params.first_name])

  pool.query(sql, (err, results) => {
    if (err) return handleSQLError(res, err)
    return res.json({ message: `Deleted ${results.affectedRows} user(s)` });
  })
}

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUserById,
  deleteUserByFirstName
}