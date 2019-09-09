const signupPage1= document.getElementById ("signup-page1");
const signupPage2= document.getElementById ("signup-page2");
const btnNext = document.getElementById("btn-next");

signupPage1.classList.remove("hidden");
signupPage2.classList.add("hidden");

btnNext.onclick = () =>{
  signupPage1.classList.add("hidden");
  signupPage2.classList.remove("hidden");
}