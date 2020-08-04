import React, { ChangeEvent, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { getAllBooks, getBooks, getStatistic } from '../../redux/actions';

import { Button, Container, Divider, TextField } from '@material-ui/core';
import Card from '@material-ui/core/Card';

import {
    CartesianGrid,
    Legend,
    Line,
    LineChart,
    Tooltip,
    XAxis,
    YAxis
} from 'recharts';

import './Statistic.scss';
import Book from '../../interfaces/Book';
import Student from '../../interfaces/Student';
import { Autocomplete } from '@material-ui/lab';

const data = [
    {
        name: 'Page A',
        uv: 4000,
        pv: 2400,
        amt: 2400
    },
    {
        name: 'Page B',
        uv: 3000,
        pv: 1398,
        amt: 2210
    },
    {
        name: 'Page C',
        uv: 2000,
        pv: 9800,
        amt: 2290
    },
    {
        name: 'Page D',
        uv: 2780,
        pv: 3908,
        amt: 2000
    },
    {
        name: 'Page E',
        uv: 1890,
        pv: 4800,
        amt: 2181
    },
    {
        name: 'Page F',
        uv: 2390,
        pv: 3800,
        amt: 2500
    },
    {
        name: 'Page G',
        uv: 3490,
        pv: 4300,
        amt: 2100
    }
];

interface StatisticProps {
    statistic: any;
    books: Book[];
    onGetStatistic: (model: string, value: string) => void;
    onGetAllBooks: () => void;
}

const Statistic = (props: StatisticProps) => {
    const { onGetStatistic, statistic, onGetAllBooks, books } = props;
    const [value, setValue] = useState('');

    useEffect(() => {
        onGetAllBooks();
    }, []);

    return (
        <Container className="container">
            <Card className="container__card">
                <h2>Statistic</h2>
                <Divider />
                <Autocomplete
                    options={books}
                    getOptionLabel={(book: Book) =>
                        `${book.title}(${book.author.name})`
                    }
                    onChange={(e: ChangeEvent<{}>, book: Book | null) => {
                        setValue(book?._id!);
                    }}
                    renderInput={params => (
                        <TextField
                            {...params}
                            variant="standard"
                            label="Book"
                            placeholder="Book"
                        />
                    )}
                />
                <Button onClick={() => onGetStatistic('book', value)}>
                    Show
                </Button>
                <Divider />
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
                        type="monotone"
                        dataKey="quantity"
                        stroke="#8884d8"
                        activeDot={{ r: 8 }}
                    />
                </LineChart>
            </Card>
        </Container>
    );
};

const mapStateToProps = (state: any) => ({
    books: state.book.books,
    statistic: state.loan.statistic
});

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        onGetAllBooks: () => dispatch(getAllBooks()),
        onGetStatistic: (model: string, value: string) =>
            dispatch(getStatistic(model, value))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Statistic);
