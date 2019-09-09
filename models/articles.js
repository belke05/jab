const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ArticleSchema = new Schema({
  title: { type: String },
  description: { type: String },
  imgUrl: { type: String },
  league: { type: String },
  fight: { type: String },
  jabs: { type: Number },
  comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }]
});

const Article = mongoose.model("Article", ArticleSchema);

module.exports = Article;
