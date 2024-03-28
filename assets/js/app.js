let count = 0;
let curseurPrice = 10;
let multiplier = 1;

const cookie = document.querySelector("#cookie");
const countDisplay = document.querySelector("#count");
const curseurBtn = document.querySelector("#curseur-btn");
const curseurPriceDisplay = document.querySelector("#curseur-price");

function cookieClick() {
    count = count + (1 * multiplier);
    countDisplay.textContent = Math.trunc(count);
    cookie.classList.add("clicked");
    setTimeout(() => {
        cookie.classList.remove("clicked");
    }, 200);
}

function curseurClick() {
    if(count >= curseurPrice) {
        count = count - curseurPrice;
        curseurPrice = curseurPrice + 1;
        countDisplay.textContent = Math.trunc(count);
        curseurPriceDisplay.textContent = curseurPrice;
        setInterval(cookieClick, 60000);
    }
}

cookie.addEventListener("click", cookieClick);
curseurBtn.addEventListener("click", curseurClick);