let menuIcon = document.querySelector(".header-menuicon");
let header = document.querySelector('.header');
let backProjectButton = document.querySelector(".main-intro-buttons-back");
let bookmarkButton = document.querySelector(".main-intro-buttons-bookmark");
let mainGraphBackedNumber = document.querySelector(".main-graph-backed-num");
let progressBarDone = document.querySelector(".main-graph-progress-done");
let itemContainer = document.querySelector(".main-content-items");
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
    let currentBackNumber = convertBackNumer();
    // check if number reach limit
    if (currentBackNumber == 99999) {
        backProjectButton.setAttribute("disabled", true);
        backProjectButton.style.backgroundColor = "#ccc";
    }

    // covert and increase number
    mainGraphBackedNumber.innerHTML = `$${(++currentBackNumber).toLocaleString()}`;
    // display to progress bar
    displayProgressDone();
}
// fetch items storage 
async function fetchItems() {
    return jsonBody = await (await (await fetch("./items.json")).json());
}
// add items
async function addItems() {
    let itemsArr = await fetchItems();
    itemsArr.forEach(element => {
        
    });
}



// open side menu on mobile
menuIcon.addEventListener("click", event => {
    header.classList.toggle("open");
    menuIcon.setAttribute("src", menuIcon.getAttribute("src").includes("hamburger")? "./images/icon-close-menu.svg" : "./images/icon-hamburger.svg");
});

// click back this project button
backProjectButton.addEventListener("click", event => updateBackNumber());

// click bookmark button
bookmarkButton.addEventListener('click', event => {
    bookmarkButton.classList.toggle("tick");
    bookmarkButton.querySelector("span").innerHTML = bookmarkButton.classList.contains("tick")? "Bookmarked" : "Bookmark";
});
