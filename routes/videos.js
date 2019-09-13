const utf8 = require("utf8");
const express = require("express");
const Fighters = require("../models/fighters");
const Users = require("../models/users");
const router = express.Router();
const { google } = require("googleapis");
const videos = google.youtube({
  version: "v3",
  auth: "AIzaSyAR5ES7hlnyLBEszWjaaFBzL-pyh8IMb6U"
});
let fighterName = "";

router.get("/videos", (req, res, next) => {
  Users.findById(req.session.currentUser._id)
    .then(userRes => {
      console.log(userRes);
      const leagues = userRes.leagueTag;
      const fighter = userRes.fighter;
      console.log(fighter, "heheheheh");

      searchvideosThenReturn(leagues, fighter)
        .then(videosInfo => {
          let videoInfo = [];
          videosInfo.forEach(vid => {
            let description = vid.snippet.description;
            let title = vid.snippet.title;
            let id = vid.id.videoId;
            videoInfo.push({ id, title, description });
          });
          console.log(videoInfo);
          res.render("videos", {
            scripts: ["videos.js", "general.js"],
            videos: videoInfo,
            leagues,
            fighterName
          });
        })
        .catch();
    })
    .catch();
});

//
async function searchvideosThenReturn(leaguesArray, fighterid) {
  console.log("here here here");
  var fighter = await lookUpFighter(fighterid);
  console.log(fighter, "fighter");
  fighterName = fighter.name;
  console.log(leaguesArray, "leagues");
  let videos = [];
  let channels = [];
  for (let i = 0; i < leaguesArray.length; i++) {
    let leaguevideo = await videoSearch(leaguesArray[i], false);
    // let channelsPage = await channelSearch(leaguesArray[i]);
    console.log("vid", leaguevideo.data.items[0]);
    videos.push(leaguevideo.data.items[0]);
  }
  var fightervideo = await videoSearch(fighter.name, true);
  videos.push(fightervideo.data.items[0]);
  videos.push(fightervideo.data.items[1]);

  console.log(videos);
  return videos;
}

function videoSearch(query, fightervid) {
  if (fightervid) {
    return videos.search.list({
      part: "snippet",
      maxResults: 2,
      q: `${query}`
    });
  } else {
    return videos.search.list({
      part: "snippet",
      maxResults: 1,
      q: `${query}`
    });
  }
}

function lookUpFighter(id) {
  return Fighters.findById(id);
}

// function channelSearch(league) {
//   return videos.channels.list();
// }

module.exports = router;
