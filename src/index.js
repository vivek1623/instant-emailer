const express = require('express')
const cookieSession = require('cookie-session')
const passport = require('passport')

require('./db/mongoose') // order of import important
require('./services/passport')
const authRouter = require('./routes/auth')

const app = express()

//===============================
// middleware added
//any request will pass through it
// first it will go to cookieSession. cookieSession will extract cookie data
//passport will pull out userId out of cookie data
//deseializeUser will called to get user from userId

app.use(cookieSession({
  maxAge: 30 * 24 * 60 * 60 * 1000,
  keys: [process.env.COOKIE_KEY]
}))
app.use(passport.initialize())
app.use(passport.session())

//===============================

app.use(authRouter)

app.listen(process.env.PORT, () => {
  console.log(`server is up on port ${process.env.PORT}`)
})