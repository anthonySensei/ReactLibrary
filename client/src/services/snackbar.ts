import { store } from '../index';

import { setOpenSnackbar } from '../redux/actions';

export const handleSnackbarOpenService = (isOpen: boolean, type: string, message: string) => {
    store.dispatch(
        setOpenSnackbar({
            isOpen: isOpen,
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
