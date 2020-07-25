import Department from '../../Department';

export default interface DepartmentFormProps {
    invalid: boolean;
    pristine: boolean;
    submitting: boolean;
    handleSubmit: () => Department;
    reset: () => void;
}
