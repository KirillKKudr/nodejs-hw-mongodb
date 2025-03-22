import { ContactsCollection } from '../models/contactsModel.js';

export const getAllContacts = async () => {
  return await ContactsCollection.find();
};

export const getContactById = async (contactId) => {
  return await ContactsCollection.findById(contactId);
};

export const createContact = async (contactData) => {
  return await ContactsCollection.create(contactData);
};

export const updateContactById = async (contactId, updateData) => {
  return await ContactsCollection.findByIdAndUpdate(contactId, updateData, { new: true });
};

export const deleteContactById = async (contactId) => {
  return await ContactsCollection.findByIdAndDelete(contactId);
};
