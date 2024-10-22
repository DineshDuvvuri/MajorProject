const Review = require("../models/review.js");
const Listing = require("../models/listing.js") 

module.exports.createReview = async (req, res) => {
    try {
        let listing = await Listing.findById(req.params.id);
        let newReview = new Review(req.body.review);
        newReview.author = req.user._id; // Assuming you have authentication middleware to set `req.user`

        listing.reviews.push(newReview);

        await newReview.save();
        await listing.save();
        
        req.flash("success", "New review added!");
        res.redirect(`/listings/${listing._id}`);
    } catch (err) {
        console.error(err);
        req.flash("error", "Failed to add new review");
        res.redirect(`/listings/${req.params.id}`);
    }
};


module.exports.deleteReview = async (req, res) => {
    try {
        let { id, reviewId } = req.params;
        await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
        await Review.findByIdAndDelete(reviewId);
        
        req.flash("success", "Review deleted!");
        res.redirect(`/listings/${id}`);
    } catch (err) {
        console.error(err);
        req.flash("error", "Failed to delete review");
        res.redirect(`/listings/${req.params.id}`);
    }
};
