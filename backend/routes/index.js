
const express = require('express');
const passport = require('passport');
const cookieSession = require('cookie-session');
const router = express.Router()
require('../passport');


//Unprotected Routes
router.get('/', (req, res) => {
  res.send('<h1>Home</h1>')
});

router.get('/failed', (req, res) => {
  res.send('<h1>Log in Failed :(</h1>')
});

// Middleware - Check user is Logged in
const checkUserLoggedIn = (req, res, next) => {
  req.user ? next(): res.sendStatus(401);
}

// //Protected Route.
// router.get('/profile', checkUserLoggedIn, (req, res) => {
//   res.send(`<h1>${req.user.displayName}'s Profile Page</h1>`)
// });

// Auth Routes
router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// router.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/failed' }),
//   function(req, res) {
//    // res.redirect('/profile');
//   }
// );

//Logout
router.get('/logout', (req, res) => {
    req.session = null;
    req.logout();
    res.redirect('http://localhost:3000')
    
})

module.exports = router