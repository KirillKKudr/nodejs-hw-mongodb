import { ContactsCollection } from '../models/contactsModel.js';

export const getAllContacts = async () => {
  const contacts = await ContactsCollection.find();
  
  return contacts;
};

export const getContactById = async (contactId) => {
  const contact = await ContactsCollection.findById(contactId);
  return contact;
};
