const {Router} = require('express');
const controllers = require('../Controllers/auth');
const router = Router();
const auth = require('../Middleware/auth-middleware');

router.post('/login', controllers.login);

router.post('/register', controllers.register);

router.get('/profile', auth, controllers.getProfile);


module.exports = router;