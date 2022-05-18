let description = 'Utils for array';

function mean(array) {
  if (arguments.length != 1) throw 'number of parameter is wrong';
  if (typeof array == 'undefined') throw 'the array does not exist!';
  if (!Array.isArray(array)) throw 'it is not an array!';
  if (array.length == 0) throw 'the array is empty!';
  let sum = 0;
  array.forEach((element) => {
    if (typeof element != 'number') throw `${element} is not a number`;
    sum += element;
  });
  return sum / array.length;
}

function medianSquared(array) {
  if (arguments.length != 1) throw 'number of parameter is wrong';
  if (typeof array == 'undefined') throw 'the array does not exist!';
  if (!Array.isArray(array)) throw 'it is not an array!';
  if (array.length == 0) throw 'the array is empty!';
  array.forEach((element) => {
    if (typeof element != 'number') throw `${element} is not a number`;
  });
  array.sort();
  let median;
  if (array.length % 2 == 0) {
    median = (array[array.length / 2] + array[array.length / 2 - 1]) / 2;
  } else {
    median = array[Math.floor(array.length / 2)];
  }
  return Math.pow(median, 2);
}

function maxElement(array) {
  if (arguments.length != 1) throw 'number of parameter is wrong';
  if (array.length == 0) throw 'the array is empty!';
  array.forEach((element) => {
    if (typeof element != 'number') throw `${element} is not a number`;
  });
  let max = Math.max(...array);
  let maxindex = array.indexOf(max);
  let maxElement = new Object();
  maxElement[max] = maxindex;
  return maxElement;
}

function fill(end, value) {
  if (arguments.length != 1 && arguments.length != 2)
    throw 'number of parameter is wrong';
  if (typeof end == 'undefined') throw 'the parameter end does not exist!';
  if (typeof end != 'number') throw `${end} is not a number!`;
  if (end <= 0) throw `${end} should not be less than 0!`;
  if (value || value == 0) {
    let array = new Array(end);
    array.fill(value);
    return array;
  } else {
    let array = new Array(end);
    for (let i = 0; i < end; i++) {
      array[i] = i;
    }
    return array;
  }
}

function countRepeating(array) {
  if (arguments.length != 1) throw 'number of parameter is wrong';
  if (typeof array == 'undefined') throw 'the array does not exist!';
  if (!Array.isArray(array)) throw 'it is not an array!';
  let repeat = new Object();
  for (let i = 0; i < array.length; i++) {
    let element = String(array[i]);
    if (repeat[element]) repeat[element]++;
    else repeat[element] = 1;
  }
  for (const key in repeat) {
    if (repeat[key] == 1) delete repeat[key];
  }
  return repeat;
}

function isEqual(arrayOne, arrayTwo) {
  if (arguments.length != 2) throw 'number of parameter is wrong';
  if (!Array.isArray(arrayOne) || !Array.isArray(arrayTwo))
    throw 'it is not an array!';
  if (arrayOne.length != arrayTwo.length) return false;
  for (let i = 0; i < arrayOne.length; i++) {
    if (Array.isArray(arrayOne[i]) && Array.isArray(arrayTwo[i])) {
      arrayOne[i].sort();
      arrayTwo[i].sort();
    }
  }
  return arrayOne.sort().toString() == arrayTwo.sort().toString();
}

module.exports = {
  description,
  mean,
  medianSquared,
  maxElement,
  fill,
  countRepeating,
  isEqual,
};
