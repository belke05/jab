const signupPage1= document.getElementById ("signup-page1");
const signupPage2= document.getElementById ("signup-page2");
const btnNext = document.getElementById("btn-next");
const fighterSelect = document.getElementById("fighter-select");
const fighterImg = document.getElementById("fighter-photo");
// var fightersImg;

signupPage1.classList.remove("hidden");
signupPage2.classList.add("hidden");

btnNext.onclick = () =>{
  signupPage1.classList.add("hidden");
  signupPage2.classList.remove("hidden");
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
