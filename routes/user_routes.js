const express = require('express')
const router = express.Router()
const controller = require('../controllers/user_controller');
const middleware = require('../middlewares/user_middleware');

router.post('/create-user', middleware.checkForEmail, middleware.validate ,middleware.encrypt ,controller.createUser);
router.post('/login', controller.authUser)


module.exports = router;