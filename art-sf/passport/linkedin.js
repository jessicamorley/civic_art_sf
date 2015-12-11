var LinkedInStrategy = require('passport-linkedin').Strategy;
var User = require('../models/user');


module.exports = function(passport) {
//sorry i wont give out my linkedin user info because I don't want a scraper bot to find it on github
    passport.use('linkedin', new LinkedInStrategy({
        clientID        : "APP_ID",
        clientSecret    : "SECRET_APP_ID",
        callbackURL     : "https://civic-art-sf-jkmorley.c9.io/auth/login/linkedin/callback"
    },
    
    // facebook will send back the tokens and profile
    function(access_token, refresh_token, profile, done) {

    	console.log('profile', profile);

		// asynchronous
		process.nextTick(function() {

			// find the user in the database based on their facebook id
	        User.findOne({ 'id' : profile.id }, function(err, user) {

	        	// if there is an error, stop everything and return that
	        	// ie an error connecting to the database
	            if (err)
	                return done(err);

				// if the user is found, then log them in
	            if (user) {
	                return done(null, user); // user found, return that user
	            } else {
	                // if there is no user found with that facebook id, create them
	                var newUser = new User();
					// set all of the facebook information in our user model
	                newUser.id    = profile.id; // set the users facebook id	                
	                newUser.access_token = access_token; // we will save the token that facebook provides to the user	                
	                newUser.firstName  = profile.displayName;
	                newUser.lastName = profile.displayName; // look at the passport user profile to see how names are returned
	                newUser.email = profile.displayName; // facebook can return multiple emails so we'll take the first
                    newUser.Username = profile.displayName;
                    
					// save our user to the database
	                newUser.save(function(err) {
	                    if (err)
	                        throw err;

	                    // if successful, return the new user
	                    return done(null, newUser);
	                });
	            }

	        });
        });

    }));

};