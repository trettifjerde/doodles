
function isDigit(char) {
    return char >= "0" && char <= "9";
}
function isLetter(char) {
    return (char >= "A" && char <= "Z") || (char >= "a" && char <= "z");
}

function isValidCharacter(char) {
    return isLetter(char) || isDigit(char);
}

function getBestPassword(str) {
    const words = str.split(' ');
    words.sort((a, b) => b.length - a.length);

    for (const word of words) {
        let isValidWord = true;
        let letterCounter = 0;
        let digitCounter = 0;

        for (const char of word) {
            if (!isValidCharacter(char)) {
                isValidWord = false;
                break;
            }
            else {
                if (isDigit(char))
                    digitCounter++;
                else
                    letterCounter++;
            }
        }

        if (isValidWord && (letterCounter % 2 === 0) && (digitCounter % 2 === 1))
            return word;
    }

    return null;
}

const sentence = "pass007 text2 meowmeow0!";
console.log(getBestPassword(sentence));