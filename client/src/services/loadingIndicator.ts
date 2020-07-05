import { store } from '../index';

import { setLoading } from '../redux/actions';

export const setLoadingService = (isLoading: boolean) => {
    store.dispatch(setLoading(isLoading));
};
