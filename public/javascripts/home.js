import Axios from "axios";

const images = document.querySelectorAll("img");
const article_like_btn = document.querySelectorAll("article interact like_btn");

for (let i = 0; i < images.length; i++) {
  if (images[i].currentSrc == "") {
    images[i].hidden = true;
  }
}

function addLikes(evt) {
  const btn = evt.target;
  Axios.post({})
    .then()
    .catch();
}

article_like_btn.onclick = addLikes;
