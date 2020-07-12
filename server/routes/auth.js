const express = require('express');

const router = express.Router();

const authController = require('../controllers/auth');

const links = require('../constants/links');

const registrationUrl = links.AUTH_REGISTRATION_URL;
const registrationCheckUrl = links.AUTH_REGISTRATION_CHECK_URL;
const loginUrl = links.AUTH_LOGIN_URL;
const logoutUrl = links.AUTH_LOGOUT_URL;
const checkRegistrationTokenUrl = links.AUTH_CHECK_ACTIVATION_TOKEN_URL;

router.post(registrationUrl, authController.postCreateUser);

router.post(checkRegistrationTokenUrl, authController.postCheckActivationToken);

router.post(loginUrl, authController.postLoginUser);

router.get(logoutUrl, authController.getLogout);

router.post(registrationCheckUrl, authController.checkStudentRegistration);

module.exports = router;
