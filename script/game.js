const Game = {
    cartoons: [
        "shrek",
        "gaara",
        "gary",
        "goku",
        "jeff",
        "jiraya",
        "maggie",
        "rickmorty",
        "sasuke",
        "bob",
    ],

    cards: null,

    init: function () {
        Game.createCards();
        Game.shuffleCards();
    },

    createCards: function () {
        this.cards = [];

        this.cartoons.forEach((cartoon) => {
            this.cards = [...this.cards, ...this.createPairOfCards(cartoon)];
        });
    },

    createPairOfCards: function (cartoon) {
        return [
            {
                id: this.createId(cartoon),
                icon: cartoon,
                flipped: false,
            },
            {
                id: this.createId(cartoon),
                icon: cartoon,
                flipped: false,
            },
        ];
    },

    createId: function (cartoon) {
        return cartoon + Math.random().toFixed(4).slice(2, 6);
    },

    shuffleCards: function () {
        let currentIndex = this.cards.length;
        let randomIndex = 0;

        while (currentIndex !== 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            [this.cards[randomIndex], this.cards[currentIndex]] = [
                this.cards[currentIndex],
                this.cards[randomIndex],
            ];
        }
    },

    // Regras de negócio

    lockMode: false,
    firstCard: null,
    secondCard: null,

    selectCard: function (id) {
        let card = this.cards.filter((card) => card.id === id)[0];
        // console.log(card);

        if (card.flipped || this.lockMode) {
            return false;
        }

        if (!this.firstCard) {
            this.firstCard = card;
            this.firstCard.flipped = true;
            return true;
        } else {
            this.secondCard = card;
            this.secondCard.flipped = true;
            this.lockMode = true;
            return true;
        }
    },

    checkMatch: function () {
        // console.log("first: ", this.firstCard);
        // console.log("second: ", this.secondCard);

        if (!this.firstCard || !this.secondCard) {
            return false;
        }
        return this.firstCard.icon == this.secondCard.icon;
    },

    clearSelection: function () {
        this.firstCard = null;
        this.secondCard = null;
        this.lockMode = false;
    },

    unflipCards: function () {
        this.firstCard.flipped = false;
        this.secondCard.flipped = false;
    },

    // Fim de jogo

    checkGameOver: function () {
        let cardsNotFlipped = this.cards.filter((card) => !card.flipped);
        // console.log(cardsNotFlipped);
        return cardsNotFlipped.length == 0;
    },
};