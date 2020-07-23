const roles = require('./roles');

module.exports = {
    author: {
        _id: '5eefc1435c89c844d40db508',
        name: 'Name',
        country: 'country'
    },
    user: {
        email: 'email@mail.com',
        image: 'image',
        password: 'password',
        role: roles.STUDENT,
        active: true,
        activationToken: null,
        _id: '5eda1ad24347916fe8303f88'
    },
    student: {
        _id: '5eefc1435c89c844d40db508',
        studentId: '1234567890',
        name: 'Name',
        user: '5eda1ad24347916fe8303f88'
    },
    genre: {
        _id: '5eefc1435c89c844d40db508',
        name: 'genre'
    },
    department: {
        _id: '5eefc1435c89c844d40db508',
        name: 'department',
        address: 'address'
    },
    book: {
        _id: '5eefc1435c89c844d40db508',
        isbn: 'isbn',
        quantity: 1,
        title: 'title',
        year: 2000,
        description: 'description',
        image: 'image',
        language: 'en',
        department: '5eefc1435c89c844d40db508',
        author: '5eefc1435c89c844d40db508',
        genres: [
            {
                _id: '5eefc1435c89c844d40db508',
                genre: '5eefc1435c89c844d40db508'
            }
        ]
    }
};
