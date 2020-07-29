import express from 'express';

import {
    postCreateUser,
    postCheckActivationToken,
    postLoginUser,
    getLogout,
    checkStudentRegistration
} from '../controllers/auth';

import { AuthUrls } from '../constants/links';

const router = express.Router();

router.post(AuthUrls.REGISTRATION, postCreateUser);

router.post(AuthUrls.CHECK_ACTIVATION_TOKEN, postCheckActivationToken);

router.post(AuthUrls.LOGIN, postLoginUser);

router.get(AuthUrls.LOGOUT, getLogout);

router.post(AuthUrls.CHECK_UNIQUENESS, checkStudentRegistration);

export default router;
