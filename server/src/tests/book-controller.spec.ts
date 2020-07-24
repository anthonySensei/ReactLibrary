import * as chai from 'chai';

import Author, { IAuthor } from '../models/author';
import Book, { IBook } from '../models/book';
import Department, { IDepartment } from '../models/department';
import Genre, { IGenre } from '../models/genre';

import { getBook, getBooks } from '../controllers/book';

import errorMessages from '../constants/errorMessages';
import successMessages from '../constants/successMessages';
import test from '../constants/test';

import { connectDb } from '../helper/db';

describe('Book controller', () => {
    const mongoDbId = '5edba11fdb31f77eecc4d879';
    const res: any = {
        statusCode: 200,
        message: null,
        books: [],
        book: null,
        paginationData: {},
        status: function (code: number) {
            this.statusCode = code;
            return this;
        },
        send: function (data: any) {
            this.message = data.message;
            this.books = data.books;
            this.book = data.book;
            this.paginationData = data.paginationData;
        }
    };

    const query = {
        page: 1
    };

    before(async () => {
        await connectDb();
        const author: IAuthor = new Author(test.author);
        await author.save();
        const department: IDepartment = new Department(test.department);
        await department.save();
        const genre: IGenre = new Genre(test.genre);
        await genre.save();
        const book: IBook = new Book(test.book);
        await book.save();
    });

    describe('Fetching books', () => {
        it('should send books and pagination data without errors', async () => {
            await getBooks({ query } as any, res);
            chai.expect(res.message).to.be.equal(
                successMessages.SUCCESSFULLY_FETCHED
            );
            chai.expect(res.books.length).not.to.be.equal(0);
            chai.expect(res.paginationData.currentPage).to.be.equal(1);
            chai.expect(res.paginationData.hasPreviousPage).to.be.equal(false);
            chai.expect(res.paginationData.hasNextPage).to.be.equal(false);
        });

        it('should filter book\\books and then send it\\them', async () => {
            const author: IAuthor = new Author({
                ...test.author,
                _id: mongoDbId
            });
            await author.save();
            const department: IDepartment = new Department({
                ...test.department,
                _id: mongoDbId
            });
            await department.save();
            const book: IBook = new Book({
                ...test.book,
                _id: mongoDbId,
                author: mongoDbId,
                department: mongoDbId
            });
            await book.save();
            await getBooks(
                {
                    query: {
                        ...query,
                        authorId: mongoDbId,
                        departmentId: mongoDbId
                    }
                } as any,
                res
            );
            chai.expect(res.message).to.be.equal(
                successMessages.SUCCESSFULLY_FETCHED
            );
            chai.expect(res.books.length).to.be.equal(1);
        });
    });

    describe('Fetching book', () => {
        it("should throw an error if didn't get book id", async () => {
            await getBook({ query: { bookId: null } } as any, res);
            chai.expect(res.statusCode).to.be.equal(400);
            chai.expect(res.message).to.be.equal(
                errorMessages.CANNOT_FIND_BOOK_ID
            );
        });

        it('should send book if all is ok', async () => {
            await getBook(
                { query: { bookId: '5eefc1435c89c844d40db508' } } as any,
                res
            );
            chai.expect(res.message).to.be.equal(
                successMessages.SUCCESSFULLY_FETCHED
            );
            chai.expect(res.book._id.toString()).to.be.equal(
                '5eefc1435c89c844d40db508'
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
