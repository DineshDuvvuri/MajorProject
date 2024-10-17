const express = require("express");
const router = express.Router();
const User = require("../models/user");
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");

router.get("/signup",(req,res)=>{
    res.render("users/signup.ejs");
});


router.post(
    "/signup",
    wrapAsync(async(req,res)=>{
    try{
        let{username,email,password} = req.body;
        const newUser = new User({email,username});
        const registerUser =await User.register(newUser,password);
        console.log(registerUser);
        req.flash("success","Welcome to WanderLust");
        res.redirect("/listings");
    }catch(error){
        req.flash("error",error.message);
        res.redirect("/signup");
    }
    })
);

router.get("/login",(req,res)=>{
    res.render("users/login.ejs");
});


router.post("/login",
    passport.authenticate("local", {  //this always comes as a middleware directly copied form npm passport >> register
        failureRedirect: "/login",
        failureFlash:true//it will flash the error message
    }),
    async(req, res)=>{
        req.flash("success","successfully login, Welcome back to WanderLust");
        res.redirect("/listings");
    }
);

module.exports = router;