import axios from '../helper/axios';

import { GENRES_URL } from '../constants/serverLinks';

export const getGenresService = async () => {
    return await axios.get(GENRES_URL);
};
