export default {
    swaggerDefinition: {
        info: {
            title: 'ReactLibrary API',
            description: 'ReactLibrary API information',
            version: '1.0.0'
        },
        host: (process.env.SERVER as string) || 'localhost:3001',
        basePath: '/api/'
    },
    apis: ['src/routes/*.ts', 'src/swagger/*.ts']
};
