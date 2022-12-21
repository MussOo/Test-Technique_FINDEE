
const { Router } = require('express');

const auth = require('../middleware/auth');

const router = Router();

//////////////////// Authentification Controllers ////////////////////
const AuthentificationControler = require('../controllers/AuthentificationControler');


router.post('/register', AuthentificationControler.register);


router.post('/login', AuthentificationControler.login);


router.get('/users', auth,  AuthentificationControler.users);


module.exports = router;