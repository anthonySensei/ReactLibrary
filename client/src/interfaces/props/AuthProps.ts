import LoginData from "../Login";
import RegistrationData from "../RegistrationData";

export default interface AuthProps {
    message: string;
    onLogin: (loginData: LoginData) => void;
    onRegistration: (registrationData: RegistrationData) => void;
    isLoggedIn: boolean;
    loginError: string;
    onSetLoginError: (isError: boolean) => void;
}
