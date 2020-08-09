import * as chai from 'chai';
import { Request } from 'express';

import Genre, { IGenre } from '../models/genre';

import { getGenres } from '../controllers/genre';

import successMessages from '../constants/successMessages';
import test from '../constants/test';

import { connectTestDb, logError } from './helper/config';

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
        try {
            await connectTestDb();
            const genre: IGenre = new Genre(test.genre);
            await genre.save();
        } catch (err) {
            logError(err);
        }
    });

    it('should send genres without errors', async () => {
        try {
            await getGenres({} as Request, res);
            chai.expect(res.message).to.be.equal(
                successMessages.SUCCESSFULLY_FETCHED
            );
            chai.expect(res.genres.length).not.to.be.equal(0);
        } catch (err) {
            logError(err);
        }
    });

    after(async () => {
        try {
            await Genre.deleteMany({});
        } catch (err) {
            logError(err);
        }
    });
});
