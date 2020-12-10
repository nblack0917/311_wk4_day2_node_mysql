const mysql = require('mysql')
// const connect = require('connect');
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

// Create only user
const createUser = (req, res) => {
  // INSERT INTO USERS FIRST AND LAST NAME 
  let sql = `INSERT INTO ?? (??, ??) VALUES (?, ?)`
  // WHAT GOES IN THE BRACKETS
  sql = mysql.format(sql, ['users', 'first_name', 'last_name', 
      firstName, lastName])
};


// Create user and all tables
// const createUser = (req, res) => {
  // let firstName = req.body.first_name;
  // let lastName = req.body.last_name;
  // // let userId = LAST_INSERT_ID();
  // let userAddress = req.body.address;
  // let userCity = req.body.city;
  // let userCounty = req.body.county;
  // let userState = req.body.state;
  // let userZip = req.body.zip;
  // let userPhone1 = req.body.phone1;
  // let userPhone2 = req.body.phone2;
  // let userEmail = req.body.email;

//   let sql = `START TRANSACTION; INSERT INTO ?? (??, ??) VALUES (?, ?); INSERT INTO ?? (??, ??, ??, ??, ??, ??) VALUES (LAST_INSERT_ID(), ?, ?, ?, ?, ?); INSERT INTO ?? (??, ??, ??, ??)VALUES(LAST_INSERT_ID(), ?, ?, ?); COMMIT;`
//   // WHAT GOES IN THE BRACKETS
//   sql = mysql.format(sql, ['users', 'first_name', 'last_name', firstName, lastName,
//     "usersAddress", "user_id", "address", "city", "county", "state", "zip",
//       userAddress, userCity, userCounty, userState, userZip,
//       "usersContact", "user_id", "phone1", "phone2", "email",
//         userPhone1, userPhone2, userEmail])

//   pool.query(sql, (err, results) => {
//     if (err) return handleSQLError(res, err)
//     return res.json({ newId: results.insertId });
//   })
// }

// const createUser = (req, res) => {
//   let firstName = req.body.first_name;
//   let lastName = req.body.last_name;
//   // let userId = LAST_INSERT_ID();
//   let userAddress = req.body.address;
//   let userCity = req.body.city;
//   let userCounty = req.body.county;
//   let userState = req.body.state;
//   let userZip = req.body.zip;
//   let userPhone1 = req.body.phone1;
//   let userPhone2 = req.body.phone2;
//   let userEmail = req.body.email;
//   // INSERT INTO USERS FIRST AND LAST NAME 
//   let sql = `INSERT INTO ?? (??, ??) VALUES (?, ?)`
//   // WHAT GOES IN THE BRACKETS
//   sql = mysql.format(sql, ['users', 'first_name', 'last_name', 
//       firstName, lastName])
//   let sqlAddress = `INSERT INTO ?? (??, ??, ??, ??, ??, ??) VALUES (LAST_INSERT_ID(), ?, ?, ?, ?, ?)`
//   // WHAT GOES IN THE BRACKETS
//   sqlAddress = mysql.format(sql, ["usersAddress", "user_id", "address", "city", "county", "state", "zip",
//         userAddress, userCity, userCounty, userState, userZip])
//   let sqlContact = `INSERT INTO ?? (??, ??, ??, ??)VALUES(LAST_INSERT_ID(), ?, ?, ?)`
//   // WHAT GOES IN THE BRACKETS
//   sqlContact = mysql.format(sql, ["usersContact", "user_id", "phone1", "phone2", "email",
//           userPhone1, userPhone2, userEmail])

//   pool.query(sql, (err, results) => {
//     if (err) return handleSQLError(res, err)
//     // return res.json({ newId: results.insertId });
//     next();
//   })
//   pool.query(sqlAddress, (err, results) => {
//     if (err) return handleSQLError(res, err)
//     // return res.json({ newId: results.insertId });
//     next();
//   })
//   pool.query(sqlContact, (err, results) => {
//     if (err) return handleSQLError(res, err)
//     return res.json({ newId: results.insertId });
//   })
// }

//Attempt to use NPM Connect = no good
// const createUser = (req, res, next) => {
//   let firstName = req.body.first_name;
//   let lastName = req.body.last_name;
//   // let userId = LAST_INSERT_ID();
//   let userAddress = req.body.address;
//   let userCity = req.body.city;
//   let userCounty = req.body.county;
//   let userState = req.body.state;
//   let userZip = req.body.zip;
//   let userPhone1 = req.body.phone1;
//   let userPhone2 = req.body.phone2;
//   let userEmail = req.body.email;
//   // INSERT INTO USERS FIRST AND LAST NAME 
//   let sql = `INSERT INTO ?? (??, ??) VALUES (?, ?)`
//   // WHAT GOES IN THE BRACKETS
//   sql = mysql.format(sql, ['users', 'first_name', 'last_name', 
//       firstName, lastName])
//   let sqlAddress = `INSERT INTO ?? (??, ??, ??, ??, ??, ??) VALUES (LAST_INSERT_ID(), ?, ?, ?, ?, ?)`
//   // WHAT GOES IN THE BRACKETS
//   sqlAddress = mysql.format(sql, ["usersAddress", "user_id", "address", "city", "county", "state", "zip",
//         userAddress, userCity, userCounty, userState, userZip])
//   let sqlContact = `INSERT INTO ?? (??, ??, ??, ??)VALUES(LAST_INSERT_ID(), ?, ?, ?)`
//   // WHAT GOES IN THE BRACKETS
//   sqlContact = mysql.format(sql, ["usersContact", "user_id", "phone1", "phone2", "email",
//           userPhone1, userPhone2, userEmail])

//   pool.query(sql, (err, results) => {
//     if (err) return handleSQLError(res, err)
//     // return res.json({ newId: results.insertId });
//     next();
//   })
//   pool.query(sqlAddress, (err, results) => {
//     if (err) return handleSQLError(res, err)
//     // return res.json({ newId: results.insertId });
//     next();
//   })
//   pool.query(sqlContact, (err, results) => {
//     if (err) return handleSQLError(res, err)
//     return res.json({ newId: results.insertId });
//   })
// }

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