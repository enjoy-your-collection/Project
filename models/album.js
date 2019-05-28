const mongoose = require('mongoose')
const Schema = mongoose.Schema

const albumSchema = new Schema({
  title: String,
  year: Number,
  genres: [String],
  styles: [String],
  tracklist: [{position: String, title: String}],
  artists: [{name: String, id: Number}]
}, {
  timestamps: true
})

module.exports = mongoose.model('Album', albumSchema)