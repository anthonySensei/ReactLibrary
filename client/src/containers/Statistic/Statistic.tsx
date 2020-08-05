import React, { ChangeEvent, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import {
    getAllBooks,
    getAllLibrarians,
    getAllStudents,
    getDepartments,
    getStatistic
} from '../../redux/actions';

import {
    Accordion,
    AccordionDetails,
    Button,
    Container,
    Divider,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    Typography
} from '@material-ui/core';
import Card from '@material-ui/core/Card';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Autocomplete } from '@material-ui/lab';

import {
    CartesianGrid,
    Legend,
    Line,
    LineChart,
    Tooltip,
    XAxis,
    YAxis
} from 'recharts';

import Book from '../../interfaces/Book';
import Department from '../../interfaces/Department';
import Student from '../../interfaces/Student';
import Librarian from '../../interfaces/Librarian';

import { AccordionSummaryWithStyles } from '../../constants/styles';
import { ChartModels } from '../../constants/ChartModels';
import { UserRoles } from '../../constants/UserRoles';

import StatisticProps from './StatisticProps';
import './Statistic.scss';

const Statistic = (props: StatisticProps) => {
    const shortId = require('shortid');

    const { onGetAllBooks, onGetDepartments, onGetStudents } = props;
    const { onGetLibrarians, onGetStatistic, statistic } = props;
    const { students, librarians, books, departments, userRole } = props;

    const [model, setModel] = useState('');
    const [value, setValue] = useState('');

    let autocompleteLabel: any = () => '';
    let autocompletePlaceholder = 'Model';

    useEffect(() => {
        onGetAllBooks();
        if (
            userRole === UserRoles.MANAGER ||
            userRole === UserRoles.LIBRARIAN
        ) {
            onGetStudents();
        }
        if (userRole === UserRoles.MANAGER) {
            onGetDepartments();
            onGetLibrarians();
        }
    }, []);

    const handleModelChange = (
        event: React.ChangeEvent<{ value: unknown }>
    ) => {
        setModel(event.target.value as string);
    };

    const getAutocompleteData = (): any => {
        if (!model) return [];
        if (model === ChartModels.Book) {
            autocompleteLabel = (book: Book) =>
                `${book?.title}(${book?.author?.name})`;
            autocompletePlaceholder = 'Book';
            return books || [];
        } else if (model === ChartModels.Department) {
            autocompleteLabel = (department: Department) =>
                `${department?.name}(${department?.address})`;
            autocompletePlaceholder = 'Department';
            return departments || [];
        } else if (model === ChartModels.Librarian) {
            autocompleteLabel = (librarian: Librarian) =>
                `${librarian?.name}(${librarian?.passportId})`;
            autocompletePlaceholder = 'Librarian';
            return librarians || [];
        } else if (model === ChartModels.Student) {
            autocompleteLabel = (student: Student) =>
                `${student?.name}(${student?.studentId})`;
            autocompletePlaceholder = 'Student';
            return students || [];
        }
    };

    const getModels = () => {
        return Object.values(ChartModels).filter(value => {
            if (!userRole || userRole === UserRoles.STUDENT)
                return value === ChartModels.Book;
            else if (userRole === UserRoles.LIBRARIAN)
                return (
                    value === ChartModels.Book || value === ChartModels.Student
                );
            else return userRole === UserRoles.MANAGER;
        });
    };

    return (
        <Container className="container">
            <Card className="container__card">
                <h2>Statistic</h2>
                <Divider />
                <Accordion className="container__card__accordion">
                    <AccordionSummaryWithStyles expandIcon={<ExpandMoreIcon />}>
                        <Typography className="container__card__accordion__heading">
                            Chart
                        </Typography>
                        <Typography className="container__card__accordion__secondary-heading">
                            Click to open settings
                        </Typography>
                    </AccordionSummaryWithStyles>
                    <AccordionDetails>
                        <FormControl className="container__card__accordion__form-control capitalize">
                            <InputLabel>Model</InputLabel>
                            <Select value={model} onChange={handleModelChange}>
                                <MenuItem>-</MenuItem>
                                <Divider />
                                {getModels().map(value => (
                                    <MenuItem
                                        className="capitalize"
                                        value={value}
                                        key={shortId.generate()}
                                    >
                                        {value}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <Autocomplete
                            disabled={!model}
                            className="container__card__accordion__autocomplete"
                            options={getAutocompleteData()}
                            getOptionLabel={autocompleteLabel}
                            onChange={(e: ChangeEvent<{}>, value: any) => {
                                setValue(value?._id);
                            }}
                            renderInput={params => (
                                <TextField
                                    {...params}
                                    variant="standard"
                                    label={autocompletePlaceholder}
                                    placeholder={autocompletePlaceholder}
                                />
                            )}
                        />
                        <Button
                            className="container__card__accordion__button"
                            variant="outlined"
                            color="primary"
                            disabled={!model || !value}
                            onClick={() => onGetStatistic(model, value)}
                        >
                            Show
                        </Button>
                    </AccordionDetails>
                </Accordion>
                <Divider />
                {statistic.length > 0 ? (
                    <LineChart
                        className="container__card__chart"
                        width={500}
                        height={300}
                        data={statistic}
                        margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line
                            name={statistic[0].name}
                            type="monotone"
                            dataKey="quantity"
                            stroke="#8884d8"
                            activeDot={{ r: 8 }}
                        />
                    </LineChart>
                ) : (
                    <h1>Nothing to display</h1>
                )}
            </Card>
        </Container>
    );
};

const mapStateToProps = (state: any) => ({
    books: state.book.allBooks,
    departments: state.department.departments,
    librarians: state.librarian.librarians,
    students: state.student.students,
    userRole: state.auth.user?.role,
    statistic: state.loan.statistic
});

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        onGetAllBooks: () => dispatch(getAllBooks()),
        onGetDepartments: () => dispatch(getDepartments()),
        onGetStudents: () => dispatch(getAllStudents()),
        onGetLibrarians: () => dispatch(getAllLibrarians()),
        onGetStatistic: (model: string, value: string) =>
            dispatch(getStatistic(model, value))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Statistic);
