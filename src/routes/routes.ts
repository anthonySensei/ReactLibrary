import { Express } from 'express';
import { graphqlHTTP } from 'express-graphql';

import graphqlConfig from '../config/graphql';
import swaggerOptions from '../config/swagger';

import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

import {
    BookUrls,
    DepartmentUrls,
    GenreUrls,
    LibrarianUrl,
    LoanUrls,
    OrderUrls,
    StudentUrl
} from '../constants/links';

import authRoutes from './auth';
import bookRoutes from './book';
import departmentRoutes from './department';
import genreRoutes from './genre';
import loanRoutes from './loan';
import orderRoutes from './order';
import studentRoutes from './student';
import librarianRoutes from './librarian';

export default (app: Express) => {
    const swaggerSpec = swaggerJSDoc(swaggerOptions);

    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
    app.use('/api/graphql', graphqlHTTP(graphqlConfig));
    app.use('/api', authRoutes);
    app.use(BookUrls.BASE, bookRoutes);
    app.use(DepartmentUrls.BASE, departmentRoutes);
    app.use(GenreUrls.BASE, genreRoutes);
    app.use(LoanUrls.BASE, loanRoutes);
    app.use(OrderUrls.BASE, orderRoutes);
    app.use(StudentUrl.BASE, studentRoutes);
    app.use(LibrarianUrl.BASE, librarianRoutes);
};
