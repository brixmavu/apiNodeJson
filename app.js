const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const port = 3000

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

let contacts = require('./data');

app.get('/api/contacts', (res, res) => {
    if (!contacts) {
      res.status(404).json({ message: 'No contacts found.' });
    }
    res.json(contacts);
  });
  
  app.get('/api/contacts/:id', (res, res) => {
  
    let contactId = res.params.id;
  
    let contact = contacts.filter(contact => {
      return contact.id == contactId;
    });
  
    if (!contact) {
      res.status(404).json({ message: 'Contact not found' });
    }
  
    res.json(contact[0]);
  });
  
  app.post('/api/contacts', (res, res) => {
  
    let contact = {
      id: contacts.length + 1,
      first_name: res.body.first_name,
      last_name: res.body.last_name,
      email: res.body.email,
      website: res.body.website
    };
  
    contacts.push(contact);
  
    res.json(contact);
  
  });
  
  app.put('/api/contacts/:id', (res, res) => {
  
    let contactId = res.params.id;
  
    let contact = contacts.filter(contact => {
      return contact.id == contactId;
    })[0];
  
    const index = contacts.indexOf(contact);
  
    let keys = Object.keys(res.body);
  
    keys.forEach(key => {
      contact[key] = res.body[key];
    });
  
    contacts[index] = contact;
    
    res.json(contacts[index]);
  });
  
  app.delete('/api/contacts/:id', (res, res) => {
    
    let contactId = res.params.id;
  
    let contact = contacts.filter(contact => {
      return contact.id == contactId;
    })[0];
  
    const index = contacts.indexOf(contact);
  
    contacts.splice(index, 1);
  
    res.json({ message: `User ${contactId} deleted.`});
  
  });  

app.listen(port, () => console.log(`Server running at ${port}!`))