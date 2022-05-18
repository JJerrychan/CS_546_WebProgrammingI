let description = 'Utils for Obeject';

function makeArrays(arr) {
  if (arguments.length != 1) throw 'number of parameter is wrong';
  if (!Array.isArray(arr)) throw 'it is not an array!';
  if (arr.length == 0) throw 'the array is empty!';
  else if (arr.length < 2) throw 'at least 2 objects in the array!';
  let result = new Array();
  arr.forEach((element) => {
    if (typeof element != 'object') throw `${element} is not an object!`;
    if (Object.keys(element).length == 0) throw 'the object in array is empty!';
    for (const key in element) {
      let arr3 = new Array();
      arr3.push(key);
      arr3.push(element[key]);
      result.push(arr3);
    }
  });
  return result;
}

function isDeepEqual(obj1, obj2) {
  if (arguments.length != 2) throw 'number of parameter is wrong';
  if (typeof obj1 != 'object' || typeof obj2 != 'object')
    throw 'it is not an object!';
  keys1 = Object.keys(obj1);
  keys2 = Object.keys(obj2);
  if (keys1.length != keys2.length) return false;
  let isEqual = true;
  keys1.forEach((key) => {
    if (typeof obj1[key] == 'object' && typeof obj2[key] == 'object') {
      return isDeepEqual(obj1[key], obj2[key]);
    } else if (obj1[key] != obj2[key]) {
      isEqual = false;
      return;
    }
  });
  return isEqual;
}

function computeObject(object, func) {
  if (arguments.length != 2) throw 'number of parameter is wrong';
  if (typeof object != 'object') throw 'it is not an object!';
  if (typeof func != 'function') throw 'it is not a function!';
  let newObj = new Object();
  for (const key in object) {
    if (typeof object[key] != 'number') throw `${object[key]} is not a number!`;
    newObj[key] = func(object[key]);
  }
  return newObj;
}

module.exports = {
  description,
  makeArrays,
  isDeepEqual,
  computeObject,
};
