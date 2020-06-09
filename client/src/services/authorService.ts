import axios from '../helper/axios';

import { AUTHORS_URL } from '../constants/serverLinks';

export const getAuthorsService = () => {
    return axios.get(AUTHORS_URL).then(response => response);
};
