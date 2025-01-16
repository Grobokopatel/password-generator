import {generatePassword} from './password-generator.js';

let passwordForm = document.getElementById('password-form');
passwordForm.addEventListener('submit', makeAtLeastOneCheckboxRequired);
passwordForm.addEventListener('submit', generatePasswordAndPasteIt);
passwordForm.addEventListener('submit', analysePassword);
document.getElementById('copy').addEventListener('click', copyPasswordToClipboard);
let passwordLengthRange = document.getElementById('password-length-range');
let passwordLengthField = document.getElementById('password-length');
passwordLengthRange.addEventListener('input', evt => {
    passwordLengthField.value = evt.target.value;
});
passwordLengthField.addEventListener('input', evt => {
    passwordLengthRange.value = evt.target.value;
});

passwordLengthRange.value = passwordLengthField.value;

function makeAtLeastOneCheckboxRequired(evt) {
    let checkedGroupsCount = [...document.getElementsByClassName('characters')].filter(e => e.checked).length;
    if (checkedGroupsCount === 0) {
        evt.preventDefault();
        evt.stopImmediatePropagation();
        alert('Хотя бы одна группа символов должна быть выбрана!');
    }
}

function copyPasswordToClipboard() {
    let password = document.getElementById('password').value;
    navigator.clipboard.writeText(password);
}

function generatePasswordAndPasteIt(evt) {
    evt.preventDefault();
    let elements = document.forms['password-form'].elements;

    document.getElementById('password').value = generatePassword(elements['password-length'].value,
        elements['include-numbers'].checked,
        elements['include-lower-case'].checked,
        elements['include-upper-case'].checked,
        elements['include-special-characters'].checked);
}

document.getElementById('password').addEventListener('input', analysePassword);

async function analysePassword() {
    let password = document.getElementById('password').value;

    let warning = '', passwordStrength = '';
    if (password) {
        document.getElementById('password-strength').textContent = 'Надёжность пароля: …';
        let passwordAnalysis = await new Promise(res => setTimeout(() => res(zxcvbn(password))));
        if (passwordAnalysis.feedback.warning) {
            warning = `Предупреждение: ${passwordAnalysis.feedback.warning}`;
        }
        passwordStrength = `Надёжность пароля: ${passwordAnalysis.score + 1}/5`;
    }

    document.getElementById('password-strength').textContent = passwordStrength;
    document.getElementById('warning').textContent = warning;
}