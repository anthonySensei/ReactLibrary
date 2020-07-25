import User, { IUser } from '../models/user';
import roles from '../constants/roles';

import { cryptPassword } from './generatePassword';

export const createManager = () => {
    const manager: IUser = new User({
        email: process.env.MANAGER_EMAIL,
        password: cryptPassword(process.env.MANAGER_PASSWORD as string),
        role: roles.MANAGER,
        active: true
    });
    return manager.save();
};
