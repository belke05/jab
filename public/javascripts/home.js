const article_like_btn = document.querySelectorAll(
  ".article .interact .like_btn"
);
const tags_box = document.querySelectorAll(".tags_li input");
const articles_container = document.querySelectorAll(".articles");
const comment_btns = document.querySelectorAll(".comment_btn");
const articles = document.querySelectorAll(".article");
// delete the images for articles without image source

tags_box.forEach(box => {
  box.onclick = findCategory;
});

const inputbox = document.querySelectorAll("input");
const inputicon = document.querySelectorAll(".addCommentIcon");
inputbox.forEach(input => {
  input.onkeydown = addComment;
});
inputicon.forEach(icon => {
  icon.onclick = addComment;
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
  articles.forEach(art => {
    console.log(art, "art");
    const sport = art.querySelector(".sport");
    console.log(sport, "sport");
    if (sports.length === 0) {
      art.classList.remove("hidden");
    } else if (!sports.includes(sport.dataset.sport)) {
      art.classList.add("hidden");
      console.log("----- hide");
      console.log(sport.dataset.sport, "nice");
      console.log(sports, "sports");
    } else {
      art.classList.remove("hidden");
      console.log("----- show");
    }
  });
  // axios
  //   .post("/changesport", { sports: sports })
  //   .then(dbRes => {
  //     console.log(dbRes.data);
  //     addArticles(dbRes.data);
  //     // deleteImgElementsWithoutSource();
  //   })
  //   .catch(dbErr => {
  //     console.log(dbErr);
  //   });
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
        <button type="button" class="like_btn"><img src="images/logo/jab.png" class = "like"> 0 Jabs</button>
        <button type="button" class="comment_btn"><i class="fas fa-comment"></i> Comment</button>
        <a> comments</a>
    </ul>
    <ul class="comment_display hide_comments">
        {{#each this.comments}}
        {{#each this}}
        <li>{{this.content}}</li>
        {{/each}}
        {{/each}}
    </ul>
    <div class="comment_section">
        <span class="comment_input"><input type="text" class="noborders" placeholder="Type your comment here ...">
            <i class="fas fa-comment-medical addCommentIcon"></i></span>
    </div>
    `;
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
  butn.innerHTML = `<img src="images/logo/jabbed.png" class = "like">  ${newNum + 1}`;
}

function removeJab(butn) {
  console.log(butn.innerText.trim(), "-----");
  const newNum = Number(butn.innerText.trim());
  if (newNum != 0) {
    butn.innerHTML = `<img src="images/logo/jab.png" class = "like">  ${newNum - 1}`;
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
    console.log(
      evt.target.parentElement.parentElement.parentElement,
      "heheheheheheh"
    );
    const art = evt.target.parentElement.parentElement.parentElement.querySelector(
      ".interact"
    );
    console.log(art.nextSibling, "arththth");

    const art_id = art.id;
    const comment = art.parentElement.querySelector("input").value;
    const listItem = document.createElement("li");

    axios
      .post("/addComment", { comment: comment, art_id: art_id })
      .then(dbRes => {
        console.log(dbRes.data);
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












