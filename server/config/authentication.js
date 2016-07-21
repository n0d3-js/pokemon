import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import User from '../models/user';

passport.use(new LocalStrategy({
  usernameField: 'email',
},
(email, password, done) => {
  User.findOne({ email }).populate('pokemon').exec((err, user) => {
    if (err) { return done(err); }

    if (!user) {
      return done(null, false);
    }

    if (!user.validPassword(password)) {
      return done(null, false);
    }
    return done(null, user);
  });
}));


import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeader();
opts.secretOrKey = process.env.SECRET;

passport.use(new JwtStrategy(opts, (jwt, done) => {
  User.findById(jwt.sub).populate('pokemon').exec((err, user) => {
    if (err) {
      return done(err, false);
    }

    if (!user) {
      return done(null, false);
    }

    return done(null, user);
  });
}));
