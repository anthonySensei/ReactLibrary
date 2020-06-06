import axios from '../helper/axios';

import { BOOKS_URL } from '../constants/serverLinks';

export const getBooksService = () => {
    return axios.get(BOOKS_URL).then(response => response);
};

