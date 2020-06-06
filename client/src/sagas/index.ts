import { fork } from 'redux-saga/effects';
import watchUserAuthentication from './Auth/authWatchers';
import watchBooks from './Book/bookWatchers';

export default function* startForman() {
    yield fork(watchUserAuthentication);
    yield fork(watchBooks);
}
