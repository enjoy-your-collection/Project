const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
    title: String,
    rating: { type: Number, min: 1, max: 10 },
    description: String,
    idAlbum: Number
}, {
    timestamps: {
        createdAt: "created_at",
        updatedAt: "updated_at"
    }
});

const Review = mongoose.model('Review', reviewSchema);
module.exports = Review;