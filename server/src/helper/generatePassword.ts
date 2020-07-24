import bcrypt from 'bcryptjs';

const lengthOfGeneratedPassword: number = 8;

export const cryptPassword = (password: string): string => {
    const salt = bcrypt.genSaltSync(lengthOfGeneratedPassword);
    return bcrypt.hashSync(password, salt);
};
