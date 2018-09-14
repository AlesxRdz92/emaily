const passport = require('passport');
const { Strategy } = require('passport-google-oauth20');
const keys = require('../config/keys');

passport.use(new Strategy({
	clientID: keys.googleClientID,
	clientSecret: keys.googleClientSecret,
	callbackURL: '/auth/google/callback'
}, (accessToken, refreshToken, profile, done) => {
	console.log(accessToken);
	console.log('refresh', refreshToken);
	console.log('profile', profile);
}));