import Genre from './Genre';
import Department from './Department';
import Author from "./Author";

export default interface Book {
    title: string;
    description: string;
    image: string;
    author: Author;
    quantity: number;
    year: number;
    genres: Genre[];
    department: Department;
    _id: string;
}
