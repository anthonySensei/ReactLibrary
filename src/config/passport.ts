import { Request } from 'express';
import { Strategy as LocalStrategy } from 'passport-local';
import passportJWT from 'passport-jwt';

import errorMessages from '../constants/errorMessages';
import fields from '../constants/passportFields';

import { IUser } from '../models/user';

const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

export default function (passport: any, User: any) {
    passport.use(
        new LocalStrategy(
            {
                usernameField: fields.EMAIL,
                passwordField: fields.PASSWORD,
                passReqToCallback: true
            },
            async (req: Request, email: string, password: string, done) => {
                try {
                    const user: IUser = await User.findOne({ email: email });
                    if (!user)
                        return done(
                            errorMessages.WRONG_PASSWORD_OR_EMAIL,
                            false
                        );
                    if (!user.active)
                        return done(errorMessages.NOT_ACTIVE, false);
                    const isPasswordMatched = await user.comparePassword(
                        password
                    );
                    if (isPasswordMatched) {
                        return done(null, user);
                    } else {
                        return done(
                            errorMessages.WRONG_PASSWORD_OR_EMAIL,
                            false
                        );
                    }
                } catch (err) {
                    return done(errorMessages.SOMETHING_WENT_WRONG, false);
                }
            }
        )
    );

    passport.use(
        new JWTStrategy(
            {
                jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
                secretOrKey: process.env.SECRET_KEY
            },
            async (jwtPayload, cb) => {
                try {
                    const user = await User.findById(jwtPayload.id);
                    return cb(null, user);
                } catch (err) {
                    return cb(err);
                }
            }
        )
    );

    passport.serializeUser((user: IUser, done: any) => done(null, user.id));

    passport.deserializeUser((id: string, done: any) => {
        try {
            const user: IUser = User.findById(id);
            done(null, user);
        } catch (err) {
            done(err);
        }
    });
}
