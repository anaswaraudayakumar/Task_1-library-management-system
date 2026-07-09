const mongoose = require("mongoose");

const authorSchema = mongoose.Schema({
  authorName: {
    type: String,
    uppercase:true,
    required: true,
  },
  biography: {
    type: String,
    required: true,
  },
  nationality: {
    type: String,
    required: true,
  },
});
module.exports= mongoose.model("Author",authorSchema)
