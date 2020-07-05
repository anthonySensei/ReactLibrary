import { makeStyles } from '@material-ui/core/styles';

export const homePageStyles = makeStyles({
    pageTitle: {
        textAlign: 'center',
        marginTop: '5%',
        marginBottom: '0.5%'
    },
    booksContainer: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        padding: '50px 20px'
    },
    paginationContainer: {
        display: 'flex',
        justifyContent: 'center',
        margin: '10px 0',
        padding: '10px 0'
    },
    formControl: {
        minWidth: 170,
        textAlign: 'left'
    }
});

export const bookListStyles = makeStyles({
    bookCard: {
        flex: '20%',
        maxWidth: '25%',
        margin: '10px'
    },
    image: {
        height: 0,
        paddingTop: '120%'
    },
    title: {
        textAlign: 'center',
        margin: '0 0 10px'
    },
    info: {
        fontSize: 16,
        margin: '5px 0'
    },
    button: {
        width: '100%'
    }
});

export const filterFormStyles = makeStyles({
    formControl: {
        minWidth: '100%',
        textAlign: 'left',
        margin: '10px auto'
    },
    closeBtnPanel: {
        backgroundColor: '#2196F3',
        textAlign: 'right',
        width: 250
    },
    closeBtn: {
        color: '#fff'
    },
    capitalize: {
        textTransform: 'capitalize'
    },
    uppercase: {
        textTransform: 'uppercase'
    },
    container: {
        maxWidth: 250
    }
});

export const bookDetailsStyles = makeStyles({
    container: {
        display: 'flex',
        justifyContent: 'center',
        padding: '50px 0'
    }
});

export const bookDetailsCardStyles = makeStyles({
    bookCard: {
        maxWidth: '30%'
    },
    location: {
        marginTop: 20
    }
});

export const dialogStyles = makeStyles({
    input: {
        width: '92%',
        margin: '5px auto'
    }
});
