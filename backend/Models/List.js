const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let listSchema = new Schema({
  title: {
    type: String,
    minLength: 1,
    required: true,
  },
  cards: [
    {
      description: { type: String },
    },
  ],
});

module.exports = mongoose.model("List", listSchema);
