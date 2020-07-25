import { Request } from 'express';
import { Strategy as LocalStrategy } from 'passport-local';
import bCrypt from 'bcryptjs';
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
                const isValidPassword = (
                    userPass: string,
                    password: string
                ) => {
                    return bCrypt.compareSync(password, userPass);
                };
                try {
                    const user: IUser = await User.findOne({ email: email });
                    if (!user || !isValidPassword(user.password, password)) {
                        return done(
                            errorMessages.WRONG_PASSWORD_OR_EMAIL,
                            false
                        );
                    } else if (!user.active) {
                        return done(errorMessages.NOT_ACTIVE, false);
                    } else if (isValidPassword(user.password, password)) {
                        return done(null, {
                            _id: user._id,
                            email: user.email,
                            image: user.image,
                            role: user.role
                        });
                    } else {
                        return done(errorMessages.SOMETHING_WENT_WRONG, false);
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
            (jwtPayload, cb) => {
                return User.findOne({ _id: jwtPayload.id })
                    .then((user: IUser) => {
                        return cb(null, user);
                    })
                    .catch((err: any) => {
                        return cb(err);
                    });
            }
        )
    );

    passport.serializeUser((auth: any, done: any) => {
        done(null, auth.id);
    });

    passport.deserializeUser((id: string, done: any) => {
        try {
            const user: IUser = User.findOne({ _id: id });
            if (user) {
                done(null, user);
            } else {
                done('Error', null);
            }
        } catch (e) {
            done('Error', null);
        }
    });
}
