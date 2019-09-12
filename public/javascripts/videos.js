function decodeHtml(html) {
  var txt = document.createElement("textarea");
  txt.innerHTML = html;
  return txt.value;
}

const titles = document.querySelectorAll(".video_title");
const titlewelcome = document.querySelector(".title_welcome");

titles.forEach(title => {
  const titleText = title.innerText;
  const newText = decodeHtml(titleText);
  title.innerText = newText;
});

function cleantitle() {
  const titletext = titlewelcome.innerText;
  const newtext = decodeHtml(titletext);
  titlewelcome.innerText = newtext;
}

cleantitle();
