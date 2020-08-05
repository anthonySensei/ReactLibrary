import Book from "../../interfaces/Book";
import Department from "../../interfaces/Department";
import Student from "../../interfaces/Student";
import Librarian from "../../interfaces/Librarian";

export default interface StatisticProps {
    statistic: any;
    userRole: string;
    books: Book[];
    departments: Department[];
    students: Student[];
    librarians: Librarian[];
    onGetStatistic: (model: string, value: string) => void;
    onGetAllBooks: () => void;
    onGetDepartments: () => void;
    onGetStudents: () => void;
    onGetLibrarians: () => void;
}
