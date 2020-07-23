const expect = require('chai').expect;

const Author = require('../models/author');
const AuthorController = require('../controllers/author');

const successMessages = require('../constants/successMessages');
const test = require('../constants/test');

const db = require('../helper/db');

describe('Author controller', () => {
    const res = {
        message: null,
        authors: [],
        send: function (data) {
            this.message = data.message;
            this.authors = data.authors;
        }
    };

    before(async () => {
        await db.connect();
        const author = new Author(test.author);
        await author.save();
    });

    it('should send authors without errors', async () => {
        await AuthorController.getAuthors({}, res);
        expect(res.message).to.be.equal(successMessages.SUCCESSFULLY_FETCHED);
        expect(res.authors.length).not.to.be.equal(0);
    });

    after(async () => {
        await Author.deleteMany({});
    });
});
