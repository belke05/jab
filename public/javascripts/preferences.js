const btnEditFighter = document.getElementById("btn-edit-user-fighter");
const btnEditSports = document.getElementById("btn-edit-user-sports");
const Fighters = document.querySelectorAll(".one-fighter-container");
const Sports = document.querySelectorAll(".one-league-container img");

function getUserInfo() {
  // evt.preventDefault();
  axios
    .get("/userInfo")
    .then(userInfo => {
      console.log(userInfo.data);
      updateUserPrefDom(userInfo.data);
    })
    .catch(serverErr => console.log(serverErr));
}

function updateUserPrefDom(userInfo) {
  const favoriteFighter = document.getElementById(userInfo.fighter);
  favoriteFighter.parentElement.classList.add("chosen-fighter");
  userInfo.leagues.forEach(league => {
    let leagueChosen = document.getElementById(league);
    leagueChosen.classList.add("choosen-logo");
    leagueChosen.classList.remove("unchoosen-logo");
    leagueChosen.parentElement.classList.remove("unselected-container");
  });
}

getUserInfo();

function toggleFighterStyle(evt) {
  Fighters.forEach(fighter => {
    if (fighter == evt.target) {
      fighter.classList.add("chosen-fighter");
    } else {
      fighter.classList.remove("chosen-fighter");
    }
  });
}

Fighters.forEach(fighter => {
  fighter.onclick = evt => {
    toggleFighterStyle(evt);
    btnEditFighter.innerText = "Save Changes";
    btnEditFighter.classList.remove("btn-after-edit");
    btnEditFighter.classList.add("btn-edit");
  };
});

btnEditFighter.onclick = evt => {
  let selectedFighterContainer = document.querySelector(".chosen-fighter");
  console.log(selectedFighterContainer);
  let selectedFighter = selectedFighterContainer.querySelector(".pref-logo");
  postNewFighter(selectedFighter, evt);
  btnEditFighter.innerText = "Changes Saved";
  btnEditFighter.classList.add("btn-after-edit");
  btnEditFighter.classList.remove("btn-edit");
};

function postNewFighter(selectedFighter, evt) {
  evt.preventDefault();
  axios
    .post("/newFighter", { fighter_id: selectedFighter.id })
    .then(newFighter => {
      console.log(newFighter);
    })
    .catch(serverErr => console.log(serverErr));
}

Sports.forEach(sport => {
  sport.onclick = () => {
    sport.classList.toggle("unchoosen-logo");
    sport.classList.toggle("choosen-logo");
    sport.parentElement.classList.toggle("unselected-container");
    btnEditSports.innerText = "Save Changes";
    btnEditSports.classList.remove("btn-after-edit");
    btnEditSports.classList.add("btn-edit");
  };
});

function updateSports(selectedSports, evt) {
  evt.preventDefault();
  axios
    .post("/newSports", { selectedSports: selectedSports })
    .then(newSports => {
      console.log(newSports);
    })
    .catch(serverErr => console.log(serverErr));
  btnEditSports.innerText = "Changes Saved";
  btnEditSports.classList.add("btn-after-edit");
  btnEditSports.classList.remove("btn-edit");
}

btnEditSports.onclick = evt => {
  let selectedSports = document.querySelectorAll(".choosen-logo");
  let sportsArray = [];
  selectedSports.forEach(sport => {
    sportsArray.push(sport.id);
  });
  updateSports(sportsArray, evt);
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
  sidebar.classList.toggle("is-here"), console.log("hello");
};
