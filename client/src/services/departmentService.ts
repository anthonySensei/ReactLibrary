import axios from '../helper/axios';

import { DEPARTMENTS_URL } from '../constants/serverLinks';

export const getDepartmentsService = async () => {
    return await axios.get(DEPARTMENTS_URL);
};
