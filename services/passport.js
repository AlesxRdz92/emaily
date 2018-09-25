const passport = require('passport');
const { Strategy } = require('passport-google-oauth20');
const mongoose = require('mongoose');
const keys = require('../config/keys');

const User = mongoose.model('users');
passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser((id, done) => {
	User.findById(id).then(user => done(null, user));
});

passport.use(new Strategy({
	clientID: keys.googleClientID,
	clientSecret: keys.googleClientSecret,
	callbackURL: '/auth/google/callback'
}, (accessToken, refreshToken, profile, done) => {
	User.findOne({ googleId: profile.id }).then(user => {
		if (user)
			done(null, user);
		else
			new User({ googleId: profile.id }).save().then(userNew => done(null, userNew));
	}).catch(e => console.log(e));
}));