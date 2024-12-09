import {generatePassword} from './password-generator.js';

document.getElementById('password-generator').addEventListener('submit', generatePasswordAndPasteIt);
document.getElementById('password-generator').addEventListener('submit', analysePassword);
document.getElementById('copy').addEventListener('click', copyPasswordToClipboard);

function copyPasswordToClipboard() {
    let password = document.getElementById('password').value;
    navigator.clipboard.writeText(password);
}

function generatePasswordAndPasteIt(evt) {
    evt.preventDefault();
    let form = document.forms['password-generator'];
    let {useNumbers, useLowerCase, useUpperCase, useSymbols, passwordLength} = form.elements;
    document.getElementById('password').value = generatePassword(passwordLength.value, useNumbers.checked, useLowerCase.checked, useUpperCase.checked, useSymbols.checked);
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