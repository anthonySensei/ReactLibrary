import express from 'express';
import passport from 'passport';

const router = express.Router();

import { getAllStudents } from '../controllers/student';

import { StudentUrl } from '../constants/links';

router.get(
    StudentUrl.ALL,
    passport.authenticate('jwt', { session: false }),
    getAllStudents
);

export default router;
