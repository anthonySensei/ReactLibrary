import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../helper/updateObj';

const initialState = {
    students: []
};

const reducer = (state = initialState, action: any) => {
    switch (action.type) {
        case actionTypes.GET_ALL_STUDENTS_SUCCESS:
            return updateObject(state, {
                students: action.students
            });
        default:
            return state;
    }
};

export default reducer;
