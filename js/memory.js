let arrayAnimali = ['🐱', '🦉', '🐾', '🦁', '🦋', '🐛', '🐝', '🐬', '🦊', '🐨', '🐰', '🐯', '🐱', '🦉', '🐾', '🦁', '🦋', '🐛', '🐝', '🐬', '🦊', '🐨', '🐯', '🐰'];
//libreria per icone
//https://html-css-js.com/html/character-codes/


let arrayComparison = [];
let iconsFind = [];
let tempo = 0;



// mi serviranno alcune variabili 1. interval 2. una agganciata alla classe find 
// 3. una agganciata al'id modal 4. una agganciata alla classe timer
let interval;
let find = document.getElementsByClassName("find");
let modal = document.getElementById("modal");
let memoryTimer;

//una funzione che serve a mescolare in modo random gli elementi dell'array che viene passato 
// (l'array contiene le icone degli animali)
function shuffle(a) {
    var currentIndex = a.length;
    var temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = a[currentIndex];
        a[currentIndex] = a[randomIndex];
        a[randomIndex] = temporaryValue;
    }
    return a;
}
// una funzione che rimuove la classe active e chiama la funzione startGame()

function removeActive() {

}

// la funzione startGame che pulisce il timer, dichiara un array vuoto, mescola casualmente l'array degli animali
function startGame() {
    let cards = shuffle(arrayAnimali);
    let container = document.getElementById("griglia");
    container.innerHTML = "";
    cards.forEach((value) => {
        let card = document.createElement("div")
        let wrapper = document.createElement("div")
        card.innerHTML = value
        card.className = "icon"
        card.addEventListener("click", displayIcon)
        wrapper.appendChild(card)
        container.appendChild(wrapper)
    })
    setTimer();
}

function formattaData(data) {
    let minuti = data / 60;
    minuti = parseInt(minuti);
    if (minuti < 10) {
        minuti = `0${minuti}`;
    } else {
        minuti = `${minuti}`;
    }
    let secondi = data % 60;
    if (secondi < 10) {
        secondi = `0${secondi}`;
    } else {
        secondi = `${secondi}`;
    }
    return `${minuti}:${secondi}`;
}
// (var arrayShuffle = shuffle(arrayAnimali);), aggancia il contenitore con id griglia, 
// pulisce tutti gli elementi che eventualmente contiene
// poi fa ciclo per creare i 24 div child -> aggiunge la class e l'elemento dell'array in base all'indice progressivo
// chiama la funzione timer e associa a tutti gli elementi (div) di classe icon l'evento click e le due funzioni definit sotto




function displayIcon() {
    var icon = document.getElementsByClassName("icon");
    var icons = [...icon];

    /*
    var icon = document.getElementsByClassName("icon");
    var icons = [...icon];
    è uguale a 
    var icons = document.getElementsByClassName("icon");
    //var icons = [...icon];
    è un operatore che serve per passare un array come argomento:
    https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax 
    https://www.tutorialspoint.com/es6/es6_operators.htm (cerca spread nella pagina)
    */

    //mette/toglie la classe show
    this.parentElement.classList.toggle("show");
    this.classList.toggle("show");
    //aggiunge l'oggetto su cui ha cliccato all'array del confronto
    arrayComparison.push(this);

    var len = arrayComparison.length;
    //se nel confronto ci sono due elementi
    if (len === 2) {
        //se sono uguali aggiunge la classe find
        if (arrayComparison[0].innerHTML === arrayComparison[1].innerHTML) {
            arrayComparison[0].parentElement.classList.add("find", "disabled");
            arrayComparison[1].parentElement.classList.add("find", "disabled");
            arrayComparison[0].classList.add("find", "disabled");
            arrayComparison[1].classList.add("find", "disabled");
            iconsFind = [...iconsFind, ...arrayComparison]
            arrayComparison = [];
            if (iconsFind.length == arrayAnimali.length) {
                vittoria()
            }

        } else {
            //altrimenti (ha sbagliato) aggiunge solo la classe disabled
            icons.forEach(function(item) {
                item.classList.add('disabled');
            });
            // con il timeout rimuove  la classe show per nasconderli
            setTimeout(function() {
                arrayComparison[0].parentElement.classList.remove("show");
                arrayComparison[1].parentElement.classList.remove("show");
                arrayComparison[0].classList.remove("show");
                arrayComparison[1].classList.remove("show");
                icons.forEach(function(item) {
                    item.classList.remove('disabled');
                    for (var i = 0; i < iconsFind.length; i++) {
                        iconsFind[i].classList.add("disabled");
                    }
                });
                arrayComparison = [];
            }, 700);
        }
    }
}

//una funzione che viene mostrata alla fine quando sono tutte le risposte esatte

function vittoria() {
    document.getElementById("modal").classList.add("active")
    document.getElementById("tempoTrascorso").innerHTML = formattaData(tempo)
    clearInterval(memoryTimer)
    iconsFind = []
}

// una funzione che nasconde la modale alla fine e riavvia il gioco

function playAgain() {
    document.getElementById("modal").classList.remove("active")
    startGame()
}

// una funzione che calcola il tempo e aggiorna il contenitore sotto

function setTimer() {
    tempo = 0;
    let timer = document.querySelector(".timer");
    timer.innerHTML = formattaData(tempo);
    clearInterval(memoryTimer);
    memoryTimer = setInterval(function() {
        tempo++
        timer.innerHTML = formattaData(tempo);
    }, 1000)
}





document.body.onload = startGame();