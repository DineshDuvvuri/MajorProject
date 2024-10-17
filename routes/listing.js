const express = require("express");
const router = express.Router(); //jevha file require karaychi asel tevha aasel tevha "./fileLocation" use karata (inshort jithe moduleexport use karto tithe "./" use karaych)
const wrapAsync = require("../utils/wrapAsync.js"); //here we are using ".." bcoz we are going in parent directory
const ExpressError = require("../utils/ExpressError.js");
const {listingSchema, reviewSchema} = require("../schema.js");
const Listing = require("../models/listing.js");
const { isLoggedIn } = require("../middleware.js");

const validateListing = (req,res,next)=>{
    let {error} = listingSchema.validate(req.body);
  
    if(error){
      let errMsg = error.details.map((el)=>el.message).join(",");
      throw new ExpressError(400,errMsg);
    } else{
      next();
    }
};


//Index Route
router.get(
    "/", 
    wrapAsync(async (req, res) => {
    const allListings = await Listing.find({});
    res.render("listings/index.ejs", { allListings });
  })
);
  
  //New Route
  router.get("/new", isLoggedIn, (req, res) => {
    req.flash("success","You suuccfully logged-in!");
    res.render("listings/new.ejs");
  });
  
  //Show Route
  router.get(
    "/:id", 
    wrapAsync(async (req, res) => {
    let { id } = req.params;
      const listing = await Listing.findById(id).populate("reviews");
      res.render("listings/show.ejs", { listing });
    })
  );
  
  //Create Route
  router.post(
    "/", 
    isLoggedIn,
    validateListing,
    wrapAsync(async(req, res,next) => {
      const newListing = new Listing(req.body.listing);
      await newListing.save();
      req.flash("success","New listing Created!");
      res.redirect("/listings");
    })
  );
  
  //Edit Route
  router.get("/:id/edit", isLoggedIn, wrapAsync(async (req, res) => {
    let { id } = req.params;
      const listing = await Listing.findById(id);
      res.render("listings/edit.ejs", { listing });
    })
  );
  
  //Update Route
  router.put(
    "/:id", 
    isLoggedIn,
    validateListing,
    wrapAsync(async (req, res) => {
    let { id } = req.params;
    await Listing.findByIdAndUpdate(id, { ...req.body.listing });
    req.flash("success","Listing Updated!");
    res.redirect(`/listings/${id}`);
  }));
  
  //Delete Route
  router.delete("/:id", wrapAsync(async (req, res) => {
    let { id } = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
    req.flash("success","Listing deleted");
    res.redirect("/listings");
  })
);

module.exports = router;