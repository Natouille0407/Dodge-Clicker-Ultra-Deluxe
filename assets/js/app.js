let count = 0;
let multiplier = 10;

const cookie = document.querySelector("#cookie");
const countDisplay = document.querySelector("#count");

function cookieClick() {
    count = count + (1 * multiplier);
    countDisplay.textContent = count;
    cookie.classList.add("clicked");
    setTimeout(() => {
        cookie.classList.remove("clicked");
    }, 200);
}

cookie.addEventListener("click", cookieClick);