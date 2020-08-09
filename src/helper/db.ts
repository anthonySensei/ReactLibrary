import mongoose from 'mongoose';

export const connectDb = (databaseUrl: string) => {
    return mongoose.connect(databaseUrl, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    });
};
