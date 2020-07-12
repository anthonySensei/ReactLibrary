const expect = require('chai').expect;

const Author = require('../models/author');
const Book = require('../models/book');
const Department = require('../models/department');
const Genre = require('../models/genre');
const BookController = require('../controllers/book');

const errorMessages = require('../constants/errorMessages');
const successMessages = require('../constants/successMessages');
const test = require('../constants/test');

const db = require('../helper/db');

describe('Book controller', () => {
    const res = {
        statusCode: null,
        message: null,
        books: [],
        paginationData: {},
        status: function (code) {
            this.statusCode = code;
            return this;
        },
        send: function (data) {
            this.message = data.message;
            this.books = data.books;
            this.paginationData = data.paginationData;
        }
    };

    const query = {
        page: 1
    };

    before(async () => {
        await db.connect();
        const author = new Author(test.author);
        await author.save();
        const department = new Department(test.department);
        await department.save();
        const genre = new Genre(test.genre);
        await genre.save();
        const book = new Book(test.book);
        await book.save();
    });

    describe('Fetching books', () => {
        it('should send books and pagination data without errors', async () => {
            await BookController.getBooks({ query }, res);
            expect(res.message).to.be.equal(
                successMessages.SUCCESSFULLY_FETCHED
            );
            expect(res.books.length).not.to.be.equal(0);
            expect(res.paginationData.currentPage).to.be.equal(1);
            expect(res.paginationData.hasPreviousPage).to.be.equal(false);
            expect(res.paginationData.hasNextPage).to.be.equal(false);
        });

        it('should filter book\\books and then send it\\them', async () => {
            const author = new Author({
                ...test.author,
                _id: '5edba11fdb31f77eecc4d879'
            });
            await author.save();
            const department = new Department({
                ...test.department,
                _id: '5edba11fdb31f77eecc4d879'
            });
            await department.save();
            const book = new Book({
                ...test.book,
                _id: '5edba11fdb31f77eecc4d879',
                author: '5edba11fdb31f77eecc4d879',
                department: '5edba11fdb31f77eecc4d879'
            });
            await book.save();
            await BookController.getBooks(
                {
                    query: {
                        ...query,
                        authorId: '5edba11fdb31f77eecc4d879',
                        departmentId: '5edba11fdb31f77eecc4d879'
                    }
                },
                res
            );
            expect(res.message).to.be.equal(
                successMessages.SUCCESSFULLY_FETCHED
            );
            expect(res.books.length).to.be.equal(1);
        });
    });

    describe('Fetching book', () => {
        it("should throw an error if didn't get book id", async () => {
            await BookController.getBook({ query: { bookId: null } }, res);
            expect(res.message).to.be.equal(errorMessages.CANNOT_FIND_BOOK_ID);
        });

        it('should send book if all is ok', async () => {
            await BookController.getBook(
                { query: { bookId: '5eefc1435c89c844d40db508' } },
                res
            );
            expect(res.message).to.be.equal(
                successMessages.SUCCESSFULLY_FETCHED
            );
        });
    });

    after(async () => {
        await Author.deleteMany({});
        await Department.deleteMany({});
        await Book.deleteMany({});
        await Genre.deleteMany({});
    });
});