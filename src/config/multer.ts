import multer from 'multer';
import uuid from 'uuid';

const imageStorage = multer.diskStorage({
    destination: (req: any, file: any, cb: any) => {
        cb(null, 'images');
    },

    filename: function (req: any, file: any, cb: any) {
        let extension = file.originalname.split('.').pop();
        cb(null, uuid.v4() + '.' + extension);
    }
});

const fileFilter = (req: any, file: any, cb: any) => {
    if (
        file.mimetype === 'image/png' ||
        file.mimetype === 'image/jpg' ||
        file.mimetype === 'image/jpeg'
    ) {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

export default {
    limits: { fieldSize: 5 * 1024 * 1024 },
    storage: imageStorage,
    fileFilter
};
