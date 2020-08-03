import FormProps from '../../../interfaces/props/FormProps';

export default interface LoginFormProps extends FormProps {
    loginError: string;
    setLoginError: (isError: boolean) => void;
    switchAuth: (authForm: string) => void;
}
