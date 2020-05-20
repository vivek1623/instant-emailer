const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy

const User = require('../models/users')

//passport. serializerUser will execute after passport.use strategy callback
passport.serializeUser((user, next) => {
  console.log('user', user)
  next(null, user._id)
})

passport.deserializeUser(async (userId, next) => {
  try {
    user = await User.findById(userId)
    if (!user)
      throw new Error('user not found')
    next(null, user)
  } catch (e) {
    console.log('error', e)
  }
})

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: "/auth/google/callback",
  proxy: true
}, async (authToken, refreshToken, profile, next) => {
  try {
    const user = await User.findOne({ googleId: profile.id })
    if (!user) {
      const newUser = new User({
        googleId: profile.id,
        name: profile.displayName
      })
      newUser.save()
      next(null, newUser)
    } else {
      next(null, user)
    }
  } catch (e) {
    // next(e, null)
  }
}))
