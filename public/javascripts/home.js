const images = document.querySelectorAll("img");

for (let i = 0; i < images.length; i++) {
  if (images[i].currentSrc == "") {
    images[i].hidden = true;
  }
}
