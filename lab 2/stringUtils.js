let description = 'Utils for String';

function camelCase(string) {
  if (arguments.length != 1) throw 'number of parameter is wrong';
  if (typeof string != 'string') throw `${string} is not a string!`;
  let camel = string.trim().toLowerCase();
  if (!camel) throw 'invalid input!';
  camel = camel.replace(/\s[A-z]/g, (match) => {
    return match.toUpperCase();
  });
  return camel.replace(/\s/g, '');
}

function replaceChar(string) {
  if (arguments.length != 1) throw 'number of parameter is wrong';
  if (typeof string != 'string') throw `${string} is not a string!`;
  string = string.trim();
  if (!string) throw 'invalid input!';
  let firstL = string.charAt(0);
  let regExp = new RegExp(firstL, 'ig');
  let n = 0;
  string = string.replace(regExp, (match) => {
    if (n == 0) {
      n++;
      return match;
    } else if (n % 2 == 1) {
      n++;
      return '*';
    } else {
      n++;
      return '$';
    }
  });
  return string;
}

function mashUp(string1, string2) {
  if (arguments.length != 2) throw 'number of parameter is wrong';
  if (typeof string1 != 'string' || typeof string2 != 'string')
    throw 'it is not a string!';
  string1 = string1.trim();
  string2 = string2.trim();
  if (string1.length < 2 || string2.length < 2)
    throw 'the length of parameter is less than 2!';
  let f1 = string1.substring(0, 2);
  let f2 = string2.substring(0, 2);
  string1 = string1.replace(f1, f2);
  string2 = string2.replace(f2, f1);
  let result = string1+" "+string2;
  return result;
}

module.exports = {
  description,
  camelCase,
  replaceChar,
  mashUp,
};
