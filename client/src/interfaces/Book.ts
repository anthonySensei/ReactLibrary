import Genre from './Genre';

export default interface Book {
    title: string;
    description: string;
    image: string;
    author: string;
    quantity: number;
    year: number;
    genres: Genre[];
    _id: string;
}
