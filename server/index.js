if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const departmentName = 'Main';
const departmentAddress = 'Centre Street';

const path = require('path');

const express = require('express');

const bodyParser = require('body-parser');
const db = require('./helper/db');

const passport = require('passport');

const multer = require('multer');

const bookRoutes = require('./routes/book');
const loanRoutes = require('./routes/loan');
const orderRoutes = require('./routes/order');
const studentRoutes = require('./routes/student');
const authRoutes = require('./routes/auth');
const departmentRoutes = require('./routes/department');
const authorRoutes = require('./routes/author');
const genreRoutes = require('./routes/genre');

const User = require('./models/user');
const Department = require('./models/department');

const links = require('./constants/links');
const authorsUrl = links.AUTHORS_URL;
const departmentsUrl = links.DEPARTMENTS_URL;
const booksUrl = links.BOOKS_URL;
const genresUrl = links.GENRES_URL;
const ordersUrl = links.ORDERS_URL;
const loansUrl = links.LOANS_URL;
const studentsUrl = links.STUDENTS_URL;

const helper = require('./helper/createManager');

const app = express();

const port = process.env.PORT || 3000;

const uuidv4 = require('uuid/v4');

app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport, User);

const imageStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'images');
    },

    filename: function (req, file, cb) {
        let extension = file.originalname.split('.').pop();
        cb(null, uuidv4() + '.' + extension);
    }
});

const fileFilter = (req, file, cb) => {
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

app.use((req, res, next) => {
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
app.use(authorsUrl, authorRoutes);
app.use(booksUrl, bookRoutes);
app.use(departmentsUrl, departmentRoutes);
app.use(genresUrl, genreRoutes);
app.use(loansUrl, loanRoutes);
app.use(ordersUrl, orderRoutes);
app.use(studentsUrl, studentRoutes);

db.connect()
    .then(async () => {
        try {
            const department = await Department.findOne({
                name: departmentName
            });
            if (!department) {
                const mainDepartment = new Department({
                    name: departmentName,
                    address: departmentAddress
                });
                await mainDepartment.save();
            }
            const manager = await User.findOne({
                email: process.env.MANAGER_EMAIL
            });
            if (!manager) {
                await helper.createManager();
            }
            app.listen(port);
        } catch (err) {}
    })
    .catch();
