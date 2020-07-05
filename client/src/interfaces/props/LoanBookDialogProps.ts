import Student from "../Student";

export interface LoanBookDialogProps {
    open: boolean;
    onClose: (studentId: string) => void;
    students: Student[];
}
