import {
  getAllContacts,
  getContactById,
  createContact,
  updateContactById,
  deleteContactById,
} from "../services/contactsService.js";
import createError from "http-errors";

export const getContacts = async (req, res, next) => {
  try {
    const { page = 1, perPage = 10, sortBy = "name", sortOrder = "asc", isFavourite, type } = req.query;

    const paginationOptions = {
      page: Number(page),
      perPage: Number(perPage),
      sortBy,
      sortOrder,
      filter: {},
    };

    if (isFavourite !== undefined) {
      paginationOptions.filter.isFavourite = isFavourite === "true";
    }

    if (type) {
      paginationOptions.filter.contactType = type;
    }

    const contacts = await getAllContacts(paginationOptions);

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
    const contact = await getContactById(req.params.contactId);
    if (!contact) {
      throw createError(404, "Contact not found");
    }
    res.status(200).json({ status: 200, message: "Contact found", data: contact });
  } catch (error) {
    next(error);
  }
};

export const addContact = async (req, res, next) => {
  try {
    const newContact = await createContact(req.body);
    res.status(201).json({ status: 201, message: "Contact created", data: newContact });
  } catch (error) {
    next(error);
  }
};

export const updateContact = async (req, res, next) => {
  try {
    const updatedContact = await updateContactById(req.params.contactId, req.body);
    if (!updatedContact) {
      throw createError(404, "Contact not found");
    }
    res.status(200).json({ status: 200, message: "Contact updated", data: updatedContact });
  } catch (error) {
    next(error);
  }
};

export const deleteContact = async (req, res, next) => {
  try {
    const deletedContact = await deleteContactById(req.params.contactId);
    res.status(200).json({ status: 200, message: "Contact deleted", data: deletedContact });
  } catch (error) {
    next(error);
  }
};
