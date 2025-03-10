const contactsService = require("../services/contactsService");

const getAllContacts = async (req, res) => {
  const contacts = await contactsService.getAllContacts();
  res.json({
    status: 200,
    message: "Successfully found contacts!",
    data: contacts,
  });
};

const getContactById = async (req, res) => {
  const contact = await contactsService.getContactById(req.params.contactId);
  if (!contact) {
    return res.status(404).json({ message: "Contact not found" });
  }
  res.json({
    status: 200,
    message: `Successfully found contact with id ${req.params.contactId}!`,
    data: contact,
  });
};

module.exports = { getAllContacts, getContactById };
