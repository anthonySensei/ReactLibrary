const bCrypt = require('bcryptjs');

const passportJWT = require('passport-jwt');

const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

const errorMessages = require('../constants/errorMessages');
const fields = require('../constants/passportFields');
const secret_key = require('./secret_key');

module.exports = (passport, User) => {
    const LocalStrategy = require('passport-local').Strategy;

    passport.use(
        new LocalStrategy(
            {
                usernameField: fields.EMAIL,
                passwordField: fields.PASSWORD,
                passReqToCallback: true
            },
            async (req, email, password, done) => {
                const isValidPassword = (userPass, password) => {
                    return bCrypt.compareSync(password, userPass);
                };
                try {
                    const user = await User.findOne({ email: email });
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
                secretOrKey: secret_key
            },
            (jwtPayload, cb) => {
                return User.findOne({ _id: jwtPayload.id })
                    .then(user => {
                        return cb(null, user);
                    })
                    .catch(err => {
                        return cb(err);
                    });
            }
        )
    );

    passport.serializeUser((auth, done) => {
        done(null, auth.id);
    });

    passport.deserializeUser((id, done) => {
        try {
            const user = User.findOne({ _id: id });
            if (user) {
                done(null, user);
            } else {
                done(user.errors, null);
            }
        } catch (e) {
            done('Error', null);
        }
    });
};
