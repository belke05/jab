const axios = require("axios");

function getArticles(url, clbk) {
  console.log("here");
  axios
    .get(url)
    .then(data => clbk(formatter(data, url)))
    .catch(err => console.log(err));
}

function formatter(data, url) {
  if (url.includes("nytimes")) {
    return formatResultNyTimes(data);
  } else if (url.includes("gnews")) {
    return formatResultgnews(data);
  } else if (url.includes("newsapi")) {
    return formatResultnewsapi(data);
  }
}

// perform necessary data manipulation
function formatResultNyTimes(data) {
  return "processed-data a";
}

// perform necessary data manipulation
function formatResultgnews(data) {
  return "processed-data b";
}

// perform necessary data manipulation
function formatResultnewsapi(data) {
  return "processed-data b";
}

module.exports = { getArticles };
