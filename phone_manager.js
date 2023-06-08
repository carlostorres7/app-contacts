const dbConnection = require('./db_connection');

function createPhoneNumber(phoneNumber, contactId) {
  return new Promise((resolve, reject) => {
    const query = 'INSERT INTO phones (telephone_number, id_contact) VALUES (?, ?)';
    dbConnection.query(query, [phoneNumber, contactId], (error, results) => {
      if (error) {
        reject(error);
        return;
      }
      resolve(results.insertId);
    });
  });
}

function getPhoneNumber(phoneId) {
  return new Promise((resolve, reject) => {
    const query = 'SELECT * FROM phones WHERE id = ?';
    dbConnection.query(query, [phoneId], (error, results) => {
      if (error) {
        reject(error);
        return;
      }
      resolve(results[0]);
    });
  });
}

function updatePhoneNumber(phoneId, phoneNumber) {
  return new Promise((resolve, reject) => {
    const query = 'UPDATE phones SET telephone_number = ? WHERE id = ?';
    dbConnection.query(query, [phoneNumber, phoneId], (error, results) => {
      if (error) {
        reject(error);
        return;
      }
      resolve();
    });
  });
}

function deletePhoneNumber(phoneId) {
  return new Promise((resolve, reject) => {
    const query = 'DELETE FROM phones WHERE id = ?';
    dbConnection.query(query, [phoneId], (error, results) => {
      if (error) {
        reject(error);
        return;
      }
      resolve();
    });
  });
}

module.exports = { createPhoneNumber, getPhoneNumber, updatePhoneNumber, deletePhoneNumber };
