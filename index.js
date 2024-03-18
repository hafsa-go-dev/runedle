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
    "karam",
    "monks",
    "snare",
    "stars",
    "click",
    "chins",
    "dinhs",
    "santa",
    "elven",
    "sewer",
    "arena",
    "block",
    "tears"
]

var wordArray = [];

// random number to pick a game word and split the word into an array of letters
function pickWord() {
    var randomIndex = Math.round(Math.random() * (wordList.length - 1));
    var gameWord = wordList[randomIndex];
    for (var i = 0; i < 5; i++) {
        wordArray[i] = gameWord.charAt(i);
    }
}

// initializing the user word array to compare to game word later
var userWordArray = [];

// initializing a game start variable and level for each try at guessing the word
var gameStart = false;
var level = 0;
var score = 0;
var markedCorrect = [];
var markedWrong = [];

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
    userWordArray = [];
    pickWord();
    level = 1;
}

function play() {
    var k = 1;
    $(document).keydown(function (ev) {
        if (userWordArray.length < 5) {
            if (ev.keyCode > 64 && ev.keyCode < 91) {
                userWordArray.push(ev.key);
                $("." + level + "-" + (userWordArray.length)).text(ev.key);
            } else if (userWordArray.length !== 0 && ev.keyCode === 8) {
                userWordArray.pop();
                $("." + level + "-" + (userWordArray.length + 1)).text("X");
            }
        }

        if (userWordArray.length === 5) {
            validateWordArray(userWordArray);
            userWordArray = [];
            markedCorrect = [];
            markedWrong = [];
            level++;
        }
    });
}

function validateWordArray(userWord) {

    for (var k = 0; k < 5; k++) {
        var userL = userWord[k].toLowerCase();
        if (userL === wordArray[k]) {
            $("." + level + "-" + (k + 1)).addClass("correct");
            markedCorrect.push(userL);
        }
    }


    for (var j = 0; j < 5; j++) {

        var userLetter = userWord[j].toLowerCase();

        var letterCtArr = wordArray.filter((letter) => letter === userLetter);
        var letterCt = letterCtArr.length;

        var lettersMarkedCorrectArr = markedCorrect.filter((letter) => letter === userLetter);
        var lettersMarkedCorrectCt = lettersMarkedCorrectArr.length;

        var letterMarkedWrongArr = markedWrong.filter((letter) => letter === userLetter);
        var letterMarkedWrongCt = letterMarkedWrongArr.length;

        if ((lettersMarkedCorrectCt + letterMarkedWrongCt) < letterCt) {
            if (!$("." + level + "-" + (j + 1)).hasClass("correct")) {

                $("." + level + "-" + (j + 1)).addClass("wrong-place");
                markedWrong.push(userLetter); // Add the letter to the marked list
            }
        }
    }

    userWordArray = [];
    markedCorrect = [];
    markedWrong = [];

    var userWordJoined = userWord.join("");
    var word = wordArray.join("");

    if (userWordJoined.toLowerCase() === word) {
        score++;
        $("#score-count").text(score);
    } else if (level === 6) {
        $("#correction").text("The word was: " + word);
    }
}