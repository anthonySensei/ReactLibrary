import express from 'express';
import passport from 'passport';

import { loanBook } from '../controllers/loan';

const router = express.Router();

router.post('', passport.authenticate('jwt', { session: false }), loanBook);

export default router;
