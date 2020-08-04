import * as actionTypes from './actionTypes';

export const getStatistic = (model: string, value: string) => {
    return {
        type: actionTypes.GET_STATISTIC,
        model,
        value
    };
};
