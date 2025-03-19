import express from "express";
import { getContacts, getContact } from "../controllers/contacts.js";
import { ctrlWrapper } from "../utils/ctrlWrapper.js";

const router = express.Router();

router.get("/", ctrlWrapper(getContacts));
router.get("/:contactId", ctrlWrapper(getContact));

export default router;
