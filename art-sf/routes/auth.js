var express = require('express');
var router = express.Router();

var isAuthenticated = function (req, res, next) {
	// if user is authenticated in the session, call the next() to call the next request handler 
	// Passport adds this method to request object. A middleware is allowed to add properties to
	// request and response objects
	if (req.isAuthenticated())
		return next();
	// if the user is not authenticated then redirect him to the login page
	res.redirect('/auth');
}

module.exports = function(passport){
	/* GET login page. */
	router.get('/', function(req, res) {
    	// Display the Login page with any flash message, if any
		res.render('auth', { message: req.flash('message') });
	});

	/* Handle Login POST */
	router.post('/login', passport.authenticate('login', {
		successRedirect: '/auth/home',
		failureRedirect: '/auth/login',
		failureFlash : true  
	}));

	/* GET Registration Page */
	router.get('/signup', function(req, res){
		res.render('register',{message: req.flash('message')});
	});

	/* Handle Registration POST */
	router.post('/signup', passport.authenticate('signup', {
		successRedirect: '/auth/home',
		failureRedirect: '/auth/signup',
		failureFlash : true  
	}));

	/* GET Home Page */
	router.get('/home', isAuthenticated, function(req, res){
		res.render('home', { user: req.user });
	});

	/* Handle Logout */
	router.get('/auth/signout', function(req, res) {
		req.logout();
		res.redirect('/auth');
	});
	
	router.get('/login/facebook', 
  		passport.authenticate('facebook', { scope : 'email' }
	));
 
// handle the callback after facebook has authenticated the user
	router.get('/login/facebook/callback',
  		passport.authenticate('facebook', {
    		successRedirect : '/auth/home',
    		failureRedirect : '/auth'
  		})
	);
	
	router.get('/login/linkedin', 
  		passport.authenticate('linkedin'));
 
// handle the callback after facebook has authenticated the user
	router.get('/login/linkedin/callback',
  		passport.authenticate('linkedin', {
    		successRedirect : '/auth/home',
    		failureRedirect : '/auth'
  		})
	);
  	
	return router;
}