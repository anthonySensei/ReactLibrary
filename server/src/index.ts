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
import bookRoutes from './routes/book';
import departmentRoutes from './routes/department';
import genreRoutes from './routes/genre';
import orderRoutes from './routes/order';
import loanRoutes from './routes/loan';
import studentRoutes from './routes/student';

import User, { IUser } from './models/user';
import Department, { IDepartment } from './models/department';

import {
    BookUrls,
    DepartmentUrls,
    GenreUrls,
    LoanUrls,
    StudentUrl,
    OrderUrls
} from './constants/links';

import { createManager } from './helper/createManager';

import passportConfig from './config/passport';
import socket from './config/socket';
import multerOption from './config/multer';

import { graphqlHTTP } from 'express-graphql';
import graphqlSchema from './graphql/schema';
import graphqlResolver from './graphql/resolvers';

const app = express();
const port = process.env.PORT || 3000;

app.use(passport.initialize());
app.use(passport.session());

passportConfig(passport, User);

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
    if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
    }
    next();
});

app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: false }));

app.use(multer(multerOption).single('image'));
app.use(express.static(path.join(__dirname, 'public')));
app.use('images', express.static(path.join(__dirname, 'images')));

app.use(
    '/graphql',
    graphqlHTTP({
        schema: graphqlSchema,
        rootValue: graphqlResolver,
        graphiql: true,
        customFormatErrorFn(err) {
            if (!err.originalError) {
                return err;
            }
            const message = err.message || 'An error occurred.';
            return { message };
        }
    })
);

app.use(authRoutes);
app.use(BookUrls.BASE, bookRoutes);
app.use(DepartmentUrls.BASE, departmentRoutes);
app.use(GenreUrls.BASE, genreRoutes);
app.use(LoanUrls.BASE, loanRoutes);
app.use(OrderUrls.BASE, orderRoutes);
app.use(StudentUrl.BASE, studentRoutes);

connectDb()
    .then(async () => {
        try {
            const departmentName = 'Main';
            const departmentAddress = 'Centre Street';
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
