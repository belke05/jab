const article_like_btn = document.querySelectorAll(
  ".article .interact .like_btn"
);
const tags_box = document.querySelectorAll(".tags_li input");
const articles_container = document.querySelector(".articles");
const comment_btns = document.querySelectorAll(".comment_btn");
const articles = document.querySelectorAll(".article");
const inputbox = document.querySelectorAll("input");
const inputicon = document.querySelectorAll(".addCommentIcon");
const userFighter = document.querySelector(".user_gif_div img").alt;
const url = `https://newsapi.org/v2/everything?q=${userFighter}&apiKey=537b32f4c8894d2b8cf98f3b990d3e3f`;
console.log(url);

tags_box.forEach(box => {
  box.onclick = findCategory;
});
inputbox.forEach(input => {
  input.onkeydown = addComment;
});
inputicon.forEach(icon => {
  icon.onclick = addComment;
});

ApiCallFighterArticles();
function ApiCallFighterArticles() {
  axios
    .get(url)
    .then(res => {
      console.log(res);
      const articles = res.data.articles.slice(0, 2);
      appendArticles(articles);
    })
    .catch(err => {
      console.log(err);
    });
}

function appendArticles(articles) {
  let container_figther_articles = document.createElement("div");
  container_figther_articles.className = "fighter_articles";
  container_figther_articles.innerHTML = `<h2 class="article_section_title">Your latest ${userFighter} updates:</h2>`;
  articles.forEach(art => {
    let art_container = document.createElement("div");
    art_container.className = "fighter_article article";
    art_container.innerHTML = `
      <a href="${art.url}"><img class="articleImage" src="${art.urlToImage}" alt="${art.title}"></a>
      <div class="articleDiv">
          <a href="${art.url}">
              <h2 class="articleTitle">${art.title}</h2>
          </a>
          <a href="${art.url}">
              <p class="articleDesc">${art.description}</p>
          </a>
      </div>
    `;
    container_figther_articles.appendChild(art_container);
  });
  articles_container.insertBefore(
    container_figther_articles,
    articles_container.firstChild
  );

  const images = document.querySelectorAll(".fighter_articles img");
  console.log(images);
  for (let i = 0; i < images.length; i++) {
    if (images[i].currentSrc == "") {
      images[i].hidden = true;
    } else {
      images[i].hidden = false;
    }
  }
}

function addLikes(evt) {
  evt.preventDefault();
  let { btn, art } = getArticleId(evt);
  axios
    .post("/addlike", { id: art.id })
    .then(dbRes => {
      if (dbRes.data === "already jabbed") {
        console.log(dbRes);
        console.log("al jabbed");
        removeJab(btn);
      } else {
        addJab(btn);
        console.log("new jab");
        console.log(dbRes);
      }
    })
    .catch(dbErr => {
      console.log(dbErr);
    });
}

function addJab(butn) {
  console.log(butn.innerText.replace("jabs", ""));
  console.log(butn.innerText.trim(), "-----");
  const newNum = Number(butn.innerText.trim());
  butn.innerHTML = `<i class="fas fa-fist-raised"></i>  ${newNum + 1}`;
}

function removeJab(butn) {
  console.log(butn.innerText.trim(), "-----");
  const newNum = Number(butn.innerText.trim());
  if (newNum != 0) {
    butn.innerHTML = `<i class="far fa-hand-paper"></i>  ${newNum - 1}`;
  }
}

function commentinput(evt) {
  let { btn, art } = getArticleId(evt);
  displaycommentbox(art);
  addtextInput(art);
  console.log(btn);
  console.log(art.id);
}

function addtextInput(art) {
  const inputbox = document
    .getElementById(`${art.id}`)
    .parentElement.querySelectorAll("input");
  const inputicon = document.querySelectorAll(".addCommentIcon");
  inputbox.forEach(input => {
    input.onkeydown = addComment;
  });
  inputicon.forEach(icon => {
    icon.onclick = addComment;
  });
}

function getArticleId(evt) {
  evt.preventDefault();
  let btn;
  let art;
  if (evt.target.tagName === "I") {
    btn = evt.target.parentElement;
    art = btn.parentElement;
  } else {
    btn = evt.target;
    art = btn.parentElement;
  }
  return { btn, art };
}

function addComment(evt) {
  console.log(evt);
  if (evt.keyCode == 13 || evt.type == "click") {
    const art = evt.target.parentElement.parentElement.parentElement.querySelector(
      ".interact"
    );
    const art_id = art.id;
    const comment = art.parentElement.querySelector("input").value;
    const listItem = document.createElement("li");
    axios
      .post("/addComment", { comment: comment, art_id: art_id })
      .then(dbRes => {
        listItem.innerText = `${dbRes.data} ` + comment;
        art.parentElement
          .querySelector(".comment_display")
          .appendChild(listItem);
      })
      .catch(dbErr => {
        console.log(dbErr);
      });
  }
}

function displaycommentbox(art) {
  console.log("hererere", art);
  const comment_section = art.parentElement.querySelector(".comment_display");
  console.log(comment_section, "ggggggg");
  comment_section.classList.toggle("hide_comments");
}

article_like_btn.forEach(btn => {
  btn.onclick = addLikes;
});

comment_btns.forEach(btn => {
  btn.onclick = commentinput;
});

var logo = document.getElementById("main_logo");

logo.onmouseenter = hoverLogo;
logo.onmouseleave = basicLogo;

function hoverLogo() {
  logo.src = "/images/logo/hover.png";
}
function basicLogo() {
  logo.src = "/images/logo/basic.png";
}
