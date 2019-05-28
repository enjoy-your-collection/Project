const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const discographySchema = new Schema({
    releases: [{
        title: String,
        year: Number,
        idRelease: { type: Number, unique: true }
    }],
    idArtist: { type: Number, unique: true }
}, {
    timestamps: {
        createdAt: "created_at",
        updatedAt: "updated_at"
    }
});

const Discography = mongoose.model("Discography", discographySchema);
module.exports = Discography;