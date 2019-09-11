const article_like_btn = document.querySelectorAll(
  ".article .interact .like_btn"
);
const tags_box = document.querySelectorAll(".tags_li input");
const articles_container = document.querySelectorAll(".articles");
const comment_btns = document.querySelectorAll(".comment_btn");
// delete the images for articles without image source

tags_box.forEach(box => {
  box.onclick = findCategory;
});

function findCategory(evt) {
  const sports = [];
  console.log(sports);
  tags_box.forEach(box => {
    if (box.checked) {
      console.log(box.id);
      sports.push(box.id);
      console.log(sports);
    }
  });
  axios
    .post("/changesport", { sports: sports })
    .then(dbRes => {
      console.log(dbRes.data);
      addArticles(dbRes.data);
      // deleteImgElementsWithoutSource();
    })
    .catch(dbErr => {
      console.log(dbErr);
    });
}

function addArticles(articles) {
  articles_container.innerHTML = "";
  articles.forEach(art => {
    let art_container = document.createElement("div");
    art_container.className = `article ${art.league}`;
    art_container.innerHTML = `   
    <div class="content">
        <a href="${art.link}"><img class="articleImage" src="${art.imgUrl}" alt="${art.title}"></a>
        <div class="articleDiv">
            <a href="${art.link}">
                <h2 class="articleTitle">${art.title}</h2>
            </a>
            <a href="${art.link}">
                <p class="articleDesc">${art.description}</p>
                <p>${art.league}</p>
            </a>
    </div>
    </div>
    <ul class="interact" id="${art._id}">
        <button type="button" class="like_btn"><i class="fas fa-heart"></i> 0 Jabs</button>
        <button type="button" class="comment_btn"><i class="fas fa-comment"></i> Comment</button>
        <a> comments</a>
    </ul>`;
    articles_container.appendChild(art_container);
  });
}

function deleteImgElementsWithoutSource() {
  const images = document.querySelectorAll("img");
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
  const input = document.createElement("input");
  input.type = "text";
  input.className = "comment_input";
  const div = document.createElement("div");
  div.appendChild(input);
  div.className = "comment_section";
  if (
    document
      .getElementById(`${art.id}`)
      .parentElement.getElementsByTagName("input").length > 0
  ) {
    const parent = document.getElementById(`${art.id}`).parentElement;
    const child = document.getElementById(`${art.id}`).nextSibling;
    parent.removeChild(child);
  } else {
    art.parentElement.appendChild(div);
    const inputbox = document
      .getElementById(`${art.id}`)
      .parentElement.querySelectorAll("input");
    inputbox.forEach(input => {
      input.onkeydown = addComment;
    });
  }
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
  if (evt.keyCode == 13) {
    const art_id = evt.target.parentElement.parentElement.querySelector(
      ".interact"
    ).id;
    console.log(
      "evt targ",
      evt.target,
      "evt target previous sib",
      evt.target.parentElement.parentElement.querySelector(".interact")
    );
    console.log("article id", art_id);
    const comment = evt.target.value;
    axios
      .post("/addComment", { comment: comment, art_id: art_id })
      .then(dbRes => {
        console.log(dbRes);
      })
      .catch(dbErr => {
        console.log(dbErr);
      });
  }
}

function displaycommentbox(art) {
  console.log("hererere", art);
  const comment_section = art.querySelector(".comment_display");
  comment_section.classList.toggle("hide_comments");
}

article_like_btn.forEach(btn => {
  btn.onclick = addLikes;
});

comment_btns.forEach(btn => {
  btn.onclick = commentinput;
});
