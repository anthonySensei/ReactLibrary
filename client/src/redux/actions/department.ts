import * as actionTypes from './actionTypes';
import Department from '../../interfaces/Department';

export const setDepartment = (departmentId: string) => {
    return {
        type: actionTypes.SET_SELECTED_DEPARTMENT,
        department: departmentId
    };
};

export const getDepartments = () => {
    return {
        type: actionTypes.GET_DEPARTMENTS
    };
};

export const addDepartment = (department: Department) => {
    return {
        type: actionTypes.ADD_DEPARTMENT,
        department
    };
};
