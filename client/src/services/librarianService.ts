import axios from '../helper/axios';

import { LIBRARIANS_ALL_URL } from '../constants/serverLinks';

export const getAllLibrariansService = async () => {
    return await axios.get(LIBRARIANS_ALL_URL);
};
