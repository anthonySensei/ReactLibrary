import axios from '../helper/axios';

import { BOOKS_URL } from '../constants/serverLinks';

export const getBooksService = (filterObj: any, departmentId: string) => {
    return axios
        .get(BOOKS_URL, {
            params: {
                ...filterObj,
                departmentId
            }
        })
        .then(response => response);
};
