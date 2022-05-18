const questionOne = function questionOne(arr) {
  // Implement question 1 here
  let result = 0;
  arr.forEach((element) => {
    result += Math.pow(element, 2);
  });
  return result;
};

const questionTwo = function questionTwo(num) {
  // Implement question 2 here
  if (num < 1) return 0;
  else if (num <= 2) return 1;
  let num1 = 1,
    num2 = 1,
    value = 0;
  for (let i = 2; i < num; i++) {
    value = num1 + num2;
    num2 = num1;
    num1 = value;
  }
  return value;
};

const questionThree = function questionThree(text) {
  // Implement question 3 here
  let vowels = 0;
  for (const key of text) {
    if (key == "a") vowels++;
    else if (key == "e") vowels++;
    else if (key == "i") vowels++;
    else if (key == "o") vowels++;
    else if (key == "u") vowels++;
  }
  return vowels;
};

const questionFour = function questionFour(num) {
  // Implement question 4 here
  let last0 = 1,
    last1 = 1,
    factorial;
  if (num < 0) return factorial;
  else if (num == 0) return 1;
  for (let i = 0; i < num; i++) {
    factorial = last0 * last1;
    last0++;
    last1 = factorial;
  }
  return factorial;
};

module.exports = {
  firstName: "Junjie",
  lastName: "Chen",
  studentId: "10476718",
  questionOne,
  questionTwo,
  questionThree,
  questionFour,
};
