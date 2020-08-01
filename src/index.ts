import { config } from 'dotenv';
import express from 'express';
import bodyParser from 'body-parser';
import multer from 'multer';
import path from 'path';
import fs from 'fs';

import passport from 'passport';
import helmet from 'helmet';
import compression from 'compression';
import morgan from 'morgan';

import useRoutes from './routes/routes';

import User from './models/user';

import {
    createMainDepartment,
    createMainManager
} from './helper/createMainManager';
import { connectDb } from './helper/db';

import passportConfig from './config/passport';
import socket from './config/socket';
import multerOption from './config/multer';
import cors from './config/cors';

if (process.env.NODE_ENV !== 'production') {
    config();
}

const app = express();
const port = process.env.PORT || 3000;

app.use(passport.initialize());
app.use(passport.session());

passportConfig(passport, User);

const accessLogStream = fs.createWriteStream(
    path.join(__dirname, 'access.log'),
    { flags: 'a' }
);

app.use(cors);
app.use(helmet());
app.use(compression());
app.use(morgan('combined', { stream: accessLogStream }));

app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: false }));

app.use(multer(multerOption).single('image'));
app.use(express.static(path.join(__dirname, 'public')));
app.use('images', express.static(path.join(__dirname, 'images')));

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
}

useRoutes(app);

connectDb()
    .then(async () => {
        try {
            await createMainDepartment();
            await createMainManager();
            const server = app.listen(port);
            const io = socket.init(server);
            io.on('connection', () => {});
        } catch (err) {}
    })
    .catch();
