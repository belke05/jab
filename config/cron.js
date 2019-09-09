var cron = require("node-cron");
const APIArticle = require("./../api/articles");
const Articles = require("../models/articles");
const res = [];
const urls = 3;

// urls
const nytimes =
  "https://api.nytimes.com/svc/search/v2/articlesearch.json?q=ufc&api-key=4QfmZEltdy9SctdsAPAjOEiMI7Ce8Elj";
const gnews =
  "https://gnews.pi/io/av3/search?q=boxing&token=4cf35dfe28b22cb28f463edfeefbc672";
const newsApi =
  "https://newsapi.org/v2/everything?q=boxing&apiKey=537b32f4c8894d2b8cf98f3b990d3e3f";

// cron.schedule("1,2,4,5 * * * *", () => {
//   console.log("running every minute 1, 2, 4 and 5");
//   APIArticle.getArticles("urlA", getAsyncResult);
//   APIArticle.getArticles("urlA", getAsyncResult);
//   APIArticle.getArticles("urlA", getAsyncResult);
// });

function getAsyncResult(data) {
  res.push(data);
  if (res.length === urls.length) module.insertMany();
}
