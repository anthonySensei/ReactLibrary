import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import auth from './auth';
import book from './book';
import loading from './loadingIndicator';
import snackbar from './snackbar';

const rootReducer = combineReducers({
    auth,
    book,
    loading,
    snackbar,
    form: formReducer
});

export default rootReducer;
