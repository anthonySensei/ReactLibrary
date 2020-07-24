import * as chai from 'chai';
import { Request } from 'express';

import Author, { IAuthor } from '../models/author';

import { getAuthors } from '../controllers/author';

import successMessages from '../constants/successMessages';
import test from '../constants/test';

import { connectDb } from '../helper/db';

describe('Author controller', () => {
    const res: any = {
        message: null,
        authors: [],
        send: function (data: any) {
            this.message = data.message;
            this.authors = data.authors;
        }
    };

    before(async () => {
        await connectDb();
        const author: IAuthor = new Author(test.author);
        await author.save();
    });

    it('should send authors without errors', async () => {
        await getAuthors({} as Request, res);
        chai.expect(res.message).to.be.equal(
            successMessages.SUCCESSFULLY_FETCHED
        );
        chai.expect(res.authors.length).not.to.be.equal(0);
    });

    after(async () => {
        await Author.deleteMany({});
    });
});
