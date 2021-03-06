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
import loan from './loan';
import librarian from './librarian';

const rootReducer = combineReducers({
    auth,
    book,
    loading,
    snackbar,
    department,
    loan,
    librarian,
    author,
    genre,
    student,
    form: formReducer
});

export default rootReducer;
