const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ArticleSchema = new Schema({
  title: { type: String },
  description: { type: String },
  content: { type: String },
  pub_date: { type: Date },
  imgUrl: { type: String },
  link: { type: String },
  league: { type: String },
  jabs: { type: Number },
  comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }]
});

const Article = mongoose.model("Article", ArticleSchema);

module.exports = Article;
