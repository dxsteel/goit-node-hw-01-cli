
// index.js
const argv = require("yargs").argv;
const operations = require('./contacts');

// TODO: рефакторить
async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const data = await operations.listContacts();
      console.table(data);
      break;

    case "get":
      const contact = await operations.getContactById(id.toString());
      console.log(contact);
      break;

    case "add":
      await operations.addContact(name, email, phone);
      break;

    case "remove":
       await operations.removeContact(id.toString());
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);