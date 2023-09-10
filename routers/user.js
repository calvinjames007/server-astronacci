const express = require('express');
const router = express.Router();
const {authentication} = require('../middlewares/authentication')
const userController = require('../controllers/userController');
const mainController = require('../controllers/mainController')

router.post('/register', userController.register);
router.post('/login', userController.login);

router.use(authentication)

router.get('/video', mainController.getTheVideo);

module.exports = router