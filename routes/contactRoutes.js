const express = require('express');
const router = express.Router();
const { getContact,
    getContactByID,
    deleteContact,
    updateContact,
    createContact
} = require('../controllers/contactController');

router.route('/').get(getContact).post(createContact);
router.route('/:id').get(getContactByID).put(updateContact).delete(deleteContact);
//router.route('/').post(createContact);
//router.route('/:id').put(updateContact);
//router.route('/:id').delete(deleteContact);

module.exports = router;