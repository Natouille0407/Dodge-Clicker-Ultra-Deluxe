
// declaration des variable globals
let count = 0;
let multiplier = 1;

let clickNb = 0;
let curseurPrice = 10;
let curseurMultiplier = 1;

let pickNb = 0;
let pickPrice = 10;
let pickMultiplier = 1;

let bitcoinNb = 0;
let bitcoinPrice = getBitcoinPrice();

// recuperation des boutton
const cookie = document.querySelector("#cookie");
const countDisplay = document.querySelector("#count");

const curseurBtn = document.querySelector("#curseur-btn");
const curseurPriceDisplay = document.querySelector("#curseur-price");

const pickBtn = document.querySelector("#pickaxe-btn");
const pickPriceDisplay = document.querySelector("#pickaxe-price");

const bitcoinBtn = document.querySelector('#bitcoin')

// Fonction pour récupérer les données du prix du Bitcoin
function getBitcoinPriceData() {
    const url = 'https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=3';
    return fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Une erreur s\'est produite lors de la récupération des données du prix du Bitcoin.');
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
        const response = await fetch('https://api.coincap.io/v2/assets/bitcoin');
        if (!response.ok) {
            throw new Error('Une erreur s\'est produite lors de la récupération du prix du Bitcoin.');
        }
        const data = await response.json();
        const dataPrice = data.data.priceUsd; // Prix du Bitcoin en USD
        bitcoinPrice = Math.floor(dataPrice)
    } catch (error) {
        console.error(error.message);
        return null;
    }
}

async function fetchBitcoinPrice() {
    const bitcoinPrice = await getBitcoinPrice();
    console.log(Math.floor(bitcoinPrice));
    // Vous pouvez maintenant utiliser la valeur de bitcoinPrice comme vous le souhaitez
}

async function createLineChart() {
    try {
        const response = await fetch('https://api.binance.com/api/v3/klines?symbol=BTCUSDT&interval=1d&limit=10');
        if (!response.ok) {
            throw new Error('Une erreur s\'est produite lors de la récupération des données du prix du Bitcoin.');
        }
        const data = await response.json();
        const prices = data.map(item => parseFloat(item[4])); // Le prix de clôture (Close) est à l'index 4

        // Détruire le graphique existant s'il existe
        const existingChart = Chart.getChart('bitcoinChart');
        if (existingChart) {
            existingChart.destroy();
        }

        const ctx = document.getElementById('bitcoinChart').getContext('2d');
        const bitcoinChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: Array.from({ length: 10 }, (_, i) => i + 1), // Crée une série de nombres de 1 à 10 pour les labels
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

// Appel de la fonction pour créer le graphique de ligne
createLineChart();


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

function bitClick() {
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

function gameEarn(number) {
    count += number;
    updateCountDisplay();
    updateStorage();
}



cookie.addEventListener("click", cookieClick);
curseurBtn.addEventListener("click", curseurClick);
pickBtn.addEventListener("click", pickaxeClick);
bitcoinBtn.addEventListener("click", bitClick);

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
}, 1)

// Appel de la fonction pour créer le graphique de ligne
createLineChart();
