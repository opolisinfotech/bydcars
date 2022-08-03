exports.isAuthenticated = function(req, res, next){   
    if (req.session.loggedin) next()
    else next('route')
}