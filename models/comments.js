const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var CommentsSchema = new Schema({
  content: String,
  created_at: { type: Date, required: true, default: Date.now },
  postedBy: {
    type: mongoose.Schema.ObjectId,
    ref: "User"
  },
  onArticle: [{ type: Schema.Types.ObjectId, ref: "Article" }]
});

const Comment = mongoose.model("Comment", CommentsSchema);

module.exports = Comment;
