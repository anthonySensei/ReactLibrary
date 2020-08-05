import { store } from '../index';

import { setOpenSnackbar } from '../redux/actions';

export const handleSnackbarOpenService = (type: string, message: string) => {
    store.dispatch(
        setOpenSnackbar({
            isOpen: true,
            type: type,
            message: message
        })
    );
};

export const handleSnackbarCloseService = () => {
    const snackbarStore = store.getState().snackbar;
    store.dispatch(
        setOpenSnackbar({
            isOpen: false,
            type: snackbarStore.snackbarType,
            message: null
        })
    );
};
