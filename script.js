const images = [
    "photo01.jpg",
    "photo02.jpg",
    "photo03.jpg",
    "photo04.jpg",
    "photo05.jpg",
    "photo06.jpg",
    "photo07.jpg",
    "photo08.jpg",
    "photo09.jpg",
    "photo10.jpg",
    "photo11.jpg",
    "photo12.jpg",
    "photo13.jpg",
    "photo14.jpg",
    "photo15.jpg",
    "photo16.jpg",
    "photo17.jpg",
    "photo18.jpg"
];

const gameImages = [...images, ...images];

let firstCard = null;
let secondCard = null;
let lockBoard = false;

let moves = 0;
let matches = 0;
let seconds = 0;

const board = document.getElementById("game-board");

shuffle(gameImages);

createBoard();

setInterval(() => {
    seconds++;
    document.getElementById("timer").textContent = seconds;
}, 1000);

function createBoard() {

    gameImages.forEach(image => {

        const card = document.createElement("div");

        card.classList.add("card");
        card.classList.add("hidden");

        card.dataset.image = image;

        const img = document.createElement("img");

        img.src = "images/" + image;

        card.appendChild(img);

        card.addEventListener("click", flipCard);

        board.appendChild(card);

    });

}

function flipCard() {

    if (lockBoard) return;

    if (this === firstCard) return;

    if (this.classList.contains("matched")) return;

    this.classList.remove("hidden");

    if (!firstCard) {

        firstCard = this;
        return;

    }

    secondCard = this;

    moves++;

    document.getElementById("moves").textContent = moves;

    checkForMatch();

}

function checkForMatch() {

    const isMatch =
        firstCard.dataset.image ===
        secondCard.dataset.image;

    if (isMatch) {

        firstCard.classList.add("matched");
        secondCard.classList.add("matched");

        matches++;

        resetBoard();

        if (matches === 18) {

            setTimeout(() => {

                document.getElementById("stats").innerHTML =
                    `🎉 Completed in ${moves} moves and ${seconds} seconds!`;

            }, 500);

        }

    } else {

        lockBoard = true;

        setTimeout(() => {

            firstCard.classList.add("hidden");
            secondCard.classList.add("hidden");

            resetBoard();

        }, 1000);

    }

}

function resetBoard() {

    firstCard = null;
    secondCard = null;
    lockBoard = false;

}

function shuffle(array) {

    for (let i = array.length - 1; i > 0; i--) {

        const j = Math.floor(
            Math.random() * (i + 1)
        );

        [array[i], array[j]] =
        [array[j], array[i]];

    }

}