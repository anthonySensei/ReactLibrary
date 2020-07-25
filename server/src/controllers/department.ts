import { Request, Response } from 'express';

import Department, { IDepartment } from '../models/department';

import { responseErrorHandle } from '../helper/responseHandle';

import errorMessages from '../constants/errorMessages';
import successMessages from '../constants/successMessages';

import socket from '../config/socket';

export const getDepartments = async (req: Request, res: Response) => {
    try {
        res.send({
            departments: await Department.find(),
            message: successMessages.SUCCESSFULLY_FETCHED
        });
    } catch (err) {
        responseErrorHandle(res, 500, errorMessages.CANNOT_FETCH);
    }
};

export const addDepartment = async (req: Request, res: Response) => {
    const department: IDepartment = req.body.department;
    try {
        const isNotUnique = !!(await Department.findOne({
            name: department.name
        }));
        if (isNotUnique)
            return responseErrorHandle(
                res,
                400,
                errorMessages.DEPARTMENT_EXIST
            );
        await Department.create(department);
        socket.getIO().emit('departments', {
            action: 'create'
        });
        res.send({
            message: successMessages.DEPARTMENT_SUCCESSFULLY_CREATED
        });
    } catch (err) {
        responseErrorHandle(res, 500, errorMessages.SOMETHING_WENT_WRONG);
    }
};
