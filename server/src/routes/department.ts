import express from 'express';

import { getDepartments, addDepartment } from '../controllers/department';

const router = express.Router();

router.get('', getDepartments);
router.post('', addDepartment);

export default router;
