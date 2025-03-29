import { ContactsCollection } from "../models/contactsModel.js";
import createError from "http-errors";

export const getAllContacts = async ({ page, perPage, sortBy, sortOrder, filter }) => {
  const totalItems = await ContactsCollection.countDocuments(filter);
  const totalPages = Math.ceil(totalItems / perPage);
  const hasPreviousPage = page > 1;
  const hasNextPage = page < totalPages;

  const contacts = await ContactsCollection.find(filter)
    .sort({ [sortBy]: sortOrder === "asc" ? 1 : -1 })
    .skip((page - 1) * perPage)
    .limit(perPage);

  return {
    data: contacts,
    page,
    perPage,
    totalItems,
    totalPages,
    hasPreviousPage,
    hasNextPage,
  };
};

export const getContactById = async (contactId) => {
  const contact = await ContactsCollection.findById(contactId);
  if (!contact) {
    throw createError(404, "Contact not found");
  }
  return contact;
};

export const createContact = async (contactData) => {
  const newContact = new ContactsCollection(contactData);
  await newContact.save();
  return newContact;
};

export const updateContactById = async (contactId, updateData) => {
  const updatedContact = await ContactsCollection.findByIdAndUpdate(contactId, updateData, { new: true });
  if (!updatedContact) {
    throw createError(404, "Contact not found");
  }
  return updatedContact;
};

export const deleteContactById = async (contactId) => {
  const deletedContact = await ContactsCollection.findByIdAndDelete(contactId);
  if (!deletedContact) {
    throw createError(404, "Contact not found");
  }
  return deletedContact;
};
