import { reset } from 'redux-form';
import { store } from '../index';

export const resetFormHandler = (formName: string) => {
    store.dispatch(reset(formName));
};
