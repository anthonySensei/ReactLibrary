import { makeStyles } from '@material-ui/core/styles';
import { createStyles, Theme, withStyles } from '@material-ui/core';
import MuiAccordionSummary from '@material-ui/core/AccordionSummary';

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

export const departmentFormStyles = makeStyles({
    root: {
        textAlign: 'center'
    },
    formField: {
        display: 'block',
        width: '30%',
        margin: '0 auto',
        '& div': {
            width: '100%'
        }
    },
    btnContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        margin: '10px auto',
        width: '30%',
        '& .form-btn': {
            width: '48%'
        }
    }
});

export const managingStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            marginTop: 30
        },
        heading: {
            fontSize: theme.typography.pxToRem(15),
            flexBasis: '33.33%',
            flexShrink: 0
        },
        secondaryHeading: {
            fontSize: theme.typography.pxToRem(15),
            color: theme.palette.text.secondary
        }
    })
);

export const AccordionSummaryWithStyles = withStyles({
    root: {
        backgroundColor: 'rgba(0, 0, 0, .03)',
        borderBottom: '1px solid rgba(0, 0, 0, .125)',
        marginBottom: -1,
        minHeight: 56,
        '&$expanded': {
            minHeight: 56
        }
    },
    content: {
        '&$expanded': {
            margin: '12px 0'
        }
    }
})(MuiAccordionSummary);
