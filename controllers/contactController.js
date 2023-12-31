/**
 * @description This controller is meant to contain
 * request connection to the database
 * and all the relatived logic.
 */
const asynchHandler = require('express-async-handler');// handles async errors
const Contact = require('../models/contactModel');

/**
 * @description Get all contacts
 * @route GET /api/contacts
 * @param {*} req 
 * @param {*} res 
 */
const getContact = asynchHandler(async (req, res) => {
    const contact = await Contact.find();
    res.status(200).json(contact);
    /*res.status(200).json([{
        id: "1", address: 'Dilshad Garden',
        types: [],
        user_history: false,
        precise: false,
        main_text: 'Dilshad Garden',
        secondary_text: 'Delhi, India'
    }]);*/
});

/**
 * @description Get a contact by ID
 * @route GET /api/contacts/:id
 * @param {*} req 
 * @param {*} res 
 */
const getContactByID = asynchHandler(async (req, res) => {
    console.log("ID: ", req.params.id);
    const contact = await Contact.findById(req.params.id);
    console.log(contact);
    // TODO: response net getting in case of wrong ID.
    if(!contact){
        res.status(404);
        throw new Error("Contact not found. Please check the ID.")
    }
    res.status(200).json(contact);
});

/**
 * @description Delete a contact
 * @route DELETE /api/contacts/:id
 * @param {*} req 
 * @param {*} res 
 */
const deleteContact = asynchHandler(async (req, res) => {
    console.log("Delete: ", req.params.id);
    const contact = await Contact.findById(req.params.id);
    console.log("contact: ", contact);
    if(!contact)
    {
        res.status(404);
        throw new Error("Contact Not found");
    }
    await Contact.deleteOne({_id:req.params.id}, (err,foundcontact)=>{
        if(!err) console.log(foundcontact);
    });
    res.status(200).json(contact);
});

/**
 * @description Update a contact
 * @route PUT /api/contacts/:id
 * @param {*} req 
 * @param {*} res 
 */
const updateContact = asynchHandler(async (req, res) => {
    const contact = Contact.findById(req.params.id);
    if(!contact) {
        res.status(404);
        throw new Error("No contact found");
    }
    const updatedContact = await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new:true}
    )
    res.status(200).json(updatedContact);
});

/**
 * @description Create a contact
 * @route POST /api/contacts
 * @param {*} req 
 * @param {*} res 
 */
const createContact = asynchHandler(async (req, res) => {
    // body cannot be access if 'express.json()' parser is not used.
    // Plesae check server.js
    const {name,email,phone} = req.body;

    if(!name || !email || !phone) {
        res.status(400);
        throw new Error("Name, email and phone is mandatory!");
    }
    const contact = await Contact.create({
        name,
        email,
        phone
    })
    res.status(201).json(contact);
});

module.exports = {
    getContact,
    getContactByID,
    deleteContact,
    updateContact,
    createContact
}