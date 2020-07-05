import {RouteComponentProps} from "react-router-dom";

export default interface ActivationPageProps extends RouteComponentProps<{}> {
    message: string;
    error: string;
    onActivate: (token: string) => void;
}
