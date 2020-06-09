import React from 'react';

import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';

const renderedSelectField = ({
    input,
    label,
    meta: { touched, error },
    children,
    ...custom
}: any) => (
    <FormControl error={touched && !!error} {...custom}>
        <InputLabel>{label}</InputLabel>
        <Select {...input}>
            {children}
        </Select>
    </FormControl>
);

export default renderedSelectField;
