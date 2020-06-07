const { Sequelize } = require('sequelize');
const Op = Sequelize.Op;

const Book = require('../models/book');
const Genre = require('../models/genre');
const Author = require('../models/author');
const Department = require('../models/department');

const statuses = require('../constants/statuses');
const filters = require('../constants/filters');
const successMessages = require('../constants/successMessages');
const errorMessages = require('../constants/errorMessages');

const ITEMS_PER_PAGE = 8;

const imageHandler = require('../helper/imageHandle');

const getCondition = (
    filterName,
    filterValue,
    author,
    fromYear,
    toYear,
    department,
    genres
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
    else if (fromYear) yearCondition = { year: { $gt: fromYear } };
    else if (toYear) yearCondition = { year: { $lt: toYear } };

    const genresId = [];
    genres.map(genre => {
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

exports.getBooks = async (req, res) => {
    const page = +req.query.page || 1;
    const filterName = req.query.filter;
    const filterValue = req.query.value;
    const authorId = req.query.authorId;
    const fromYear = +req.query.fYear;
    const toYear = +req.query.tYear;
    const departmentId = req.query.departmentId;
    const genres = req.query.genres ? JSON.parse(req.query.genres) : [];

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
        const totalBooks = await Book.countDocuments();
        const books = await Book.find()
            .sort([['year', -1]])
            .limit(ITEMS_PER_PAGE)
            .skip((page - 1) * ITEMS_PER_PAGE)
            .where(condition)
            .populate('author')
            .populate('department')
            .populate('genres.genre');
        const booksArr = [];
        books.forEach(book => {
            let genres = [];
            book.genres.forEach(genreCollection => {
                genres.push(genreCollection.genre.name);
            });
            genres = genres.join(', ');
            book.image = imageHandler.convertToBase64(book.image);
            booksArr.push({
                id: book._id,
                title: book.title,
                author: book.author,
                quantity: book.quantity,
                genres: genres,
                year: book.year,
                image: book.image,
                department: book.department,
                description: book.description
            });
        });
        const data = {
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
        };
        return res.send(data);
    } catch (err) {
        return helper.responseErrorHandle(
            res,
            500,
            errorMessages.SOMETHING_WENT_WRONG
        );
    }
};

exports.getBook = async (req, res) => {
    const bookId = req.query.bookId;
    let condition = { id: bookId };

    if (!bookId) {
        return helper.responseErrorHandle(
            res,
            400,
            errorMessages.SOMETHING_WENT_WRONG
        );
    }

    try {
        const book = await Book.findOne({
            where: condition,
            include: [{ model: Author }, { model: Genre }]
        });
        const bookValues = book.get();
        const department = await Department.findOne({
            where: { id: book.get().departmentId }
        });
        bookValues.image = imageHandler.convertToBase64(bookValues.image);
        const bookData = {
            id: bookValues.id,
            isbn: bookValues.isbn,
            quantity: bookValues.quantity,
            name: bookValues.name,
            author: bookValues.author_.get(),
            genre: bookValues.genre_.get(),
            image: bookValues.image,
            description: bookValues.description,
            year: bookValues.year,
            department: department.get()
        };
        const data = {
            book: bookData,
            message: successMessages.SUCCESSFULLY_FETCHED
        };
        helper.responseHandle(res, 200, data);
    } catch (err) {
        return helper.responseErrorHandle(
            res,
            500,
            errorMessages.SOMETHING_WENT_WRONG
        );
    }
};

exports.getAllBooksISBN = async (req, res) => {
    try {
        const books = await Book.findAll();
        const booksArr = [];
        books.forEach(book => {
            const bookData = book.get();
            booksArr.push({
                id: bookData.id,
                isbn: bookData.isbn,
                department: {
                    id: bookData.departmentId
                }
            });
        });
        const data = {
            books: booksArr,
            message: successMessages.SUCCESSFULLY_FETCHED
        };
        helper.responseHandle(res, 200, data);
    } catch (err) {
        return helper.responseErrorHandle(
            res,
            500,
            errorMessages.SOMETHING_WENT_WRONG
        );
    }
};

exports.addBook = async (req, res) => {
    const imageBase64 = req.body.base64;
    if (!imageBase64) {
        return helper.responseErrorHandle(res, 400, errorMessages.EMPTY_FIELDS);
    }

    const bookData = JSON.parse(req.body.book_data);

    if (!bookData) {
        return helper.responseErrorHandle(res, 400, errorMessages.EMPTY_FIELDS);
    }

    const filepath = imageHandler.getPath(imageBase64);

    try {
        const isNotUnique = await Book.findOne({
            where: {
                isbn: bookData.isbn,
                departmentId: bookData.department.id
            }
        });

        if (isNotUnique) {
            return helper.responseErrorHandle(
                res,
                200,
                errorMessages.ISBN_EXIST
            );
        } else {
            const newBook = new Book({
                isbn: bookData.isbn,
                name: bookData.name,
                authorId: bookData.author.id,
                genreId: bookData.genre.id,
                year: bookData.year,
                quantity: bookData.quantity,
                description: bookData.description,
                image: filepath,
                departmentId: bookData.department.id
            });

            await newBook.save();

            const data = {
                isSuccessful: true,
                message: successMessages.BOOK_SUCCESSFULLY_CREATED
            };
            return helper.responseHandle(res, 200, data);
        }
    } catch (err) {
        return helper.responseErrorHandle(
            res,
            500,
            errorMessages.SOMETHING_WENT_WRONG
        );
    }
};

exports.editBook = async (req, res) => {
    const imageBase64 = JSON.parse(req.body.base64);
    const bookData = JSON.parse(req.body.book_data);

    if (!bookData && !imageBase64) {
        return helper.responseErrorHandle(res, 400, errorMessages.EMPTY_FIELDS);
    }

    if (imageBase64.image) {
        bookData.image = imageHandler.getPath(imageBase64.image);
    } else {
        bookData.image = imageHandler.getPath(bookData.image);
    }

    try {
        const isNotUnique = await Book.findOne({
            where: {
                isbn: bookData.isbn,
                departmentId: bookData.department.id,
                id: { [Op.ne]: bookData.id }
            }
        });

        if (isNotUnique) {
            return helper.responseErrorHandle(
                res,
                200,
                errorMessages.ISBN_EXIST
            );
        } else {
            const book = await Book.findOne({
                where: {
                    id: bookData.id
                }
            });

            await book.update(bookData);

            const data = {
                isSuccessful: true,
                message: successMessages.BOOK_SUCCESSFULLY_UPDATED
            };
            return helper.responseHandle(res, 200, data);
        }
    } catch (err) {
        return helper.responseErrorHandle(
            res,
            500,
            errorMessages.SOMETHING_WENT_WRONG
        );
    }
};

exports.deleteBook = async (req, res) => {
    const bookId = req.query.bookId;
    try {
        const book = await Book.findOne({ where: { id: bookId } });
        await book.destroy();
        const data = {
            isSuccessful: true,
            message: successMessages.BOOK_SUCCESSFULLY_DELETED
        };
        return helper.responseHandle(res, 200, data);
    } catch (err) {
        return helper.responseErrorHandle(
            res,
            500,
            errorMessages.SOMETHING_WENT_WRONG
        );
    }
};

exports.moveBook = async (req, res) => {
    const departmentId = req.body.departmentId;
    const quantity = req.body.quantity;
    const book = req.body.book;
    const newBook = {
        ...book,
        departmentId: departmentId,
        id: null,
        genreId: book.genre.id,
        authorId: book.author.id,
        quantity: quantity
    };
    try {
        newBook.image = imageHandler.getPath(newBook.image);
        const isNotUnique = await Book.findOne({
            where: {
                isbn: newBook.isbn,
                departmentId: newBook.departmentId
            }
        });
        if (isNotUnique) {
            await isNotUnique.update({
                quantity: isNotUnique.get().quantity + quantity
            });
            const bookInDb = await Book.findOne({ where: { id: book.id } });
            await bookInDb.update({
                quantity: bookInDb.get().quantity - quantity
            });
            const data = {
                isSuccessful: true,
                message: successMessages.BOOK_SUCCESSFULLY_MOVED
            };
            return helper.responseHandle(res, 200, data);
        }
        await Book.create(newBook);
        const bookInDb = await Book.findOne({ where: { id: book.id } });
        await bookInDb.update({ quantity: bookInDb.get().quantity - quantity });
        const data = {
            isSuccessful: true,
            message: successMessages.BOOK_SUCCESSFULLY_MOVED
        };
        return helper.responseHandle(res, 200, data);
    } catch (err) {
        return helper.responseErrorHandle(
            res,
            500,
            errorMessages.SOMETHING_WENT_WRONG
        );
    }
};
