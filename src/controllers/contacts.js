import { getAllContacts, getContactById, createContact, updateContactById, deleteContactById } from "../services/contactsService.js";
import createError from "http-errors";

export const getContacts = async (req, res, next) => {
  try {
    const contacts = await getAllContacts();
    res.status(200).json({
      status: 200,
      message: "Successfully found contacts!",
      data: contacts,
    });
  } catch (error) {
    next(error);
  }
};

export const getContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await getContactById(contactId);

    if (!contact) {
      throw createError(404, "Contact not found");
    }

    res.status(200).json({
      status: 200,
      message: `Successfully found contact with id ${contactId}!`,
      data: contact,
    });
  } catch (error) {
    next(error);
  }
};

export const addContact = async (req, res, next) => {
  try {
    const newContact = await createContact(req.body);
    res.status(201).json({
      status: 201,
      message: "Contact created successfully!",
      data: newContact,
    });
  } catch (error) {
    next(error);
  }
};

export const updateContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const updatedContact = await updateContactById(contactId, req.body);

    if (!updatedContact) {
      throw createError(404, "Contact not found");
    }

    res.status(200).json({
      status: 200,
      message: "Contact updated successfully!",
      data: updatedContact,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const deletedContact = await deleteContactById(contactId);

    if (!deletedContact) {
      throw createError(404, "Contact not found");
    }

    res.status(200).json({
      status: 200,
      message: "Contact deleted successfully!",
    });
  } catch (error) {
    next(error);
  }
};

