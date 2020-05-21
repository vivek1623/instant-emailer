const express = require('express')
const passport = require('passport')

const router = new express.Router()

router.get("/auth/google",
  passport.authenticate("google", {
    scope: ['profile', 'email']
  })
)

router.get('/auth/google/callback', passport.authenticate('google'), (req, res) => {
  // Successful authentication, redirect home.
  res.redirect('/surveys');
})

router.get('/api/user', (req, res) => {
  res.send(req.user)
})

router.get('/auth/logout', (req, res) => {
  req.logout()
  res.redirect('/')
})

module.exports = router