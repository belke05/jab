const signupPage1= document.getElementById ("signup-page1");
const signupPage2= document.getElementById ("signup-page2");
const btnNext = document.getElementById("btn-next");
const fighterSelect = document.getElementById("fighter-select");
const fighterImg = document.getElementById("fighter-photo");
const username = document.getElementById("username");
const email = document.getElementById("email");
const passwd = document.getElementById("password");
const messageBox = document.getElementById("messageBox");
const selectImg = document.getElementById("selectFile");
const originalImgSelector = document.getElementById("imgPath");
var signupOk = false 
// var fightersImg;

signupPage1.classList.remove("hidden");
signupPage2.classList.add("hidden");

btnNext.onclick = (evt) =>{
  checkSignUpInput(evt, function(singinUpStatus){
    if(singinUpStatus){
      signupPage1.classList.add("hidden");
      signupPage2.classList.remove("hidden");
    }
  })

}

function postFighter(evt){
  evt.preventDefault();
  axios.post("/fighterUpdate", { label: fighterSelect.value })
  .then(serverRes => {
    console.log(serverRes)
    updateFighterImg(serverRes.data)
  })
  .catch(serverErr => console.log(serverErr))
}

function updateFighterImg(fighter) {
  fighterImg.src = fighter.imgPath;
}

fighterSelect.onchange = postFighter;


function checkSignUpInput(evt, cb){
  evt.preventDefault();
  console.log(messageBox)
  if(!username.value || !email.value || !passwd.value){
    messageBox.innerText = "All the fields are required";
    messageBox.classList.remove("hidden");
  } else {
    axios.post("/signupinfos", {
      username : username.value, 
      email:email.value, 
      password: passwd.value
    })
    .then ( serverRes => {
      console.log(serverRes.data)
      if (!serverRes.data ==""){
        messageBox.innerText = serverRes.data;
        messageBox.classList.remove("hidden");
      } else {
    
        signupOk = true;
        cb(signupOk);
        messageBox.classList.add("hidden");
      }
    })
    .catch(serverErr => console.log(serverErr))
  }

}

selectImg.onclick = () =>{
  originalImgSelector.click();
};

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