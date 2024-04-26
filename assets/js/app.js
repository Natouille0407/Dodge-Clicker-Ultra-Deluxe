let count = 0;
let multiplier = 1;

let clickNb = 0;
let curseurPrice = 10;
let curseurMultiplier = 1;

let pickNb = 0;
let pickPrice = 100;
let pickMultiplier = 1;

let serverNb = 0;
let serverPrice = 1000;
let serverMultiplier = 1;

let dataNb = 0;
let dataPrice = 10000;
let dataMultiplier = 1;

let nasaNb = 0;
let nasaPrice = 100000;
let nasaMultiplier = 1;

let quanticNb = 0;
let quanticPrice = 500000;
let quanticMultiplier = 1;

let bitcoinNb = 0;

let selectedCrypto = "BTCUSDT";
let selectedCryptoName = "bitcoin";

const cookie = document.querySelector("#cookie");
const countDisplay = document.querySelector("#count");

const curseurBtn = document.querySelector("#curseur-btn");
const curseurPriceDisplay = document.querySelector("#curseur-price");

const pickBtn = document.querySelector("#pickaxe-btn");
const pickPriceDisplay = document.querySelector("#pickaxe-price");

const serverBtn = document.querySelector("#server-btn");
const serverPriceDisplay = document.querySelector("#server-price");

const dataBtn = document.querySelector("#data-btn");
const dataPriceDisplay = document.querySelector("#data-price");

const nasaBtn = document.querySelector("#nasa-btn");
const nasaPriceDisplay = document.querySelector("#nasa-price");

const quanticBtn = document.querySelector("#quantic-btn");
const quanticPriceDisplay = document.querySelector("#quantic-price");

const bitcoinBtn = document.querySelector('#bitcoin');
const bitcoinReverseBtn = document.querySelector('#bitcoinReverse');
const bitcoinPriceDisplay = document.querySelector('#bitcoinPriceDisplay');
const bitcoinNbDisplay = document.querySelector("#bitcoinNbDisplay");

function getBitcoinPriceData() {
    const url = 'https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=3';
    return fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('ERROR');
            }
            return response.json();
        })
        .then(data => {
            bitcoinPrice = data.prices;
        })
        .catch(error => {
            console.error(error.message);
        });
}

async function getBitcoinPrice() {
    try {
        const response = await fetch('https://api.coincap.io/v2/assets/' + selectedCryptoName);
        if (!response.ok) {
            throw new Error('ERROR');
        }
        const data = await response.json();
        const dataPrice = data.data.priceUsd;
        bitcoinPrice = Math.floor(dataPrice)
        bitcoinPriceDisplay.textContent = "Today Price : " + Math.floor(dataPrice);
    } catch (error) {
        console.error(error.message);
        return null;
    }
}

async function createLineChart() {
    try {
        const response = await fetch('https://api.binance.com/api/v3/klines?symbol=' + selectedCrypto + '&interval=1d&limit=10');
        if (!response.ok) {
            throw new Error('Une erreur s\'est produite lors de la récupération des données du prix du Bitcoin.');
        }
        const data = await response.json();
        const prices = data.map(item => parseFloat(item[4]));

        const existingChart = Chart.getChart('CryptoChart');
        if (existingChart) {
            existingChart.destroy();
        }

        const ctx = document.getElementById('CryptoChart').getContext('2d');
        const bitcoinChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: Array.from({ length: 10 }, (_, i) => i + 1),
                datasets: [{
                    label: 'Bitcoin Value',
                    data: prices,
                    borderColor: 'rgba(156, 0, 255, 1)',
                    borderWidth: 1,
                    fill: true,
                    backgroundColor: 'rgba(255, 0, 196, 0.5)',
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    x: {
                        display: true,
                    },
                    y: {
                        display: true
                    }
                }
            }
        });
    } catch (error) {
        console.error(error.message);
    }
}

createLineChart();


if (localStorage.getItem('dodge') !== null) {
    count = parseInt(localStorage.getItem('dodge'));
    countDisplay.textContent = Math.trunc(count);
}

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

if (localStorage.getItem('serverPrice') !== null) {
    serverPrice = parseInt(localStorage.getItem('serverPrice'));
    serverPriceDisplay.textContent = Math.trunc(serverPrice);
}

if (localStorage.getItem('serverNb') !== null) {
    serverNb = parseInt(localStorage.getItem('serverNb'))
    for (let i = 0; i < serverNb; i++) {
        setInterval(cookieClick, 1000)
    }
}

if (localStorage.getItem('dataPrice') !== null) {
    dataPrice = parseInt(localStorage.getItem('dataPrice'));
    dataPriceDisplay.textContent = Math.trunc(dataPrice);
}

if (localStorage.getItem('dataNb') !== null) {
    dataNb = parseInt(localStorage.getItem('dataNb'))
    for (let i = 0; i < dataNb; i++) {
        setInterval(cookieClick, 1000)
    }
}

if (localStorage.getItem('nasaPrice') !== null) {
    nasaPrice = parseInt(localStorage.getItem('nasaPrice'));
    nasaPriceDisplay.textContent = Math.trunc(nasaPrice);
}

