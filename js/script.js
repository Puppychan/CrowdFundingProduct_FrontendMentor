let menuIcon = document.querySelector(".header-menuicon");
let header = document.querySelector('.header');
let backProjectButton = document.querySelector(".main-intro-buttons-back");
let bookmarkButton = document.querySelector(".main-intro-buttons-bookmark");
let mainGraphBackedAmount = document.querySelector(".main-graph-backed-num");
let mainGraphBackedNum = document.querySelector(".main-graph-backers-num");
let progressBarDone = document.querySelector(".main-graph-progress-done");
let itemContainer = document.querySelector(".main-content-items-wrap");
let itemContainerModal = document.querySelector(".main-content.modal .main-content-items-wrap");
let modalCloseIcon = document.querySelector(".main-content-close");
let modalContent = document.querySelector(".main-content-wrap");
let modalThank = document.querySelector(".main-thankyou");
let closeModalThankIcon = document.querySelector(".main-thankyou-win-btn");
displayProgressDone();
runModalWin();

// display progress bar
function displayProgressDone() {
    progressBarDone.style.width = `${100 * convertStrToNum(mainGraphBackedAmount.innerHTML) / 100000}%`;
}
// disable button 
function disableButton(button) {
    button.setAttribute("disabled", true);
    button.classList.add("disabled");
}
// convert back number text to plain number
function convertStrToNum(numStr) {
    return numStr.replaceAll(/[\$|\,]/g, "");
}
// update total back amount
function updateBackAmount() {
    let currentBackAmount = convertStrToNum(mainGraphBackedAmount.innerHTML);
    // // check if number reach limit
    if (currentBackAmount == 99999) disableButton(backProjectButton);

    // covert and increase number
    mainGraphBackedAmount.innerHTML = `$${(++currentBackAmount).toLocaleString()}`;
    // display to progress bar
    displayProgressDone();
}
// update back number
function updateBackNumber() {
    let currentBackNum = convertStrToNum(mainGraphBackedNum.innerHTML);
    mainGraphBackedNum.innerHTML = `${(++currentBackNum).toLocaleString()}`;

}
// open modal win
function openModal(modalElement) {
    console.log(modalElement);
    modalElement.classList.remove("close");
}
// close modal win
function closeModal(modalElement) {
    modalElement.classList.add("close");
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

            <div class="main-content-items-subwin">
                <hr>
                <p class="main-content-items-subwin-inputmess">Enter your pledge</p>
                <div class="main-content-items-subwin-input">
                    <label for="money-item-${index}">
                    <svg>
                        <use href="#svg-dollar-sign"></use>
                    </svg>
                    </label>
                    <input type="text" name="moneyInput${index}" id="money-item-${index}" value="${element["pledge"]}">
                </div>
                <button class="main-content-items-subwin-continue">Continue</button>
          </div>

        </div>`;
    });
    itemContainer.insertAdjacentHTML("beforeend", itemsHtml);
    itemContainerModal.insertAdjacentHTML("beforeend", itemsHtml);
}

// click radio input
let clickRadioInput = event => {
    let subwin = event.target.parentElement.querySelector(".main-content-items-subwin");
    let container = event.target.parentElement.parentElement;
    if (subwin) {
        subwin.style.display = "grid";
        // uncheck first option (which has no subwin)
        container.querySelector(".main-content-items input[type='radio'").checked = false;
    }
    else {
        // plege with not reward
        closeModal(modalContent);
        openModal(modalThank);
        // remove other choices
        container.querySelectorAll(".main-content-items").forEach((otherItem, index) => {
            // uncheck other options (which has subwin)
            if (index == 0) return;
            otherItem.querySelector(".main-content-items-subwin").style.display = "none";
            otherItem.querySelector("input[type='radio'").checked = false;
        });
    }
}
//
async function runModalWin() {
    await addItems();
    // add radio input events
    let radioInputs = document.querySelectorAll("input[type='radio']");
    radioInputs.forEach(radioInput => radioInput.addEventListener("click", clickRadioInput));

    // add select events
    document.querySelectorAll(".main-content-items-select").forEach(button => button.addEventListener("click", event => openModal(modalContent)));
}
// open a subwin
async function openSubwin(item) {
    item.querySelector(".main-content-items-subwin").style.display = "grid";
}



// open side menu on mobile
menuIcon.addEventListener("click", event => {
    header.classList.toggle("open");
    menuIcon.setAttribute("src", menuIcon.getAttribute("src").includes("hamburger")? "./images/icon-close-menu.svg" : "./images/icon-hamburger.svg");
});

// click back this project button
backProjectButton.addEventListener("click", event => {
    updateBackNumber();
    openModal(modalThank);
});
// close modal thank 
closeModalThankIcon.addEventListener("click", event => closeModal(modalThank));
// click bookmark button
bookmarkButton.addEventListener('click', event => {
    bookmarkButton.classList.toggle("tick");
    bookmarkButton.querySelector("span").innerHTML = bookmarkButton.classList.contains("tick")? "Bookmarked" : "Bookmark";
});
// close modal
modalCloseIcon.addEventListener("click", event => {
    closeModal(modalContent)
});

