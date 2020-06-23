import React, { ChangeEvent } from 'react';
import { Field, reduxForm } from 'redux-form';

import { Button, Divider } from '@material-ui/core';

import renderedTextField from '../../../share/renderedFields/input';

import { LOGIN_FORM } from '../../../constants/reduxForms';

import { email, required } from '../../../validation/fields';
import { AuthTypes } from '../../../constants/AuthTypes';

let LoginForm: any = (props: any) => {
    const { handleSubmit, loginError } = props;

    const emailValidate: any = { validate: [required, email] };
    const emailAdvancedValidate: any = {
        error: !!loginError,
        helperText: loginError
    };

    const passwordValidate: any = { validate: [required] };
    const passwordValidateAdvanced: any = {
        error: !!loginError
    };

    return (
        <>
            <h2>Login</h2>
            <Divider />
            <form onSubmit={handleSubmit}>
                <Field
                    name="email"
                    className="form-field"
                    type="text"
                    label="Email"
                    {...(!loginError ? emailValidate : emailAdvancedValidate)}
                    component={renderedTextField}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        props.setLoginError(false)
                    }
                />
                <Field
                    name="password"
                    className="form-field"
                    type="password"
                    label="Password"
                    {...(!loginError
                        ? passwordValidate
                        : passwordValidateAdvanced)}
                    component={renderedTextField}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        props.setLoginError(false)
                    }
                />
                <Button
                    className="form-btn"
                    type="submit"
                    variant="contained"
                    color="primary"
                >
                    Login
                </Button>
                <Divider />
                <div className="links-group">
                    <p
                        className="auth-link"
                        onClick={() => props.switchAuth(AuthTypes.REGISTRATION)}
                    >
                        Don't have account?
                    </p>
                </div>
            </form>
        </>
    );
};

LoginForm = reduxForm({
    form: LOGIN_FORM
})(LoginForm);

export default LoginForm;
