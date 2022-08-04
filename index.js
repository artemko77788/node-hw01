const operations = require('./contacts')
const { Command } = require('commander')
const program = new Command()
program
  .option('-a, --action <type>', 'choose action')
  .option('-i, --id <type>', 'user id')
  .option('-n, --name <type>', 'user name')
  .option('-e, --email <type>', 'user email')
  .option('-p, --phone <type>', 'user phone')

program.parse(process.argv)

const argv = program.opts()

const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case 'list':
      const contacts = await operations.listContacts()
      console.log(contacts)
      break

    case 'get':
      const contact = await operations.getContactById(id)
      if (!contact) {
        throw new Error(`Contact with ${id} not find`)
      }
      console.log(contact)
      break

    case 'add':
      const newContacts = await operations.addContact(name, email, phone)
      console.log(newContacts)
      break

    case 'remove':
      const newArrAfterRemove = await operations.removeContact(id)
      console.log(newArrAfterRemove)
      break

    default:
      console.warn('\x1B[31m Unknown action type!')
  }
}

invokeAction(argv)
