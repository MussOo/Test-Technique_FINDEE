const { Router } = require("express");

const auth = require("../middleware/auth");

const router = Router();

//////////////////// Authentification Controllers ////////////////////
const AuthentificationControler = require("../controllers/AuthentificationControler");

router.post("/register", AuthentificationControler.register);

router.post("/login", AuthentificationControler.login);

router.get("/users", auth, AuthentificationControler.users);

router.get("/test", AuthentificationControler.test);

router.get("/me", AuthentificationControler.me);

router.post("/logout", auth, AuthentificationControler.logout);

module.exports = router;
