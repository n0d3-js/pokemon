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
