import express from 'express';
import passport from 'passport';

import { orderBook } from '../controllers/order';

const router = express.Router();

router.post('', passport.authenticate('jwt', { session: false }), orderBook);

export default router;
