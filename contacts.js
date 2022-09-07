const { join } = require('path');
const path = require('path');
const fs = require('fs').promises;
const uuid = require('uuid');



const contactsPath = path.join(__dirname, 'db/contacts.json');


// TODO: задокументувати кожну функцію
async function listContacts() {
    const data = await fs.readFile(contactsPath, 'utf-8');
    const result = JSON.parse(data);
    return result;

}

async function getContactById(contactId) {
    const contactsId = await listContacts();
    const contact = contactsId.find(contact => contact.id === contactId);
    return contact ? contact : null;
}

async function removeContact(contactId) {
    const allContacts = await listContacts();
    const contactIndex = allContacts.findIndex(contact => contact.id === contactId);
    const deleteContact = allContacts[contactIndex];
    if (contactIndex !== -1) {
        allContacts.splice(contactIndex, 1);
        await fs.writeFile(contactsPath, JSON.stringify(allContacts));
    }
    return deleteContact ? deleteContact : null;
}

async function addContact(name, email, phone) {
    const newContact = {
        id: uuid.v4(),
        name,
        email,
        phone,
    };
    const contacts = await listContacts();
    contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts));
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};