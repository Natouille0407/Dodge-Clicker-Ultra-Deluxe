
// declaration des variable globals
let count = 0;
let multiplier = 1;

let clickNb = 0;
let curseurPrice = 10;
let curseurMultiplier = 1;

let pickNb = 0;
let pickPrice = 10;
let pickMultiplier = 1;

// recuperation des boutton
const cookie = document.querySelector("#cookie");
const countDisplay = document.querySelector("#count");

const curseurBtn = document.querySelector("#curseur-btn");
const curseurPriceDisplay = document.querySelector("#curseur-price");

const pickBtn = document.querySelector("#pickaxe-btn");
const pickPriceDisplay = document.querySelector("#pickaxe-price");

// stockage des dodge coin
if (localStorage.getItem('dodge') !== null) {
    count = parseInt(localStorage.getItem('dodge'));
    countDisplay.textContent = Math.trunc(count);
}

// stockage des curseur
if (localStorage.getItem('curseurPrice') !== null) {
    curseurPrice = parseInt(localStorage.getItem('curseurPrice'));
    curseurPriceDisplay.textContent = Math.trunc(curseurPrice);
}

if (localStorage.getItem('clickNb') !== null) {
    clickNb = parseInt(localStorage.getItem('clickNb'))
    for (let i = 0; i < clickNb; i++) {
        setInterval(cookieClick, 2500)
    }
}

// stockage de pickaxe
if (localStorage.getItem('pickPrice') !== null) {
    pickPrice = parseInt(localStorage.getItem('pickPrice'));
    pickPriceDisplay.textContent = Math.trunc(pickPrice);
}

if (localStorage.getItem('pickNb') !== null) {
    pickNb = parseInt(localStorage.getItem('pickNb'))
    for (let i = 0; i < pickNb; i++) {
        setInterval(cookieClick, 1000)
    }
}


function updateStorage() {
    localStorage.setItem('dodge', count);
    localStorage.setItem('clickNb', clickNb);
    localStorage.setItem('curseurPrice', curseurPrice);
    localStorage.setItem('pickPrice', pickPrice)
    localStorage.setItem('pickNb', pickNb)
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
        curseurPrice += 10 + curseurMultiplier;
        curseurMultiplier++
        curseurPriceDisplay.textContent = curseurPrice;
        clickNb += 1;
        updateCountDisplay();
        updateStorage();
        setInterval(cookieClick, 2500)
    }
}

function pickaxeClick() {
    if (count >= pickPrice) {
        count -= pickPrice;
        pickPrice += 25 + pickMultiplier;
        pickMultiplier++
        pickPriceDisplay.textContent = pickPrice;
        pickNb += 1;
        updateCountDisplay();
        updateStorage();
        setInterval(cookieClick, 1500)
    }
}

function gameEarn(number) {
    count += number;
    updateCountDisplay();
    updateStorage();
}

function cookieClick() {
    count += multiplier;
    updateCountDisplay();
    updateStorage();
    if (count > curseurPrice) {
        curseurBtn.classList.add('unlock')
    } else {
        curseurBtn.classList.remove('unlock')
    }
    if (count > pickPrice) {
        pickBtn.classList.add('unlock')
    } else {
        pickBtn.classList.remove('unlock')
    }
    cookie.classList.add("clicked");
    setTimeout(() => {
        cookie.classList.remove("clicked");
    }, 200);
}

cookie.addEventListener("click", cookieClick);
curseurBtn.addEventListener("click", curseurClick);
pickBtn.addEventListener("click", pickaxeClick)