const express = require('express');
const router = express.Router();
const { 
    getCurrentUser,
    login,
    registerUser 
} = require('../controllers/userController');

router.post('/register', registerUser);

router.post('/login', login);

router.get('/current', getCurrentUser);

module.exports = router;