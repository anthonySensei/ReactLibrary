const express = require('express');

const router = express.Router();

const studentController = require('../controllers/student');

const studentAllUrl = require('../constants/links').STUDENTS_ALL_URL;

const passport = require('passport');

router.get(
    studentAllUrl,
    passport.authenticate('jwt', { session: false }),
    studentController.getAllStudents
);

module.exports = router;
