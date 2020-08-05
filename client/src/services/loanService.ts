import axios from '../helper/axios';

import { LOANS_STATISTIC_URL } from '../constants/serverLinks';

export const getStatisticService = async (model: string, value: string) => {
    return await axios.get(LOANS_STATISTIC_URL, { params: { model, value } });
};
