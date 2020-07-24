import mongoose from 'mongoose';

export const connectDb = () => {
    return mongoose.connect(
        `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@reactlibrary-geibi.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        }
    );
};
