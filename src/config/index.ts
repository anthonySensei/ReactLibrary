import bunyan from 'bunyan';

const loggers = {
    development: () =>
        bunyan.createLogger({ name: 'development', level: 'debug' }),
    production: () =>
        bunyan.createLogger({ name: 'production', level: 'info' }),
    test: () => bunyan.createLogger({ name: 'test', level: 'fatal' })
};

export default (environment: string) => {
    switch (environment) {
        case 'development':
            return {
                log: loggers.development,
                database: process.env.DEVELOPMENT_DB_URL as string
            };
        case 'production':
            return {
                log: loggers.production,
                database: process.env.PRODUCTION_DB_URL as string
            };
        case 'test':
            return {
                log: loggers.production,
                database: process.env.PRODUCTION_DB_URL as string
            };
    }
};
