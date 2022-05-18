let submit = document.getElementById('submit');
let input = document.getElementById('number');
let list = document.getElementById('attempts');
let form = document.getElementById('form');
let errorDiv = document.getElementById('error');

if (submit) {
  submit.addEventListener('click', (event) => {
    event.preventDefault();
    if (inputCheck(input.value)) {
      input.classList.remove('inputError');
      errorDiv.hidden = true;
      let li = document.createElement('li');
      if (isPrime(input.value)) {
        li.innerHTML = `${input.value} is a prime number`;
        li.className = 'is-prime';
      } else {
        li.innerHTML = `${input.value} is NOT a prime number`;
        li.className = 'not-prime';
      }
      form.reset();
      list.appendChild(li);
      input.focus();
    } else {
      input.value = '';
      errorDiv.hidden = false;
      errorDiv.innerHTML = 'You must enter a valid value!';
      input.focus();
      input.className = 'inputError';
    }
  });
}

function isPrime(value) {
  if (value > 1) {
    for (let i = 2; i < value; i++) {
      if (value % i == 0) {
        return false;
      }
    }
    return true;
  } else return false;
}

function inputCheck(input) {
  input = input.trim();
  if (typeof Number(input) != 'number') return false;
  if (input == '') return false;
  return true;
}
