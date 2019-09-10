const images = document.querySelectorAll("img");
const article_like_btn = document.querySelectorAll(
  ".article .interact .like_btn"
);
console.log(article_like_btn);

for (let i = 0; i < images.length; i++) {
  if (images[i].currentSrc == "") {
    images[i].hidden = true;
  }
}

// function addLikes(evt) {
//   console.log(evt);
//   console.log(evt.target);
//   evt.preventDefault();
//   let btn;
//   let art;
//   if (evt.target.tagName === "I") {
//     btn = evt.target.parentElement;
//     art = btn.parentElement;
//   } else {
//     btn = evt.target;
//     art = btn.parentElement;
//   }

// const jabCount = Number(btn.innerText.replace(" jabs", ""));
// console.log(jabCount, "eeee", btn);
//   axios
//     .post("/addlike", { id: art.id })
//     .then(dbRes => {})
//     .catch(dbErr => {});
// }

// article_like_btn.forEach(btn => {
//   btn.onclick = addLikes;
// });
