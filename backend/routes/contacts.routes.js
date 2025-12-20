const express = require('express');
const router = express.Router();
const contacts = require('../data/contacts');
const { generateId } = require('../utils/id');

// GET /contacts
router.get('/', (req, res) => {
    res.json({ success: true, data: contacts });
});

// POST /contacts
router.post('/', (req, res) => {
    const newContact = {
        id: generateId(contacts),
        ...req.body
    };
    contacts.push(newContact);
    res.status(201).json({ success: true, data: newContact });
});

module.exports = router;
