const dbConnection = require('./db_connection');

function createPerson(name) {
  return new Promise((resolve, reject) => {
    const query = 'INSERT INTO person (name) VALUES (?)';
    dbConnection.query(query, [name], (error, results) => {
      if (error) {
        reject(error);
        return;
      }
      resolve(results.insertId);
    });
  });
}

function getAllPersons() {
  return new Promise((resolve, reject) => {
    const query = 'SELECT * FROM person';
    dbConnection.query(query, (error, results) => {
      if (error) {
        reject(error);
        return;
      }
      resolve(results);
    });
  });
}

function getPerson(personId) {
  return new Promise((resolve, reject) => {
    const query = 'SELECT * FROM person WHERE id = ?';
    dbConnection.query(query, [personId], (error, results) => {
      if (error) {
        reject(error);
        return;
      }
      resolve(results[0]);
    });
  });
}

function updatePerson(personId, name) {
  return new Promise((resolve, reject) => {
    const query = 'UPDATE person SET name = ? WHERE id = ?';
    dbConnection.query(query, [name, personId], (error, results) => {
      if (error) {
        reject(error);
        return;
      }
      resolve();
    });
  });
}

function deletePerson(personId) {
  return new Promise((resolve, reject) => {
    const query = 'DELETE FROM person WHERE id = ?';
    dbConnection.query(query, [personId], (error, results) => {
      if (error) {
        reject(error);
        return;
      }
      resolve();
    });
  });
}

module.exports = { createPerson, getAllPersons, getPerson, updatePerson, deletePerson };
