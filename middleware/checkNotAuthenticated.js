function checkNotAuthenticated (req, res, next) {
    if (req.isAuthenticated()) {
        return res.redirect("/admin/createUser")
    }
    next()
}

module.exports = checkNotAuthenticated