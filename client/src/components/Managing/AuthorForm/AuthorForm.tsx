import React, { ChangeEvent, useEffect, useState } from 'react';
import { Field, reduxForm } from 'redux-form';

import openSocket from 'socket.io-client';

import { Button, Container, Divider, TextField } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';

import { AUTHOR_FORM } from '../../../constants/reduxForms';
import { SERVER_URL } from '../../../constants/serverLinks';

import ManagingFormProps from '../ManagingFormProps';
import Author from '../../../interfaces/Author';

import renderedTextField from '../../../share/renderedFields/input';

import { required } from '../../../validation/fields';

import '../ManagingForms.scss';

let AuthorForm: any = (props: ManagingFormProps) => {
    const { handleSubmit, reset, initialize, onDelete } = props;
    const { invalid, pristine, submitting, isManaging } = props;

    const [author, setAuthor] = useState(null);

    useEffect(() => {
        if (author) {
            initialize(author);
        } else {
            initialize({});
        }
    }, [author]);

    useEffect(() => {
        const socket = openSocket(SERVER_URL);
        socket.on('authors', (data: any) => {
            setAuthor(null);
        });
    }, []);

    return (
        <Container className="form-container">
            <h2>{!isManaging ? 'Adding' : 'Managing'}</h2>
            <Divider />
            {isManaging && (
                <>
                    <Autocomplete
                        className="form-container__autocomplete"
                        options={props.authors}
                        getOptionLabel={(author: Author) =>
                            `${author.name}(${author.country})`
                        }
                        onChange={(e: ChangeEvent<{}>, values: any) => {
                            setAuthor(values);
                        }}
                        value={author}
                        renderInput={params => (
                            <TextField
                                {...params}
                                variant="standard"
                                label="Authors"
                                placeholder="Authors"
                            />
                        )}
                    />
                    <Button
                        className="form-container__w30"
                        variant="contained"
                        color="default"
                        disabled={!author}
                        onClick={() => {
                            const authorToDelete: Author = (author as unknown) as Author;
                            onDelete(authorToDelete._id);
                        }}
                    >
                        Delete
                    </Button>
                </>
            )}

            <form onSubmit={handleSubmit}>
                <Field
                    name="name"
                    className="form-field"
                    type="text"
                    label="Name"
                    validate={[required]}
                    component={renderedTextField}
                />
                <Field
                    name="country"
                    className="form-field"
                    type="text"
                    label="Country"
                    validate={[required]}
                    component={renderedTextField}
                />
                <div className="btn-container">
                    <Button
                        className="btn-container__form-btn"
                        type="submit"
                        variant="contained"
                        color="primary"
                        disabled={
                            invalid || submitting || (pristine && !!author)
                        }
                    >
                        {!isManaging ? 'Add' : 'Edit'}
                    </Button>
                    <Button
                        className="btn-container__form-btn"
                        type="button"
                        variant="outlined"
                        color="primary"
                        onClick={reset}
                        disabled={submitting}
                    >
                        Clear
                    </Button>
                </div>
            </form>
        </Container>
    );
};

AuthorForm = reduxForm({
    form: AUTHOR_FORM
})(AuthorForm);

export default AuthorForm;
