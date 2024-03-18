const wordList = [
    "clues",
    "house",
    "jagex",
    "elder",
    "kodai",
    "claws",
    "robin",
    "seers",
    "bolts",
    "darts",
    "salve",
    "zammy",
    "zaros",
    "baron",
    "golem",
    "mines",
    "scape",
    "blood",
    "wrath",
    "runes",
    "chaos",
    "quest",
    "diary",
    "maxed",
    "raids",
    "magic",
    "emote",
    "lunge",
    "crush",
    "akkha",
    "scavs",
    "beast",
    "ahrim",
    "karil",
    "verac",
    "torag",
    "pures",
    "irons",
    "mains",
    "craft",
    "thief",
    "herbs",
    "smith",
    "herbi",
    "ranks",
    "music",
    "track",
    "capes",
    "clans",
    "drops",
    "trade",
    "scale",
    "onion",
    "altar",
    "lunar",
    "party",
    "flick",
    "venom",
    "ashes",
    "marks",
    "roofs",
    "death",
    "water",
    "xeric",
    "glory",
    "rings",
    "smoke",
    "joint",
    "steam",
    "earth",
    "hilts",
    "sword",
    "teles",
    "super",
    "range",
    "melee",
    "heart",
    "brews",
    "stams",
    "antis",
    "drags",
    "wildy",
    "artio",
    "venny",
    "karam",
    "monks",
    "snare",
    "stars",
    "click",
    "chins",
    "dinhs"
]

var wordArray = [];

// random number to pick a game word and split the word into an array of letters
function pickWord() {
    var randomIndex = Math.round(Math.random() * (wordList.length - 1));
    var gameWord = wordList[randomIndex];
    for (var i = 0; i < 5; i++) {
        wordArray[i] = gameWord.charAt(i);
    }
    console.log(wordArray);
}

// initializing the user word array to compare to game word later
var userWordArray = [];

// initializing a game start variable and level for each try at guessing the word
var gameStart = false;
var level = 0;
var score = 0;

$("#start-button").on("click", function () {
    if (!gameStart) {
        gameStart = true;
        pickWord();
        level = 1;
        play();
        $("#start-button h2").text("Restart Game");
    } else {
        restart();
    }
});

function restart() {
    $(".grid-element").text("X").removeClass("wrong-place correct");
    wordArray = [];
    userWordArray =[];
    pickWord();
    level = 1;
}

function play() {
    var k = 1;
    $(document).keydown(function (ev) {
        if (userWordArray.length < 5) {
            if(ev.keyCode > 64 && ev.keyCode < 91) {
                userWordArray.push(ev.key);
                $("." + level + "-" + (userWordArray.length)).text(ev.key);
            } else if (userWordArray.length !== 0 && ev.keyCode === 8) {
                userWordArray.pop();
                $("." + level + "-" + (userWordArray.length + 1)).text("X");
            }
        }

        if (userWordArray.length === 5) {
            validate(userWordArray);
            userWordArray = [];
            level++;
        }
    });
}

function validate(userInput) {
    var markedWrongPlace = []; // Array to keep track of letters already marked as "wrong place"
    var markedCorrect = [];

    for (var j = 0; j < 5; j++) {
        if (userInput[j].toLowerCase() === wordArray[j]) {
            $("." + level + "-" + (j+1)).addClass("correct");
            markedCorrect.push(userInput[j].toLowerCase());
        } else if (wordArray.includes(userInput[j].toLowerCase())) {
            // Find the index of the guessed letter in the wordArray
            var indexInWord = wordArray.indexOf(userInput[j].toLowerCase());

            // Check if the letter exists in the wordArray but is in a different position
            if (indexInWord !== -1 && indexInWord !== j) {
                // Check if the letter is not already marked as "correct" or "wrong place"
                if (!markedWrongPlace.includes(userInput[j].toLowerCase()) && !markedCorrect.includes(userInput[j].toLowerCase())) {
                    $("." + level + "-" + (j+1)).addClass("wrong-place");
                    markedWrongPlace.push(userInput[j].toLowerCase()); // Add the letter to the marked list
                }
            }
        }
    }

    var userWord = userInput.join("");
    var word = wordArray.join("");
    if (userWord.toLowerCase() === word) {
        score++;
        $("#score-count").text(score);
    } else if (level === 6) {
        $("#correction").text("The word was: " + word);
    }
}