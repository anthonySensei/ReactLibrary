import axios from '../helper/axios';

import { GENRES_URL } from '../constants/serverLinks';

export const getGenresService = () => {
    return axios.get(GENRES_URL).then(response => response);
};
