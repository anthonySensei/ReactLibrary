import LoginData from "../../interfaces/formsData/LoginData";
import RegistrationData from "../../interfaces/formsData/RegistrationData";

export default interface AuthProps {
    message: string;
    onLogin: (loginData: LoginData) => void;
    onRegistration: (registrationData: RegistrationData) => void;
    isLoggedIn: boolean;
    loginError: string;
    onSetLoginError: (isError: boolean) => void;
}
