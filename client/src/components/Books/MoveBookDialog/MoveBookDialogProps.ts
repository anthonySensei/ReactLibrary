import Department from '../../../interfaces/Department';

export default interface MoveBookDialogProps {
    open: boolean;
    quantityError: string;
    departmentError: string;
    departments: Department[];
    onClose: (departmentId: string, quantity: number, submit: boolean) => void;
    onSetQuantityError: (error: string) => void;
    onSetDepartmentError: (error: string) => void;
}
