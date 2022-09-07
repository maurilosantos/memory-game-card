document.addEventListener("DOMContentLoaded", () => {
    const FRONT = "card_front";
    const BACK = "card_back";
    const CARD = "card";

    const gameBoard = document.querySelector("#gameBoard");
    const gameOverModal = document.querySelector("#gameOver");
    const restartButton = document.querySelector("#restart");

    function renderBoard(cards) {
        // console.log(cards);
        gameBoard.innerHTML = "";

        cards.forEach((card) => {
            // console.log(card);
            let cardElement = document.createElement("div");
            cardElement.id = card.id;
            cardElement.classList.add(CARD);
            cardElement.dataset.icon = card.icon;

            createCardContent(card, cardElement);

            cardElement.addEventListener("click", flipCard);

            gameBoard.appendChild(cardElement);
        });
    }

    function createCardContent(card, cardElement) {
        createCardFace(FRONT, card, cardElement);
        createCardFace(BACK, card, cardElement);
    }

    function createCardFace(face, card, cardElement) {
        let cardElementFace = document.createElement("div");
        cardElementFace.classList.add(face);

        if (face === FRONT) {
            cardElementFace.innerHTML = `
                <img
                    class="icon"
                    src="./assets/images/${card.icon}.png"
                    alt="${card.icon}"
                />
            `;
        } else {
            cardElementFace.innerHTML = `🤔`;
        }

        cardElement.appendChild(cardElementFace);
    }

    function flipCard() {
        // console.log(this);
        if (Game.selectCard(this.id)) {
            this.classList.add("flip");

            if (Game.secondCard) {
                let firstCard = document.querySelector(`#${Game.firstCard.id}`);
                let secondCard = document.querySelector(
                    `#${Game.secondCard.id}`
                );

                if (Game.checkMatch()) {
                    // console.log("match");
                    setTimeout(() => {
                        firstCard.firstElementChild.classList.add("match");
                        secondCard.firstElementChild.classList.add("match");
                    }, 500);
                    setTimeout(() => {
                        firstCard.firstElementChild.classList.add("fade");
                        secondCard.firstElementChild.classList.add("fade");
                    }, 1000);
                    Game.clearSelection();
                    if (Game.checkGameOver()) {
                        gameOverModal.style.display = "flex";
                    }
                } else {
                    setTimeout(() => {
                        firstCard.classList.remove("flip");
                        secondCard.classList.remove("flip");
                        Game.unflipCards();
                        Game.clearSelection();
                    }, 750);
                }
            }
        }
    }

    const GameHandler = {
        startGame: function () {
            Game.init();
            renderBoard(Game.cards);

            restartButton.addEventListener("click", GameHandler.restartGame);
        },

        restartGame: function () {
            Game.clearSelection();
            GameHandler.startGame();
            gameOverModal.style.display = "none";
        },
    };

    GameHandler.startGame();
});