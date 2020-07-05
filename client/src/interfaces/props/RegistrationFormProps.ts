import RegistrationData from '../RegistrationData';

export default interface RegistrationFormProps {
    handleSubmit: () => RegistrationData;
    invalid: boolean;
    message: string;
    switchAuth: (authForm: string) => void;
}
