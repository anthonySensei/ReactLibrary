import React, { useEffect } from 'react';
import { Dispatch } from 'redux';
import {
    addAuthor,
    addDepartment,
    deleteAuthor,
    getAuthors,
    updateAuthor
} from '../../redux/actions';
import { connect } from 'react-redux';

import {
    Accordion,
    AccordionActions,
    AccordionDetails,
    Container,
    Divider,
    FormControlLabel,
    Switch,
    Typography
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import DepartmentForm from '../../components/Managing/DepartmentForm/DepartmentForm';
import AuthorForm from '../../components/Managing/AuthorForm/AuthorForm';

import Department from '../../interfaces/Department';
import ManagingPageProps from '../../interfaces/props/Managing/ManagingPageProps';
import Author from '../../interfaces/Author';

import {
    AccordionSummaryWithStyles,
    managingStyles
} from '../../constants/styles';
import openSocket from 'socket.io-client';
import { SERVER_URL } from '../../constants/serverLinks';

const Managing = (props: ManagingPageProps) => {
    const classes = managingStyles();
    const { authors } = props;
    const { onAddAuthor, onDeleteAuthor, onGetAuthors, onUpdateAuthor } = props;
    const { onAddDepartment } = props;

    const [expanded, setExpanded] = React.useState<string | false>(false);
    const [isManaging, setIsManaging] = React.useState(false);

    const handleSwitchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setIsManaging(event.target.checked);
    };

    const handleAccordionChange = (panel: string) => (
        event: React.ChangeEvent<{}>,
        isExpanded: boolean
    ) => {
        setIsManaging(false);
        setExpanded(isExpanded ? panel : false);
    };

    const handleDepartmentSubmit = (department: Department): void => {
        onAddDepartment(department);
    };

    const handleAuthorSubmit = (author: Author): void => {
        if (author._id) {
            onUpdateAuthor(author);
        } else {
            onAddAuthor(author);
        }
    };

    useEffect(() => {
        onGetAuthors();
    }, [authors]);

    useEffect(() => {
        const socket = openSocket(SERVER_URL);
        socket.on('authors', (data: any) => {
            onGetAuthors();
        });
    }, []);

    return (
        <Container className={classes.root}>
            <Accordion
                expanded={expanded === 'department'}
                onChange={handleAccordionChange('department')}
            >
                <AccordionSummaryWithStyles expandIcon={<ExpandMoreIcon />}>
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
            <Accordion
                expanded={expanded === 'author'}
                onChange={handleAccordionChange('author')}
            >
                <AccordionSummaryWithStyles expandIcon={<ExpandMoreIcon />}>
                    <Typography className={classes.heading}>Authors</Typography>
                    <Typography className={classes.secondaryHeading}>
                        Choose to manage authors
                    </Typography>
                </AccordionSummaryWithStyles>
                <AccordionDetails>
                    <AuthorForm
                        onSubmit={handleAuthorSubmit}
                        authors={authors}
                        isManaging={isManaging}
                        onDelete={onDeleteAuthor}
                    />
                </AccordionDetails>
                <Divider />
                <AccordionActions>
                    <FormControlLabel
                        control={
                            <Switch
                                checked={isManaging}
                                onChange={handleSwitchChange}
                            />
                        }
                        label={isManaging ? 'Managing' : 'Adding'}
                    />
                </AccordionActions>
            </Accordion>
        </Container>
    );
};

const mapStateToProps = (state: any) => ({
    authors: state.author.authors
});

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        onAddDepartment: (department: Department) =>
            dispatch(addDepartment(department)),
        onAddAuthor: (author: Author) => dispatch(addAuthor(author)),
        onGetAuthors: () => dispatch(getAuthors()),
        onUpdateAuthor: (author: Author) => dispatch(updateAuthor(author)),
        onDeleteAuthor: (authorId: string) => dispatch(deleteAuthor(authorId))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Managing);
