import React from 'react';
import { Dispatch } from 'redux';
import { addDepartment } from '../../redux/actions';
import { connect } from 'react-redux';

import {
    Accordion,
    AccordionDetails,
    Container,
    Typography
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import DepartmentForm from '../../components/Managing/DepartmentForm/DepartmentForm';

import Department from '../../interfaces/Department';
import ManagingPageProps from '../../interfaces/props/Managing/ManagingPageProps';

import {
    AccordionSummaryWithStyles,
    managingStyles
} from '../../constants/styles';


const Managing = (props: ManagingPageProps) => {
    const classes = managingStyles();
    const [expanded, setExpanded] = React.useState<string | false>(false);

    const handleChange = (panel: string) => (
        event: React.ChangeEvent<{}>,
        isExpanded: boolean
    ) => {
        setExpanded(isExpanded ? panel : false);
    };

    const handleDepartmentSubmit = (department: Department): void => {
        props.onAddDepartment(department);
    };

    return (
        <Container className={classes.root}>
            <Accordion
                expanded={expanded === 'panel1'}
                onChange={handleChange('panel1')}
            >
                <AccordionSummaryWithStyles
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1bh-content"
                    id="panel1bh-header"
                >
                    <Typography className={classes.heading}>
                        Departments
                    </Typography>
                    <Typography className={classes.secondaryHeading}>
                        Choose to manage departments
                    </Typography>
                </AccordionSummaryWithStyles>
                <AccordionDetails>
                    <DepartmentForm onSubmit={handleDepartmentSubmit} />
                </AccordionDetails>
            </Accordion>
        </Container>
    );
};

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        onAddDepartment: (department: Department) =>
            dispatch(addDepartment(department))
    };
};

export default connect(null, mapDispatchToProps)(Managing);
