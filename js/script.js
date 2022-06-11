let menuIcon = document.querySelector(".header-menuicon");
let header = document.querySelector('.header');
let backProjectButton = document.querySelector(".main-intro-buttons-back");
let bookmarkButton = document.querySelector(".main-intro-buttons-bookmark");
let mainGraphBackedNumber = document.querySelector(".main-graph-backed-num");
let progressBarDone = document.querySelector(".main-graph-progress-done");
let itemContainer = document.querySelector(".main-content-items-wrap");
let itemContainerModal = document.querySelector(".main-content.modal .main-content-items-wrap");
displayProgressDone();
addItems();

// convert back number text to plain number
function convertBackNumer() {
    return mainGraphBackedNumber.innerHTML.replaceAll(/[\$|\,]/g, "");
}
// display progress bar
function displayProgressDone() {
    progressBarDone.style.width = `${100 * convertBackNumer() / 100000}%`;
}
// disable button 
function disableButton(button) {
    button.setAttribute("disabled", true);
    button.classList.add("disabled");
}
// update total back number
function updateBackNumber() {
    let currentBackNumber = convertBackNumer();
    // check if number reach limit
    if (currentBackNumber == 99999) disableButton(backProjectButton);

    // covert and increase number
    mainGraphBackedNumber.innerHTML = `$${(++currentBackNumber).toLocaleString()}`;
    // display to progress bar
    displayProgressDone();
}
// fetch items storage 
async function fetchItems() {
    return jsonBody = await (await (await fetch("./js/items.json")).json());
}
// add items
async function addItems() {
    let itemsArr = await fetchItems();
    let itemsHtml = "";
    itemsArr.forEach((element, index) => {
        if (index == 0) return;
        let leftNum = element["amount"];
        itemsHtml += `
        <div class="main-content-items ${leftNum == 0? "disabled" : ""}">  
            <label for="item-${index}" class="main-content-items-head">
                <h4 class="main-content-items-head-title">${element["name"]}</h4>
                <p class="main-content-items-head-money">Pledge $${element["pledge"]} or more</p>
            </label>
            <input type="radio" name="itemChoose${index}" id="item-${index}" ${leftNum == 0 ? "disabled" : ""}>
            <p class="main-content-items-desc">${element["desc"]}</p>
            <h3 class="main-content-items-remaining">
            ${leftNum} 
            <span>left</span>
            </h3>
            <button class='main-content-items-select ${leftNum == 0 ? "disabled' disabled >Out of stock" : "'>Select Reward"}</button>

        </div>`;
    });
    itemContainer.insertAdjacentHTML("beforeend", itemsHtml);
    itemContainerModal.insertAdjacentHTML("beforeend", itemsHtml);
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
