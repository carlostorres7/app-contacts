const express = require('express');
const bodyParser = require('body-parser');
const personManager = require('./person_manager');

const app = express();
app.use(bodyParser.json());

// Crear una persona
app.post('/person', (req, res) => {
  const { name } = req.body;
  personManager.createPerson(name)
    .then((personId) => {
      res.json({ id: personId, name });
    })
    .catch((error) => {
      console.error('Error creating person: ', error);
      res.status(500).json({ error: 'Internal server error' });
    });
});

// Obtener una persona por ID
app.get('/person/:id', (req, res) => {
  const { id } = req.params;
  personManager.getPerson(id)
    .then((person) => {
      if (person) {
        res.json(person);
      } else {
        res.status(404).json({ error: 'Person not found' });
      }
    })
    .catch((error) => {
      console.error('Error getting person: ', error);
      res.status(500).json({ error: 'Internal server error' });
    });
});

// Obtener todas las personas
app.get('/persons', (req, res) => {
    personManager.getAllPersons()
      .then((persons) => {
        res.json(persons);
      })
      .catch((error) => {
        console.error('Error getting all persons: ', error);
        res.status(500).json({ error: 'Internal server error' });
      });
  });
  
  

// Actualizar una persona
app.put('/person/:id', (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  personManager.updatePerson(id, name)
    .then(() => {
      res.json({ id, name });
    })
    .catch((error) => {
      console.error('Error updating person: ', error);
      res.status(500).json({ error: 'Internal server error' });
    });
});

// Eliminar una persona
app.delete('/person/:id', (req, res) => {
  const { id } = req.params;
  personManager.deletePerson(id)
    .then(() => {
      res.json({ message: 'Person deleted successfully' });
    })
    .catch((error) => {
      console.error('Error deleting person: ', error);
      res.status(500).json({ error: 'Internal server error' });
    });
});


//----------------------------------------------------------------------------------------------
// Rutas de la API para correos electrónicos
app.post('/email', (req, res) => {
  const { email, contactId } = req.body;
  emailManager.createEmail(email, contactId)
    .then((emailId) => {
      res.json({ id: emailId, email, contactId });
    })
    .catch((error) => {
      console.error('Error creating email: ', error);
      res.status(500).json({ error: 'Internal server error' });
    });
});

// Rutas de la API para números de teléfono
app.post('/phone', (req, res) => {
  const { phoneNumber, contactId } = req.body;
  phoneManager.createPhoneNumber(phoneNumber, contactId)
    .then((phoneId) => {
      res.json({ id: phoneId, phoneNumber, contactId });
    })
    .catch((error) => {
      console.error('Error creating phone number: ', error);
      res.status(500).json({ error: 'Internal server error' });
    });
});

// Configurar otros endpoints y middlewares según tus necesidades...

app.listen(3000, () => {
  console.log('API listening on port 3000');
});
