const Contact = require("../models/contactModel");

const getAllContacts = async () => {
  return await Contact.find();
};

const getContactById = async (id) => {
  return await Contact.findById(id);
};

module.exports = { getAllContacts, getContactById };
