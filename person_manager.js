const dbConnection = require('./db_connection');


//Crear una persona en la tabla person
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

//Traer todas las personas de la tabla person
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

//Traer una persona usando su id 
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


//Actualizar los datos de una persona usando su id 
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


//Borrar el registro completo de una persona usando su id correspondiente
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

//exportar los métodos para que sean usados en otro archivos de la API
module.exports = { createPerson, getAllPersons, getPerson, updatePerson, deletePerson };
