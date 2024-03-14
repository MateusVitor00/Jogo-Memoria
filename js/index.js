const moves = document.getElementById("moves-count");
const timeValue = document.getElementById("time");
const startButton = document.getElementById("start");
const stopButton = document.getElementById("stop");
const gameContainer = document.querySelector(".game-container");
const result = document.getElementById("result");
const controls = document.querySelector(".controls-container")
let cards;
let interval;
let firstCard = false;
let secondCard = false;


const items = [
    {name: "Artur", image: "images/artur/artur-01.JPG" },
    {name: "Dentinho", image: "images/dentinho/dentinho-01.JPG" },
    {name: "Eduardo", image: "images/eduardo/eduardo-01.JPG" },
    {name: "Gabi", image: "images/gabi/gabi-01.JPG" },
    {name: "Gustavo", image: "images/gustavo/gustavo-01.JPG" },
    {name: "Luan", image: "images/luan/luan-01.JPG" },
    {name: "Luisa", image: "images/luisa/luisa-01.JPG" },
    {name: "Malu", image: "images/malu/malu-01.JPG" },
];

//contador
let seconds = 0,
    minutes = 0;

let movesCount = 0, 
    winCount;

const timeGenerator = () => {
    seconds += 1
    //minutes logic
    if(seconds = 60){
        minutes = 1;
        seconds = 0;
    }
    //formatação do tempo depois de reproduzida
let secondsValues = seconds < 10 ? `0${seconds}` : seconds;
let minutesValues = minutes < 10 ? `0${minutes}` : minutes;
timeValue.innerHTML = `<span>Tempo: </span>
${minutesValues}:
${secondsValues}
`;
};

// calculando movimentos

const movesCounter = () =>{
    movesCount += 1;
    moves.innerHTML = `<span>Movimentos: </span>${movesCount}`
};

//gerando objetos aleatorios para lista de itens
const generateRandom = (size = 4) =>{

    let tempArray = [...items];
    
    let cardValues = [];
    
    size = (size * size) / 2;
    for(let i = 0; i< size; i++){
        const randomIndex = Math.floor(Math.random() * tempArray.length);
        cardValues.push(tempArray[randomIndex]);

        tempArray.splice(randomIndex, 1);
    }
    return cardValues
};

const matrixGenerator = (cardValues, size = 4) =>{
    gameContainer.innerHTML = "";
    cardValues = [...cardValues, ...cardValues];

    cardValues.sort(() => Math.random() - 0.5);
    for(let i = 0; i < size * size; i++){
        /*
            Create Cards
            frente => front side(Marca da cidade)
            verso => back side(objetos ou personagens)
         */

        gameContainer.innerHTML += `
        <div class="card-container" data-card-value="${
        cardValues[i].name}">
            <div class="card-before">?</div>
            <div class="card-after">
            <img src="${cardValues[i].image}" class="image"/></
            div>
        </div>
        `;
    }

    //Grade
gameContainer.style.gridTemplateColumns = `repeat(${size}, auto)`;

    //cards
cards = document.querySelectorAll(".card-container");
cards.forEach((card) =>{
    card.addEventListener("click", () =>{
        if(!card.classList.contains("matched")){

            card.classList.add("flipped");

            if(!firstCard){

                firstCard = card;
                
                firstCardValue = card.getAttribute
                ("data-card-value");
            }else{
                movesCounter();
                secondCard = card;
                let secondCardValue = card.getAttribute
                ("data-card-value");
                if(firstCardValue == secondCardValue){
                    firstCard.classList.add("matched");
                    secondCard.classList.add("matched");
    
                    firstCard = false;
    
                    winCount += 1;
                    if(winCount == Math.floor(cardValues.length / 2)){
                        result.innerHTML = `<h2>Você Ganhou</h2>
                        <h4> Movimentos: ${movesCount} </h4>`;
    
                        stopGame();
                    }
                }   else{
                    let[tempFirst, tempSecond] = [firstCard, secondCard];
                    firstCard = false;
                    secondCard = false;
                    let delay = setTimeout(() =>{
                        tempFirst.classList.remove("flipped");
                        tempSecond.classList.remove("flipped")
                    }, 500);
                }
              }
        }
        
        });
    });
};


//start game
startButton.addEventListener("click", () =>{
    movesCount = 0;
    time = 0;

    controls.classList.add("hide"),
    stopButton.classList.remove("hide");
    startButton.classList("hide");
    //start timer
    interval = setInterval(timeGenerator, 1000);

    moves.innerHTML = `<span>Moves: </span> 
    ${movesCount}`;

    inicializer();
});

//stop game
stopButton.addEventListener("click", (stopGame = () =>{
    controls.classList.remove("hide");
    stopButton.classList.add("hide");
    startButton.classList.remove("hide");
    clearInterval(interval);

}))

//inicializar valores
const inicializer = () =>{
    result.innerText = "";
    winCount = 0;
    let cardValues = generateRandom();
    console.log(cardValues); 
    matrixGenerator(cardValues)
}

inicializer("");


