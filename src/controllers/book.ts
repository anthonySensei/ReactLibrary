import Book, { IBook } from '../models/book';
import Genre, { IGenre } from '../models/genre';

import filters from '../constants/filters';
import successMessages from '../constants/successMessages';
import errorMessages from '../constants/errorMessages';

import { responseErrorHandle } from '../helper/responseHandle';
import { Request, Response } from 'express';
import Student from '../models/student';
import User from '../models/user';

const ITEMS_PER_PAGE: number = 8;

const getCondition = (
    filterName: string,
    filterValue: string,
    author: string,
    fromYear: number,
    toYear: number,
    department: string,
    genres: any
) => {
    let authorCondition = {};
    let genreCondition = {};
    let departmentCondition = {};
    let yearCondition = {};
    let filterCondition = {};

    if (filterName && filterValue) {
        if (filterName === filters.TITLE)
            filterCondition = {
                title: {
                    $regex: new RegExp(filterValue, 'i')
                }
            };
        else if (filterName === filters.ISBN)
            filterCondition = { isbn: filterValue };
    }

    if (author) authorCondition = { author: author };
    if (department && department !== 'all')
        departmentCondition = { department: department };

    if (toYear && fromYear)
        yearCondition = {
            year: {
                $gte: fromYear,
                $lte: toYear
            }
        };
    else if (fromYear) yearCondition = { year: { $gte: fromYear } };
    else if (toYear) yearCondition = { year: { $lte: toYear } };

    const genresId: string[] = [];
    genres.map((genre: any) => {
        genresId.push(genre._id);
    });

    if (genres.length > 0)
        genreCondition = { 'genres.genre': { $in: genresId } };

    return {
        ...authorCondition,
        ...genreCondition,
        ...departmentCondition,
        ...yearCondition,
        ...filterCondition
    };
};

export const getBooks = async (req: Request, res: Response) => {
    const page: number = +req.query.page! || 1;
    const filterName: string = req.query.filter as string;
    const filterValue: string = req.query.value as string;
    const authorId: string = req.query.authorId as string;
    const fromYear: number = +req.query.fYear!;
    const toYear: number = +req.query.tYear!;
    const departmentId: string = req.query.departmentId as string;
    const genres: string[] = req.query.genres
        ? JSON.parse(req.query.genres as string)
        : [];

    const condition = getCondition(
        filterName,
        filterValue,
        authorId,
        fromYear,
        toYear,
        departmentId,
        genres
    );

    try {
        const totalBooks: number = await Book.countDocuments();
        const books: IBook[] = await Book.find()
            .sort([['year', -1]])
            .limit(ITEMS_PER_PAGE)
            .skip((page - 1) * ITEMS_PER_PAGE)
            .where(condition)
            .populate('author')
            .populate('department')
            .populate('genres.genre');
        const booksArr: IBook[] = [];
        books.forEach((book: IBook) => {
            let genres: any = [];
            book.genres.forEach((genreCollection: any) => {
                genres.push(genreCollection.genre.name);
            });
            genres = genres.join(', ');
            booksArr.push({ ...book.toJSON(), genres });
        });
        return res.send({
            books: booksArr,
            message: successMessages.SUCCESSFULLY_FETCHED,
            paginationData: {
                currentPage: page,
                hasNextPage: ITEMS_PER_PAGE * page < totalBooks,
                hasPreviousPage: page > 1,
                nextPage: page + 1,
                previousPage: page - 1,
                lastPage: Math.ceil(totalBooks / ITEMS_PER_PAGE)
            }
        });
    } catch (err) {
        return responseErrorHandle(
            res,
            500,
            errorMessages.SOMETHING_WENT_WRONG
        );
    }
};

export const getAllBooks = async (req: Request, res: Response) => {
    try {
        const books: IBook[] = await Book.find().populate('author');
        const allBooks = books.map((book: IBook) => {
            return {
                _id: book._id,
                title: book.title,
                author: { name: book.author.name }
            };
        });
        return res.send({
            books: allBooks,
            message: successMessages.SUCCESSFULLY_FETCHED
        });
    } catch (err) {
        return responseErrorHandle(
            res,
            500,
            errorMessages.SOMETHING_WENT_WRONG
        );
    }
};

export const getBook = async (req: Request, res: Response) => {
    const bookId: string = req.query.bookId as string;

    if (!bookId) {
        return responseErrorHandle(res, 400, errorMessages.CANNOT_FIND_BOOK_ID);
    }

    try {
        const book: IBook | null = await Book.findOne({ _id: bookId })
            .populate('author')
            .populate('department')
            .populate('genres.genre');
        if (!book) {
            return responseErrorHandle(
                res,
                400,
                errorMessages.SOMETHING_WENT_WRONG
            );
        } else {
            let genres: any = [];
            book.genres.forEach((genreCollection: any) => {
                genres.push(genreCollection.genre.name);
            });
            genres = genres.join(', ');
            res.send({
                book: { ...book.toJSON(), genres },
                message: successMessages.SUCCESSFULLY_FETCHED
            });
        }
    } catch (err) {
        return responseErrorHandle(
            res,
            500,
            errorMessages.SOMETHING_WENT_WRONG
        );
    }
};

export const addBook = async (req: Request, res: Response) => {
    const book: IBook = { ...req.body };
    const genres = book.genres.map((genre: IGenre) => {
        return { genre: genre._id };
    });
    book.genres = genres as any;
    try {
        const isNotUnique = !!(await Book.findOne({ isbn: book.isbn }));
        if (isNotUnique)
            return responseErrorHandle(res, 500, errorMessages.ISBN_EXIST);
        else {
            await Book.create(book);
            res.send({ message: successMessages.BOOK_SUCCESSFULLY_ADDED });
        }
    } catch (err) {
        responseErrorHandle(res, 500, errorMessages.SOMETHING_WENT_WRONG);
    }
};

export const moveBook = async (req: Request, res: Response) => {
    const departmentId: string = req.body.departmentId;
    const quantity: number = +req.body.quantity;
    const book: any = req.body.book;
    const bookGenres: string[] = book.genres.split(', ');
    const genresInDb: IGenre[] = await Genre.find({
        name: { $in: bookGenres }
    });
    const gIds = genresInDb.map(genre => genre._id);
    const genres = gIds.map(gId => {
        return {
            genre: gId
        };
    });
    const newBook: any = new Book({
        ...book,
        department: departmentId,
        _id: null,
        genres,
        author: book.author._id,
        quantity: quantity
    });
    try {
        const isNotUnique: IBook | null = await Book.findOne({
            isbn: newBook.isbn,
            department: newBook.department
        });
        if (isNotUnique) {
            await isNotUnique.updateOne({
                quantity: +isNotUnique.quantity + quantity
            });
            await Book.findByIdAndUpdate(book._id, {
                $inc: {
                    quantity: -quantity
                }
            });
        } else {
            await newBook.save();
            await Book.findByIdAndUpdate(book._id, {
                $inc: {
                    quantity: -quantity
                }
            });
        }
        return res.send({
            message: successMessages.BOOK_SUCCESSFULLY_MOVED
        });
    } catch (err) {
        return responseErrorHandle(
            res,
            500,
            errorMessages.SOMETHING_WENT_WRONG
        );
    }
};

export const checkBookAdding = async (req: Request, res: Response) => {
    const { department, isbn } = req.body;
    try {
        const isNotUnique: boolean = !!(await Book.findOne({
            department,
            isbn
        }));
        res.send({ isNotUnique });
    } catch (err) {
        return responseErrorHandle(
            res,
            500,
            errorMessages.SOMETHING_WENT_WRONG
        );
    }
};
