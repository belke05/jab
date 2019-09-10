var cron = require("node-cron");
// require("dotenv").config();
// require("./mongodb");
const APIArticle = require("./../api/articles");
const Articles = require("../models/articles");
let res = [];
const urls = 15;
const sports = ["mma", "boxing", "judo", "kickboxing", "jiujitsu"];

sports.forEach(sport => {
  const nytimes = `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${sport}&api-key=4QfmZEltdy9SctdsAPAjOEiMI7Ce8Elj`;
  let gnews;
  if ((sport = "mma")) {
    gnews = `https://gnews.io/api/v3/search?q=${sport} fight&token=4cf35dfe28b22cb28f463edfeefbc672`;
  } else {
    gnews = `https://gnews.io/api/v3/search?q=${sport}&token=4cf35dfe28b22cb28f463edfeefbc672`;
  }

  const newsApi = `https://newsapi.org/v2/everything?q=${sport}&apiKey=537b32f4c8894d2b8cf98f3b990d3e3f`;
  APIArticle.getArticles(nytimes, sport, getAsyncResult);
  APIArticle.getArticles(newsApi, sport, getAsyncResult);
  APIArticle.getArticles(gnews, sport, getAsyncResult);
});

// // urls
// const nytimes =
//   "https://api.nytimes.com/svc/search/v2/articlesearch.json?q=mma&api-key=4QfmZEltdy9SctdsAPAjOEiMI7Ce8Elj";
// const gnews =
//   "https://gnews.io/api/v3/search?q=mma&token=4cf35dfe28b22cb28f463edfeefbc672";
// const newsApi =
//   "https://newsapi.org/v2/everything?q=mma&apiKey=537b32f4c8894d2b8cf98f3b990d3e3f";

// APIArticle.getArticles(nytimes, getAsyncResult);
// APIArticle.getArticles(newsApi, getAsyncResult);
// APIArticle.getArticles(gnews, getAsyncResult);

// var task = cron.schedule(
//   "0 * * * *",
//   () => {
//     console.log("run the job every minute");
//     res = [];
//     APIArticle.getArticles(nytimes, getAsyncResult);
//     APIArticle.getArticles(newsApi, getAsyncResult);
//     APIArticle.getArticles(gnews, getAsyncResult);
//   },
//   {
//     scheduled: true,
//     timezone: "Europe/Paris"
//   }
// );

// task.start();
// "* 0,4,12 * * *" "run the job at midnight 4 and 12"
// APIArticle.getArticles(nytimes, getAsyncResult);
// APIArticle.getArticles(newsApi, getAsyncResult);
// APIArticle.getArticles(gnews, getAsyncResult);

function getAsyncResult(data) {
  // console.log(data);

  res.push(data);
  console.log("res length", res.length);
  if (res.length === urls) {
    res.forEach(apiRes => {
      // console.log(apiRes);
      apiRes.forEach(art => {
        console.log(art, "-----------article");
        Articles.findOne({ title: art.title })
          .then(dbRes => {
            if (dbRes) {
              console.log("exists already", dbRes);
            } else {
              Articles.create(art)
                .then(response => {
                  console.log("article created", response);
                })
                .catch(dbErr => {
                  console.log("error adding article");
                });
            }
          })
          .catch(dbErr => {
            console.log(dbErr);
          });
      });
      // Articles.insertMany(apiRes)
      //   .then(dbRes => {
      //     console.log("results of one api call added", dbRes);
      //   })
      //   .catch(dbErr => {
      //     console.log("errror while adding one api result", dbErr);
      //   });
    });
  }
}
