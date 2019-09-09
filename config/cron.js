var cron = require("node-cron");
require("dotenv").config();
require("./mongodb");
const APIArticle = require("./../api/articles");
const Articles = require("../models/articles");
const res = [];
const urls = 3;

// urls
const nytimes =
  "https://api.nytimes.com/svc/search/v2/articlesearch.json?q=mma&api-key=4QfmZEltdy9SctdsAPAjOEiMI7Ce8Elj";
const gnews =
  "https://gnews.io/api/v3/search?q=mma&token=4cf35dfe28b22cb28f463edfeefbc672";
const newsApi =
  "https://newsapi.org/v2/everything?q=mma&apiKey=537b32f4c8894d2b8cf98f3b990d3e3f";

// cron.schedule("1,2,4,5 * * * *", () => {
//   console.log("running every minute 1, 2, 4 and 5");
//   APIArticle.getArticles("urlA", getAsyncResult);
//   APIArticle.getArticles("urlA", getAsyncResult);
//   APIArticle.getArticles("urlA", getAsyncResult);
// });

APIArticle.getArticles(nytimes, getAsyncResult);
APIArticle.getArticles(newsApi, getAsyncResult);
APIArticle.getArticles(gnews, getAsyncResult);

function getAsyncResult(data) {
  // console.log(data);

  res.push(data);
  console.log("res length", res.length);
  if (res.length === 3) {
    console.log("herheheheh");
    res.forEach(apiRes => {
      Articles.insertMany(apiRes)
        .then(dbRes => {
          console.log("results of one api call added", dbRes);
        })
        .catch(dbErr => {
          console.log("errror while adding one api result", dbErr);
        });
    });
  }
}
