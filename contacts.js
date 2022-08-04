const { v4 } = require('uuid')

const fs = require('fs/promises')
const path = require('path')
const contactsPath = path.join(`${__dirname}`, 'db/contacts.json')

const listContacts = async () => {
  const data = await fs.readFile(contactsPath)
  const contacts = JSON.parse(data)
  return contacts
}

const getContactById = async (contactId) => {
  const products = await listContacts()
  const res = products.find((item) => item.id === contactId)

  return res ? res : null
}

const removeContact = async (contactId) => {
  const products = await listContacts()

  const idx = products.findIndex((item) => item.id === contactId)
  if (idx === -1) {
    return null
  }
  console.log(idx)
  const newContacts = products.splice(idx, 1)
  await fs.writeFile(contactsPath, JSON.stringify(products))
  return products
}

const addContact = async (name, email, phone) => {
  const contactsAll = await listContacts()

  const newContact = { name, email, phone, id: v4() }
  contactsAll.push(newContact)
  await fs.writeFile(contactsPath, JSON.stringify(contactsAll))

  return newContact
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
}
