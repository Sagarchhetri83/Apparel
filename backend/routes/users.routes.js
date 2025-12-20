const express = require('express');
const router = express.Router();
const users = require('../data/users');
const contacts = require('../data/contacts');
const { generateId } = require('../utils/id');

// GET /users (New)
router.get('/', (req, res) => {
    const safeUsers = users.map(u => {
        const { password, ...rest } = u;
        return rest;
    });
    res.json({ success: true, data: safeUsers });
});

// POST /signup
router.post('/signup', (req, res) => {
    const { email, password, name } = req.body;

    if (users.find(u => u.email === email)) {
        return res.status(400).json({ success: false, message: 'Email already exists' });
    }

    // Auto create contact
    const newContact = {
        id: generateId(contacts),
        name,
        email,
        type: 'customer',
        ...req.body.contactDetails
    };
    contacts.push(newContact);

    const newUser = {
        id: generateId(users),
        email,
        password,
        name,
        role: 'portal',
        contact_id: newContact.id
    };
    users.push(newUser);

    res.status(201).json({ success: true, data: { user: newUser, contact: newContact } });
});

// POST /login
router.post('/login', (req, res) => {
    const { email, password } = req.body;
    const user = users.find(u => u.email === email && u.password === password);

    if (!user) {
        return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    const { password: _, ...userWithoutPass } = user;
    res.json({ success: true, data: userWithoutPass });
});

module.exports = router;
