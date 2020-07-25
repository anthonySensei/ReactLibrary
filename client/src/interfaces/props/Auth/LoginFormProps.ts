import LoginData from "../../formsData/LoginData";

export default interface LoginFormProps {
    loginError: string;
    handleSubmit: () => LoginData;
    setLoginError: (isError: boolean) => void;
    switchAuth: (authForm: string) => void;
}
