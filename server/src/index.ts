import { config } from 'dotenv';

if (process.env.NODE_ENV !== 'production') {
    config();
}

import express from 'express';
import bodyParser from 'body-parser';
import multer from 'multer';
import path from 'path';

import passport from 'passport';

import { connectDb } from './helper/db';

import authRoutes from './routes/auth';
import authorRoutes from './routes/author';
import bookRoutes from './routes/book';
import departmentRoutes from './routes/department';
import genreRoutes from './routes/genre';
import orderRoutes from './routes/order';
import loanRoutes from './routes/loan';
import studentRoutes from './routes/student';

import User, { IUser } from './models/user';
import Department, { IDepartment } from './models/department';

import {
    AuthorUrls,
    BookUrls,
    DepartmentUrls,
    GenreUrls,
    LoanUrls,
    StudentUrl,
    OrderUrls
} from './constants/links';

import { createManager } from './helper/createManager';

import uuid from 'uuid';

import passportConfig from './config/passport';

const app = express();

const port = process.env.PORT || 3000;

app.use(passport.initialize());
app.use(passport.session());

passportConfig(passport, User);

const imageStorage = multer.diskStorage({
    destination: (req: any, file: any, cb: any) => {
        cb(null, 'images');
    },

    filename: function (req: any, file: any, cb: any) {
        let extension = file.originalname.split('.').pop();
        cb(null, uuid.v4() + '.' + extension);
    }
});

const fileFilter = (req: any, file: any, cb: any) => {
    if (
        file.mimetype === 'image/png' ||
        file.mimetype === 'image/jpg' ||
        file.mimetype === 'image/jpeg'
    ) {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(
    multer({
        limits: { fieldSize: 5 * 1024 * 1024 },
        storage: imageStorage,
        fileFilter: fileFilter
    }).single('image')
);

app.use(express.static(path.join(__dirname, 'public')));
app.use('images', express.static(path.join(__dirname, 'images')));

app.use((req: any, res: any, next: any) => {
    res.header('Access-Control-Allow-Origin', process.env.REACT);
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    res.header(
        'Access-Control-Allow-Methods',
        'GET, PATCH, PUT, POST, DELETE, OPTIONS'
    );
    next();
});

app.use(authRoutes);
app.use(AuthorUrls.BASE, authorRoutes);
app.use(BookUrls.BASE, bookRoutes);
app.use(DepartmentUrls.BASE, departmentRoutes);
app.use(GenreUrls.BASE, genreRoutes);
app.use(LoanUrls.BASE, loanRoutes);
app.use(OrderUrls.BASE, orderRoutes);
app.use(StudentUrl.BASE, studentRoutes);

const departmentName = 'Main';
const departmentAddress = 'Centre Street';
import socket from './config/socket';

connectDb()
    .then(async () => {
        try {
            const department: IDepartment | null = await Department.findOne({
                name: departmentName
            });
            if (!department) {
                const mainDepartment = new Department({
                    name: departmentName,
                    address: departmentAddress
                });
                await mainDepartment.save();
            }
            const manager: IUser | null = await User.findOne({
                email: process.env.MANAGER_EMAIL
            });
            if (!manager) {
                await createManager();
            }
            const server = app.listen(port);
            const io = socket.init(server);
            io.on('connection', () => {});
        } catch (err) {}
    })
    .catch();
