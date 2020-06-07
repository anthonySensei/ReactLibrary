import * as actionTypes from './actionTypes';

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
