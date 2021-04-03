
const LocalStrategy = require('passport-local').Strategy
// const bcrypt = require('bcrypt')

function initialize(passport,  getAdminByName, getAdminById) {
  const authenticateUser = async ( uname, psw, done) => {;
    const admin = getAdminByName( uname)
    if (admin == null) {
      return done(null, false, { message: 'No admin with that name' })
    }

    try {
      if ( psw === admin.psw ) {
        return done(null, admin )
      } else {
        return done(null, false, { message: 'Password incorrect' })
      }
    } catch (e) {
      return done(e)
    }
  }

  passport.use(new LocalStrategy({ usernameField: 'uname', passwordField:"psw" }, authenticateUser))
  passport.serializeUser((admin, done) => done(null, admin.id))
  passport.deserializeUser((id, done) => { 
      return done(null, getAdminById(id))
   })

}

module.exports = initialize