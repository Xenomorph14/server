module.exports = (req, res, next) => {
    if (req.session) {
        // delete session object
        req.session.destroy(function(err) {
          if(err) {
            return next(err);
          } else {
            return res.redirect('/admin/login');
          }
        });
      }
}