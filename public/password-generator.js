const numbers = '0123456789';
const lowerCase = 'abcdefghijklmnopqrstuvwxyz';
const upperCase = lowerCase.toUpperCase();
const specialCharacters = `!"#$%&\\'()*+,-./:;<=>?@[]^_\`{|}~`;
const characterGroups = [numbers, lowerCase, upperCase, specialCharacters];

export function generatePassword(length, includeNumbers = false, includeLowercase = false, includeUppercase = false, includeSpecialCharacters = false) {
    if (length < 1) {
        throw new TypeError(`Password length must be greater than 0, got ${length}`);
    }
    let flags = [includeNumbers, includeLowercase, includeUppercase, includeSpecialCharacters];
    let includedCharacterGroups = [];
    for (let i = 0; i < flags.length; ++i) {
        if (flags[i]) {
            includedCharacterGroups.push(characterGroups[i]);
        }
    }
    if (includedCharacterGroups.length === 0) {
        throw new TypeError(`You must specify at least 1 character group`);
    }
    includedCharacterGroups = shuffle(includedCharacterGroups);

    let passwordCharacters = new Array(length);
    let characterGroupIndex = 0;
    for (let i = 0; i < length; ++i) {
        let characterGroup = includedCharacterGroups[characterGroupIndex];
        passwordCharacters[i] = characterGroup[getRandomIntegerInRange(0, characterGroup.length - 1)];
        characterGroupIndex = (characterGroupIndex + 1) % includedCharacterGroups.length;
    }

    return shuffle(passwordCharacters).join('');
}

function shuffle(iterable) {
    let result = [...iterable];
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