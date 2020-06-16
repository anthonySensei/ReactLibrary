import { fork } from 'redux-saga/effects';

import watchUserAuthentication from './Auth/authWatchers';
import watchBooks from './Book/bookWatchers';
import watchDepartments from './Department/departmentWatchers';
import watchAuthors from './Author/authorWatchers';
import watchGenres from './Genre/genresWatchers';
import watchStudents from './Student/studentWatchers';

export default function* startForman() {
    yield fork(watchUserAuthentication);
    yield fork(watchBooks);
    yield fork(watchDepartments);
    yield fork(watchAuthors);
    yield fork(watchGenres);
    yield fork(watchStudents);
}
