import axios from '../helper/axios';

import {DEPARTMENTS_URL} from '../constants/serverLinks';

export const getDepartmentsService = () => {
    return axios.get(DEPARTMENTS_URL).then(response => response);
};

