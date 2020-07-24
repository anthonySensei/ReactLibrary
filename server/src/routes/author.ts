import express from 'express';

import { getAuthors } from '../controllers/author';

const router = express.Router();

router.get('', getAuthors);

export default router;
