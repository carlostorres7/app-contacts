const dbConnection = require('./db_connection');

function createEmail(email, contactId) {
  return new Promise((resolve, reject) => {
    const query = 'INSERT INTO emails (email, id_contact) VALUES (?, ?)';
    dbConnection.query(query, [email, contactId], (error, results) => {
      if (error) {
        reject(error);
        return;
      }
      resolve(results.insertId);
    });
  });
}

function getEmail(emailId) {
  return new Promise((resolve, reject) => {
    const query = 'SELECT * FROM emails WHERE id = ?';
    dbConnection.query(query, [emailId], (error, results) => {
      if (error) {
        reject(error);
        return;
      }
      resolve(results[0]);
    });
  });
}

function updateEmail(emailId, email) {
  return new Promise((resolve, reject) => {
    const query = 'UPDATE emails SET email = ? WHERE id = ?';
    dbConnection.query(query, [email, emailId], (error, results) => {
      if (error) {
        reject(error);
        return;
      }
      resolve();
    });
  });
}

function deleteEmail(emailId) {
  return new Promise((resolve, reject) => {
    const query = 'DELETE FROM emails WHERE id = ?';
    dbConnection.query(query, [emailId], (error, results) => {
      if (error) {
        reject(error);
        return;
      }
      resolve();
    });
  });
}

module.exports = { createEmail, getEmail, updateEmail, deleteEmail };
