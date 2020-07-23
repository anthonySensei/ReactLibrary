const express = require('express');
const router = express.Router();

const passport = require('passport');

const loanController = require('../controllers/loan');

router.post(
    '',
    passport.authenticate('jwt', { session: false }),
    loanController.loanBook
);

module.exports = router;
