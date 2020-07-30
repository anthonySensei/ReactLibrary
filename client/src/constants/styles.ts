import { makeStyles } from '@material-ui/core/styles';
import { createStyles, Theme, withStyles } from '@material-ui/core';
import MuiAccordionSummary from '@material-ui/core/AccordionSummary';

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
    autocomplete: {
        width: '30%',
        margin: '10px auto'
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
    },
    w30: {
        width: '30%'
    }
});

export const managingStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            marginTop: 30,
            height: '100vh'
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

