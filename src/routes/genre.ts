import express from 'express';

import { getGenres } from '../controllers/genre';

const router = express.Router();

router.get('', getGenres);

export default router;
