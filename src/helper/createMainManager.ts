import User, { IUser } from '../models/user';
import roles from '../constants/roles';

import Department, { IDepartment } from '../models/department';

export const createMainManager = async () => {
    const manager: IUser | null = await User.findOne({
        email: process.env.MANAGER_EMAIL
    });
    if (!manager) {
        const newManager: IUser = new User({
            email: process.env.MANAGER_EMAIL,
            password: process.env.MANAGER_PASSWORD,
            role: roles.MANAGER,
            active: true
        });
        await newManager.save();
    }
};

export const createMainDepartment = async () => {
    const departmentName = 'Main';
    const departmentAddress = 'Centre Street';
    const department: IDepartment | null = await Department.findOne({
        name: departmentName
    });
    if (!department) {
        const mainDepartment = new Department({
            name: departmentName,
            address: departmentAddress
        });
        await mainDepartment.save();
    }
};
