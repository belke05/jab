/* /**
 * Sample JavaScript code for youtube.channels.list
 * See instructions for running APIs Explorer code samples locally:
 * https://developers.google.com/explorer-help/guides/code_samples#javascript
 */

// {
//   /* <button class="authoriz" onclick="authenticate().then(loadClient)">authorize and load</button>
// <button class="execute"onclick="execute()">execute</button> */
// }
const authorize = document.getElementById("authorize");
const executer = document.getElementById("execute");
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

var logo = document.getElementById("main_logo");

logo.onmouseenter = hoverLogo;
logo.onmouseleave = basicLogo;

function hoverLogo() {
  logo.src = "/images/logo/hover.png";
}
function basicLogo() {
  logo.src = "/images/logo/basic.png";
}
gapi.load("client:auth2", function() {
  gapi.auth2.init({ client_id: "YOUR_CLIENT_ID" });
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

var burger = document.getElementById("burger");
var sidebar = document.getElementById("sidebar");

burger.onclick = () => {
    sidebar.classList.toggle("is-here"),
    console.log('hello')
};

cleantitle();
