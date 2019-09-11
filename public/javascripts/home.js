const article_like_btn = document.querySelectorAll(
  ".article .interact .like_btn"
);
const tags_box = document.querySelectorAll(".tags_li input");
const articles_container = document.querySelector(".articles");

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
  console.log(evt);
  console.log(evt.target);
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

  // const jabCount = Number(btn.innerText.replace(" jabs", ""));
  // console.log(jabCount, "eeee", btn);
  console.log(art);
  axios
    .post("/addlike", { id: art.id })
    .then(dbRes => {
      console.log(dbRes.data.jabs);
      const jab_count = dbRes.data.jabs.length;
      changejabcount(jab_count, btn);
    })
    .catch(dbErr => {
      console.log(dbErr);
    });
}

function changejabcount(jabscount, butn) {
  console.log(butn.innerText, "-----");
  butn.innerHTML = "";
  butn.innerHTML = `<i class="fas fa-heart"></i>${jabscount} jabs`;
}

article_like_btn.forEach(btn => {
  btn.onclick = addLikes;
});
