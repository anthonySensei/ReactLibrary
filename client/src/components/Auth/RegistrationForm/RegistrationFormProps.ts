import FormProps from '../../../interfaces/props/FormProps';

export default interface RegistrationFormProps extends FormProps {
    message: string;
    switchAuth: (authForm: string) => void;
}
