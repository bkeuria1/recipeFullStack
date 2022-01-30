
const express = require('express');
const passport = require('passport');
const cookieSession = require('cookie-session');
const router = express.Router()
require('../passport.js')

const {ensureAuth} = require('../middleware/auth')



router.get('/failed', (req, res) => {
  res.send('<h1>Log in Failed :(</h1>')
});


router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] })
)

router.get('/auth/google/callback', passport.authenticate('google'
, { 
  failureRedirect: '/failed' }
),(req,res)=>{
 
    console.log(req.user)
    console.log(req.session)
    res.redirect("http://localhost:3000");
  
   
})
  
// const checkUserLoggedIn = (req, res, next) => {
//   req.user ? next(): res.sendStatus(401);
// }
// // );
// router.get('/profile', checkUserLoggedIn, (req, res) => {
//   res.send(`<h1>${req.user.displayName}'s Profile Page</h1>`)
// });

// Auth Routes


// router.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/failed' }),
//   function(req, res) {
//     res.redirect('/profile');
//   }
// );



//Logout
router.get('/logout', ensureAuth, (req, res) => {
  try{
    console.log(req.isAuthenticated())
    console.log(req.session)
    console.log(req.user)
    req.logout();
    res.redirect('http://localhost:3000')
  }
  catch(err){
    res.redirect('http://localhost:3000')
  }
    
})

module.exports = router