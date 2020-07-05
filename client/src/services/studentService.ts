import axios from '../helper/axios';

import { STUDENTS_ALL_URL } from '../constants/serverLinks';

export const getAllStudentsService = async () => {
    return await axios.get(STUDENTS_ALL_URL);
};
