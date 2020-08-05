import Department from './Department';

export default interface Librarian {
    passportId: string;
    name: string;
    department: Department;
    _id: string;
}
