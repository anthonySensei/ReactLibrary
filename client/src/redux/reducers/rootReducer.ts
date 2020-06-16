import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import auth from './auth';
import book from './book';
import loading from './loadingIndicator';
import snackbar from './snackbar';
import department from './department';
import author from './author';
import genre from './genre';
import student from './student';

const rootReducer = combineReducers({
    auth,
    book,
    loading,
    snackbar,
    department,
    author,
    genre,
    student,
    form: formReducer
});

export default rootReducer;
