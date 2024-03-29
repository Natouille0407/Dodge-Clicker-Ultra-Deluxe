let count = 0;
let multiplier = 1;
let clickNb = 0;
let curseurPrice = 10;

const cookie = document.querySelector("#cookie");
const countDisplay = document.querySelector("#count");
const curseurBtn = document.querySelector("#curseur-btn");
const curseurPriceDisplay = document.querySelector("#curseur-price");

if (localStorage.getItem('dodge') !== null) {
    count = parseInt(localStorage.getItem('dodge'));
    countDisplay.textContent = Math.trunc(count);
}

function updateStorage() {
    localStorage.setItem('dodge', count);
    localStorage.setItem('clickNb', clickNb);
    localStorage.setItem('curseurPrice', curseurPrice);
    localStorage.setItem('curseur', clickNb);
}

function updateCountDisplay() {
    countDisplay.textContent = Math.trunc(count);
}

function cookieClick() {
    count += multiplier;
    updateCountDisplay();
    updateStorage();
    
    cookie.classList.add("clicked");
    setTimeout(() => {
        cookie.classList.remove("clicked");
    }, 200);
}

function curseurClick() {
    if (count >= curseurPrice) {
        count -= curseurPrice;
        curseurPrice++;
        curseurPriceDisplay.textContent = curseurPrice;
        clickNb += 1;
        updateCountDisplay();
        updateStorage();
    }
}

function gameEarn(number) {
    count += number;
    updateCountDisplay();
    updateStorage();
}

cookie.addEventListener("click", cookieClick);
curseurBtn.addEventListener("click", curseurClick);