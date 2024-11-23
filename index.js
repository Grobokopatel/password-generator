generate.addEventListener('click', handleClick);

function handleClick() {
    let form = document.forms[0];
    let {numbers, lowerCase, upperCase, symbols, passwordLength} = form.elements;
    document.getElementById('password').value = generatePassword(passwordLength.value, numbers.checked, lowerCase.checked, upperCase.checked, symbols.checked);
}

const numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
const lowerCase = [
    'a', 'b', 'c', 'd', 'e', 'f',
    'g', 'h', 'i', 'j', 'k', 'l',
    'm', 'n', 'o', 'p', 'q', 'r',
    's', 't', 'u', 'v', 'w', 'x',
    'y', 'z'
];
const upperCase = [
    'A', 'B', 'C', 'D', 'E', 'F',
    'G', 'H', 'I', 'J', 'K', 'L',
    'M', 'N', 'O', 'P', 'Q', 'R',
    'S', 'T', 'U', 'V', 'W', 'X',
    'Y', 'Z'
];
const symbols = ['$', '^', '&', '?', '*', '%', '#', '@', '!', '(', ')', '_', '-', '+'];
const characterGroups = [numbers, lowerCase, upperCase, symbols];

export function generatePassword(length, includeNumbers = false, includeLowercase = false, includeUppercase = false, includeSymbols = false) {
    if (length < 1) {
        throw new TypeError(`Password length must be greater than 0, got ${length}`);
    }
    let passwordCharacters = new Array(length);
    let flags = [includeNumbers, includeLowercase, includeUppercase, includeSymbols];
    let usedCharacterGroups = [];
    for (let i = 0; i < flags.length; ++i) {
        if (flags[i]) {
            usedCharacterGroups.push(characterGroups[i]);
        }
    }
    if (usedCharacterGroups.length === 0) {
        throw new TypeError(`You must specify at least 1 character group`);
    }
    usedCharacterGroups = shuffle(usedCharacterGroups);

    let j = 0;
    for (let i = 0; i < length; ++i) {
        let characterGroup = usedCharacterGroups[j];
        passwordCharacters[i] = characterGroup[getRandomIntegerInRange(0, characterGroup.length - 1)];
        j = (j + 1) % usedCharacterGroups.length;
    }

    return shuffle(passwordCharacters).join('');
}

function shuffle(arr) {
    let result = [...arr];
    for (let i = 0; i < result.length; ++i) {
        let j = getRandomIntegerInRange(0, result.length - 1);
        [result[i], result[j]] = [result[j], result[i]];
    }

    return result;
}

function getRandomIntegerInRange(lowerBound, upperBound) {
    if (lowerBound > upperBound) {
        throw new TypeError(`Lower bound should be less or equal to upper bound: lower bound: ${lowerBound}, upper bound ${upperBound}`);
    }
    return lowerBound + Math.floor((upperBound - lowerBound + 1) * Math.random());
}