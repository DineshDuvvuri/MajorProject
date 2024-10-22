const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const { savedRedirectUrl } = require("../middleware.js");
const userController = require("../controllers/users.js");

router
  .route("/signup")
  .get(wrapAsync(userController.renderSignUpForm))
  .post(wrapAsync(userController.signup));

router
  .route("/login")
  .get(wrapAsync(userController.renderLoginForm))
  .post(
    savedRedirectUrl,
    passport.authenticate("local", {
      failureRedirect: '/login',
      failureFlash: true
    }), 
    userController.login  // No need to wrap with wrapAsync
  );

// Logout route
router.get("/logout", userController.logout);

module.exports = router;
