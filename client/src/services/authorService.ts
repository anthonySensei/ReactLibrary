import axios from '../helper/axios';

import { AUTHORS_URL } from '../constants/serverLinks';

export const getAuthorsService = async () => {
    return await axios.get(AUTHORS_URL);
};
