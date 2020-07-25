import { buildSchema } from 'graphql';

export default buildSchema(`
    type Author {
        _id: ID!
        name: String!
        country: String!
    }

    input AuthorInputData {
        name: String!
        country: String!
    }

    type RootQuery {
        authors: [Author]!
    }

    type RootMutation {
        addAuthor(authorInput: AuthorInputData): String!
        updateAuthor(id: ID!, authorInput: AuthorInputData): String!
        deleteAuthor(id: ID!): String!
    }

    schema {
        query: RootQuery
        mutation: RootMutation
    }
`);
