const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const artistSchema = new Schema({
    name: String,
    profile: String,
    members: [{
        name: String,
        active: Boolean
    }],
    idArtist: { type: Number, unique: true, },
    image_url: String
}, {
    timestamps: {
        createdAt: "created_at",
        updatedAt: "updated_at"
    }
});

const Artist = mongoose.model("Artist", artistSchema);
module.exports = Artist;