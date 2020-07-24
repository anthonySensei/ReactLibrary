import * as chai from 'chai';
import { Request } from 'express';

import Genre, { IGenre } from '../models/genre';

import { getGenres } from '../controllers/genre';

import successMessages from '../constants/successMessages';
import test from '../constants/test';

import { connectDb } from '../helper/db';

describe('Genre controller', () => {
    const res: any = {
        message: null,
        genres: [],
        send: function (data: any) {
            this.message = data.message;
            this.genres = data.genres;
        }
    };

    before(async () => {
        await connectDb();
        const genre: IGenre = new Genre(test.genre);
        await genre.save();
    });

    it('should send genres without errors', async () => {
        await getGenres({} as Request, res);
        chai.expect(res.message).to.be.equal(
            successMessages.SUCCESSFULLY_FETCHED
        );
        chai.expect(res.genres.length).not.to.be.equal(0);
    });

    after(async () => {
        await Genre.deleteMany({});
    });
});
