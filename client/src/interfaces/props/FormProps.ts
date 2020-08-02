export default interface FormProps {
    handleSubmit: () => void;
    invalid: boolean;
    reset: (variable: any) => void;
    initialize: (obj: any) => void;
    pristine: boolean;
    submitting: boolean;
}
