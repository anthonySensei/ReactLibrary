import * as actionTypes from './actionTypes';

export const getBooks = (filterObj: any, departmentId: string) => {
    return {
        type: actionTypes.GET_BOOKS,
        filterObj,
        departmentId
    };
};
