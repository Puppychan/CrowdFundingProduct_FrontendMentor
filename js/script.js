let menuIcon = document.querySelector(".header-menuicon");
let header = document.querySelector('.header');
let backProjectButton = document.querySelector(".main-intro-buttons-back");
let bookmarkButton = document.querySelector(".main-intro-buttons-bookmark");
let mainGraphBackedNumber = document.querySelector(".main-graph-backed-num");
let progressBarDone = document.querySelector(".main-graph-progress-done");
// updateBackNumber();
displayProgressDone();

// convert back number text to plain number
function convertBackNumer() {
    return mainGraphBackedNumber.innerHTML.replaceAll(/[\$|\,]/g, "");
}
// display progress bar
function displayProgressDone() {
    progressBarDone.style.width = `${100 * convertBackNumer() / 100000}%`;
}
// update total back number
function updateBackNumber() {
    console.log((convertBackNumer() ++).toLocaleString());
    mainGraphBackedNumber.innerHTML = `$${(convertBackNumer() ++).toLocaleString()}`;
}
// open side menu on mobile
menuIcon.addEventListener("click", event => {
    header.classList.toggle("open");
    menuIcon.setAttribute("src", menuIcon.getAttribute("src").includes("hamburger")? "./images/icon-close-menu.svg" : "./images/icon-hamburger.svg");
});

// click back this project button

// click bookmark button
bookmarkButton.addEventListener('click', event => {
    bookmarkButton.classList.toggle("tick");
    bookmarkButton.querySelector("span").innerHTML = bookmarkButton.classList.contains("tick")? "Bookmarked" : "Bookmark";
});
