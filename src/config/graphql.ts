import { GraphQLError } from 'graphql';

import graphqlSchema from '../graphql/schema';
import graphqlResolver from '../graphql/resolvers';

export default {
    schema: graphqlSchema,
    rootValue: graphqlResolver,
    graphiql: true,
    customFormatErrorFn(err: GraphQLError) {
        if (!err.originalError) {
            return err;
        }
        const message = err.message || 'An error occurred.';
        return { message };
    }
};
