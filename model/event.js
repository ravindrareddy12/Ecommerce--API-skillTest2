const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  name: { type: String, required: true },
  files: {
    image: { type: String }
  },
  tagline: { type: String },
  schedule: { type: Date },
  description: { type: String },
  moderator: { type: String },
  category: { type: String },
  sub_category: { type: String },
  rigor_rank: { type: Number }
});

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;
