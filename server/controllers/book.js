const Book = require('../models/book');
const Genre = require('../models/genre');

const filters = require('../constants/filters');
const successMessages = require('../constants/successMessages');
const errorMessages = require('../constants/errorMessages');

const ITEMS_PER_PAGE = 8;

const imageHandler = require('../helper/imageHandle');

const helper = require('../helper/responseHandle');

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
    else if (fromYear) yearCondition = { year: { $gte: fromYear } };
    else if (toYear) yearCondition = { year: { $lte: toYear } };

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
            if (process.env.NODE_ENV !== 'testing') {
                book.image = imageHandler.convertToBase64(book.image);
            }
            booksArr.push({
                _id: book._id,
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
        return helper.responseErrorHandle(
            res,
            500,
            errorMessages.SOMETHING_WENT_WRONG
        );
    }
};

exports.getBook = async (req, res) => {
    const bookId = req.query.bookId;

    if (!bookId) {
        return helper.responseErrorHandle(
            res,
            400,
            errorMessages.CANNOT_FIND_BOOK_ID
        );
    }

    try {
        const book = await Book.findOne({ _id: bookId })
            .populate('author')
            .populate('department')
            .populate('genres.genre');
        if (process.env.NODE_ENV !== 'testing') {
            book.image = imageHandler.convertToBase64(book.image);
        }
        let genres = [];
        book.genres.forEach(genreCollection => {
            genres.push(genreCollection.genre.name);
        });
        genres = genres.join(', ');
        const bookData = {
            _id: book._id,
            isbn: book.isbn,
            title: book.title,
            author: book.author,
            quantity: book.quantity,
            language: book.language,
            genres: genres,
            year: book.year,
            image: book.image,
            department: book.department,
            description: book.description
        };
        res.send({
            book: bookData,
            message: successMessages.SUCCESSFULLY_FETCHED
        });
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
    const quantity = +req.body.quantity;
    const book = req.body.book;
    book.image = imageHandler.getPath(book.image);
    const bookGenres = book.genres.split(', ');
    const genresInDb = await Genre.find({ name: { $in: bookGenres } });
    const gIds = genresInDb.map(genre => genre._id);
    const genreArr = gIds.map(gId => {
        return {
            genre: gId
        };
    });
    const newBook = new Book({
        ...book,
        department: departmentId,
        _id: null,
        genres: genreArr,
        author: book.author._id,
        quantity: quantity
    });
    try {
        const isNotUnique = await Book.findOne({
            isbn: newBook.isbn,
            department: newBook.department
        });
        if (isNotUnique) {
            await isNotUnique.updateOne({
                quantity: +isNotUnique.quantity + quantity
            });
            const bookInDb = await Book.findOne({ _id: book._id });
            await bookInDb.updateOne({
                quantity: bookInDb.quantity - quantity
            });
        } else {
            await newBook.save();
            const bookInDb = await Book.findOne({ _id: book._id });
            await bookInDb.updateOne({
                quantity: bookInDb.quantity - quantity
            });
        }
        return res.send({
            message: successMessages.BOOK_SUCCESSFULLY_MOVED
        });
    } catch (err) {
        return helper.responseErrorHandle(
            res,
            500,
            errorMessages.SOMETHING_WENT_WRONG
        );
    }
};