if (localStorage.getItem('nasaNb') !== null) {
    nasaNb = parseInt(localStorage.getItem('nasaNb'))
    for (let i = 0; i < nasaNb; i++) {
        setInterval(cookieClick, 1000)
    }
}

if (localStorage.getItem('quanticPrice') !== null) {
    quanticPrice = parseInt(localStorage.getItem('quanticPrice'));
    quanticPriceDisplay.textContent = Math.trunc(quanticPrice);
}

if (localStorage.getItem('quanticNb') !== null) {
    quanticNb = parseInt(localStorage.getItem('quanticNb'))
    for (let i = 0; i < quanticNb; i++) {
        setInterval(cookieClick, 1000)
    }
}

if (localStorage.getItem('bitcoinNb') !== null) {
    bitcoinNb = parseInt(localStorage.getItem('bitcoinNb'))
}

function updateStorage() {
    localStorage.setItem('dodge', count);
    localStorage.setItem('clickNb', clickNb);
    localStorage.setItem('curseurPrice', curseurPrice);
    localStorage.setItem('pickPrice', pickPrice)
    localStorage.setItem('pickNb', pickNb)
    localStorage.setItem('serverPrice', serverPrice)
    localStorage.setItem('serverNb', serverNb)
    localStorage.setItem('dataPrice', dataPrice)
    localStorage.setItem('dataNb', dataNb)
    localStorage.setItem('nasaPrice', nasaPrice)
    localStorage.setItem('nasaNb', nasaNb)
    localStorage.setItem('quanticPrice', quanticPrice)
    localStorage.setItem('quanticNb', quanticNb)
    localStorage.setItem('bitcoinNb', bitcoinNb)
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
        setInterval(cookieClick, 10000)
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
        setInterval(cookieClick, 8000)
    }
}

function serverClick() {
    if (count >= serverPrice) {
        count -= serverPrice;
        serverPrice += 50 + serverMultiplier;
        serverMultiplier++
        serverPriceDisplay.textContent = serverPrice;
        serverNb += 1;
        updateCountDisplay();
        updateStorage();
        setInterval(cookieClick, 5000)
    }
}

function dataClick() {
    if (count >= dataPrice) {
        count -= dataPrice;
        dataPrice += 50 + dataMultiplier;
        dataMultiplier++
        dataPriceDisplay.textContent = dataPrice;
        dataNb += 1;
        updateCountDisplay();
        updateStorage();
        setInterval(cookieClick, 3000)
    }
}

function nasaClick() {
    if (count >= nasaPrice) {
        count -= nasaPrice;
        nasaPrice += 50 + nasaMultiplier;
        nasaMultiplier++
        nasaPriceDisplay.textContent = nasaPrice;
        nasaNb += 1;
        updateCountDisplay();
        updateStorage();
        setInterval(cookieClick, 1000)
    }
}

function  quanticClick() {
    if (count >= quanticPrice) {
        count -=  quanticPrice;
        quanticPrice += 50 +  quanticMultiplier;
        quanticMultiplier++
        quanticPriceDisplay.textContent =  quanticPrice;
        quanticNb += 1;
        updateCountDisplay();
        updateStorage();
        setInterval(cookieClick, 500)
    }
}

function bitClick() {
    if (count >= bitcoinPrice) {
        count -= bitcoinPrice;
        bitcoinNb++
        bitcoinBtn.classList.add("clicked");
        setTimeout(() => {
            bitcoinBtn.classList.remove("clicked");
        }, 200);
    }
}

function bitMinusClick() {
    if (bitcoinPrice > 0) {
        console.log("ok")
        count += bitcoinPrice
        bitcoinNb--
        bitcoinReverseBtn.classList.add("clicked");
        setTimeout(() => {
            bitcoinReverseBtn.classList.remove("clicked");
        }, 200);
    }
}

function gameEarn(number) {
    count += number;
    updateCountDisplay();
    updateStorage();
}

function gameMinus(number) {
    count -= number;
    updateCountDisplay();
    updateStorage();
}

cookie.addEventListener("click", cookieClick);
curseurBtn.addEventListener("click", curseurClick);
pickBtn.addEventListener("click", pickaxeClick);
serverBtn.addEventListener("click", serverClick);
dataBtn.addEventListener("click", dataClick);
nasaBtn.addEventListener("click", nasaClick);
quanticBtn.addEventListener("click",  quanticClick)
bitcoinBtn.addEventListener("click", bitClick);
bitcoinReverseBtn.addEventListener("click", bitMinusClick);

setInterval(function () {

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

    if (count > serverPrice) {
        serverBtn.classList.add('unlock')
    } else {
        serverBtn.classList.remove('unlock')
    }

    if (count > dataPrice) {
        dataBtn.classList.add('unlock')
    } else {
        dataBtn.classList.remove('unlock')
    }

    if (count > nasaPrice) {
        nasaBtn.classList.add('unlock')
    } else {
        nasaBtn.classList.remove('unlock')
    }

    if (count > quanticPrice) {
        quanticBtn.classList.add('unlock')
    } else {
        quanticBtn.classList.remove('unlock')
    }

}, 1)

setInterval(function () {
    bitcoinNbDisplay.textContent = bitcoinNb + " Bitcoin"
}, 1)

getBitcoinPrice()
updateStorage()