import axios from '../helper/axios';

import { DEPARTMENTS_URL } from '../constants/serverLinks';
import Department from '../interfaces/Department';

export const getDepartmentsService = async () => {
    return await axios.get(DEPARTMENTS_URL);
};

export const addDepartmentService = async (department: Department) => {
    return await axios.post(DEPARTMENTS_URL, { department });
};
