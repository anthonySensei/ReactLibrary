import { connectDb } from '../../helper/db';
import mainConfig from '../../config';

const serverConfig = mainConfig(process.env.NODE_ENV || 'development');
const log = serverConfig!.log();

export const connectTestDb = async () => {
    try {
        await connectDb(serverConfig!.database);
    } catch (err) {
        log.fatal(err);
    }
};

export const logError = (err: string) => {
    return log.fatal(err);
};
