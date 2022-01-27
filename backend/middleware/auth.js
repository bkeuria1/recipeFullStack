module.exports = {
    ensureAuth: function (req, res, next) {
      if (req.isAuthenticated()) {
        console.log("Is  authenticated")
        return next()
      } else {
        console.log("Not Authenticated")
        res.status(400)
        res.send()
        
      
      }
    }
}