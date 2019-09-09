const axios = require("axios");
const Articles = require("../models/articles");

function getArticles(url, clbk) {
  console.log("here");
  axios
    .get(url)
    .then(res => clbk(formatter(res.data, url)))
    .catch(err => console.log(err));
}

function formatter(data, url) {
  if (url.includes("nytimes")) {
    console.log("ny times call");
    return formatResultNyTimes(data);
  } else if (url.includes("gnews")) {
    console.log("gnews called");
    return formatResultgnews(data);
  } else if (url.includes("newsapi")) {
    console.log("newsapi called");
    return formatResultnewsapi(data);
  }
}

// perform necessary data manipulation
function formatResultNyTimes(data) {
  let article_array = [];
  let non_empty_articles;
  let article_obj = data.response.docs;
  article_obj.forEach(art => {
    let new_art = {};
    // make sure we only get sports articles
    if (art.section_name == "Sports") {
      let imagelink = "";
      if (art.multimedia !== [] && art.multimedia[0] !== undefined) {
        imagelink = "https://static01.nyt.com/" + art.multimedia[0].url;
      }
      new_art.imgUrl = imagelink;
      new_art.title = art.headline.main;
      new_art.description = art.abstract;
      new_art.link = art.web_url;
      new_art.league = "ufc";
      var d = new Date(`${art.pub_date}`);
      new_art.pub_date = d;
    }
    if (new_art.length !== 0) {
      article_array.push(new_art);
    }
  });
  non_empty_articles = article_array.filter(
    value => JSON.stringify(value) !== "{}"
  );
  // console.log(non_empty_articles);
  return non_empty_articles;
}

// perform necessary data manipulation
function formatResultgnews(data) {
  // console.log(data);
  let article_array = [];
  let non_empty_articles;
  let article_obj = data.articles;
  article_obj.forEach(art => {
    let new_art = {};
    art.image !== null ? (new_art.imgUrl = "") : (new_art.imgUrl = art.image);
    new_art.title = art.title;
    new_art.description = art.description;
    new_art.link = art.url;
    new_art.league = "ufc";
    var d = new Date(`${art.publishedAt}`);
    new_art.pub_date = d;
    if (new_art.length !== 0) {
      article_array.push(new_art);
    }
  });
  non_empty_articles = article_array.filter(
    value => JSON.stringify(value) !== "{}"
  );
  // console.log(non_empty_articles);
  return non_empty_articles;
}

// perform necessary data manipulation
function formatResultnewsapi(data) {
  let article_array = [];
  let non_empty_articles;
  let article_obj = data.articles;
  article_obj.forEach(art => {
    let new_art = {};
    let imagelink = "";
    if (imagelink) {
      imagelink = art.urlToImage;
    }
    new_art.imgUrl = art.urlToImage;
    new_art.title = art.title;
    new_art.description = art.description;
    new_art.content = art.content;
    new_art.link = art.url;
    new_art.league = "ufc";
    var d = new Date(`${art.publishedAt}`);
    new_art.pub_date = d;
    if (new_art.length !== 0) {
      article_array.push(new_art);
    }
  });
  non_empty_articles = article_array.filter(
    value => JSON.stringify(value) !== "{}"
  );
  // console.log(non_empty_articles);
  return non_empty_articles;
}

module.exports = { getArticles };
