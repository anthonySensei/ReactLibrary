import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../helper/updateObj';

const initialState = {
    department: 'all',
    departments: []
};

const reducer = (state = initialState, action: any) => {
    switch (action.type) {
        case actionTypes.SET_SELECTED_DEPARTMENT:
            return updateObject(state, {
                department: action.department
            });
        case actionTypes.GET_DEPARTMENTS_SUCCESS:
            return updateObject(state, {
                departments: action.departments
            });
        default:
            return state;
    }
};

export default reducer;
