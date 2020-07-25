import axios from '../helper/axios';

import { GRAPHQL_URL } from '../constants/serverLinks';
import Author from '../interfaces/Author';

export const getAuthorsService = async () => {
    const graphqlQuery = {
        query: `
         {
            authors {
                _id
                name
                country
            }
        }
          `
    };
    return await axios.post(GRAPHQL_URL, JSON.stringify(graphqlQuery), {
        headers: {
            'Content-Type': 'application/json'
        }
    });
};

export const addAuthorService = async (author: Author) => {
    const graphqlQuery = {
        query: `
         mutation AddNewAuthor($name: String!, $country: String!){
            addAuthor(authorInput: {name: $name, country: $country})
        }
          `,
        variables: { ...author }
    };
    return await axios.post(GRAPHQL_URL, JSON.stringify(graphqlQuery), {
        headers: {
            'Content-Type': 'application/json'
        }
    });
};

export const updateAuthorService = async (author: Author) => {
    const graphqlQuery = {
        query: `
         mutation UpdateAuthor($_id: ID!, $name: String!, $country: String!){
            updateAuthor(id: $_id, authorInput: {name: $name, country: $country})
        }
          `,
        variables: { ...author }
    };
    return await axios.post(GRAPHQL_URL, JSON.stringify(graphqlQuery), {
        headers: {
            'Content-Type': 'application/json'
        }
    });
};

export const deleteAuthorService = async (authorId: string) => {
    const graphqlQuery = {
        query: `
         mutation DeleteAuthor($authorId: ID!){
            deleteAuthor(id: $authorId)
        }
          `,
        variables: { authorId }
    };
    return await axios.post(GRAPHQL_URL, JSON.stringify(graphqlQuery), {
        headers: {
            'Content-Type': 'application/json'
        }
    });
};
