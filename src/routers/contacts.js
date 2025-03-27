import express from "express";
import { getContacts, getContact, addContact, updateContact, deleteContact } from "../controllers/contacts.js";
import { ctrlWrapper } from "../utils/ctrlWrapper.js";
import { validateBody } from "../middlewares/validateBody.js";
import { isValidId } from "../middlewares/isValidId.js";
import { contactSchema } from "../validations/contactValidation.js";

const router = express.Router();

router.get("/", ctrlWrapper(getContacts));
router.get("/:contactId", isValidId, ctrlWrapper(getContact));
router.post("/", validateBody(contactSchema), ctrlWrapper(addContact));
router.patch("/:contactId", isValidId, validateBody(contactSchema), ctrlWrapper(updateContact));
router.delete("/:contactId", isValidId, ctrlWrapper(deleteContact));

export default router;
