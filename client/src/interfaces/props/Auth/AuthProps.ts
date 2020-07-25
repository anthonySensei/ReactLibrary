import LoginData from "../../formsData/LoginData";
import RegistrationData from "../../formsData/RegistrationData";

export default interface AuthProps {
    message: string;
    onLogin: (loginData: LoginData) => void;
    onRegistration: (registrationData: RegistrationData) => void;
    isLoggedIn: boolean;
    loginError: string;
    onSetLoginError: (isError: boolean) => void;
}
