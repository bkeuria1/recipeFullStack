
const express = require('express');
const passport = require('passport');
const router = express.Router()
require('../passport.js')

const {ensureAuth} = require('../middleware/auth')


router.get('/failed', ensureAuth,(req, res) => {
  res.send('<h1>Log in Failed :(</h1>')
});

router.get('/loggedIn', ensureAuth,(req,res)=>{
  res.send({result: req.isAuthenticated(), name: req.user.firstName})
})


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
  
//Logout
router.get('/logout', ensureAuth, (req, res) => {
  try{
    console.log(req.isAuthenticated())
    console.log(req.session)
    console.log(req.user)
    req.logout();
    res.redirect('http://google.com')
  }
  catch(err){
    res.redirect('http://localhost:3000')
  }
    
})

module.exports = router