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
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
});

module.exports = mongoose.model("List", listSchema);
