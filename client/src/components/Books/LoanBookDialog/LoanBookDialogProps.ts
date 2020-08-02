import Student from "../../../interfaces/Student";

export interface LoanBookDialogProps {
    open: boolean;
    onClose: (studentId: string) => void;
    students: Student[];
}
