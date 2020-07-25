import Author, { IAuthor } from '../models/author';
import Book from '../models/book';

import errorMessages from '../constants/errorMessages';

import socket from '../config/socket';
import successMessages from '../constants/successMessages';

export default {
    authors: async () => {
        try {
            return await Author.find();
        } catch (err) {
            return [];
        }
    },
    addAuthor: async ({ authorInput }: any) => {
        const author: IAuthor = authorInput;
        try {
            const isNotUnique = !!(await Author.findOne({
                name: author.name,
                country: author.country
            }));
            if (isNotUnique) throw new Error(errorMessages.AUTHOR_EXIST);
            await Author.create(author);
            socket.getIO().emit('authors', {
                action: 'create'
            });
            return successMessages.AUTHOR_SUCCESSFULLY_CREATED;
        } catch (err) {
            throw new Error(err.message);
        }
    },
    updateAuthor: async ({ id, authorInput }: any) => {
        const author: IAuthor = authorInput;
        try {
            const isNotUnique = !!(await Author.findOne({
                name: author.name,
                country: author.country
            }));
            if (isNotUnique) throw new Error(errorMessages.AUTHOR_EXIST);
            await Author.findByIdAndUpdate(id, author);
            socket.getIO().emit('authors', {
                action: 'update'
            });
            return successMessages.AUTHOR_SUCCESSFULLY_UPDATED;
        } catch (err) {
            throw new Error(err.message);
        }
    },
    deleteAuthor: async ({ id }: any) => {
        try {
            const hasBook: boolean = !!(await Book.findOne({ author: id }));
            if (hasBook) throw new Error(errorMessages.AUTHOR_HAS_BOOK);
            await Author.findByIdAndDelete(id);
            socket.getIO().emit('authors', {
                action: 'delete'
            });
            return successMessages.AUTHOR_SUCCESSFULLY_DELETED;
        } catch (err) {
            throw new Error(err.message);
        }
    }
};
