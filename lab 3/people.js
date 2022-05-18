const axios = require("axios");

async function getData() {
  return await axios.get(
    "https://gist.githubusercontent.com/graffixnyc/a1196cbf008e85a8e808dc60d4db7261/raw/9fd0d1a4d7846b19e52ab3551339c5b0b37cac71/people.json"
  );
}

async function getPersonById(id) {
  if (arguments.length != 1) throw "the number of arguements is wrong!";
  if (typeof id != "string") throw "the id must be a String!";
  if (!id || id.trim() == "") throw "the id is empty!";
  const { data } = await getData();
  for (const iterator of data) {
    if (iterator.id == id) return iterator;
  }
  throw "id not found!";
}

async function sameEmail(emailDomain) {
  if (arguments.length != 1) throw "the number of arguements is wrong!";
  if (typeof emailDomain != "string") throw "the emailDomain must be a String!";
  if (!emailDomain || emailDomain.trim() == "")
    throw "the emailDomain is empty!";
  emailDomain = emailDomain.trim().toLowerCase();
  let subDomain = emailDomain.match(/\.[A-z]*/gi);
  if (!subDomain) throw "the emailDomain must include a '.'!";
  else {
    subDomain.forEach((element) => {
      if (element.length < 3)
        throw "the emailDomain must have at LEAST 2 LETTERS after the dot!";
    });
  }
  const { data } = await getData();
  let result = [];
  for (const iterator of data) {
    if (iterator.email.endsWith("@" + emailDomain)) result.push(iterator);
  }
  if (result.length <= 1) throw "less than 2 people have the same email domain";
  else return result;
}

async function manipulateIp() {
  const { data } = await getData();
  let nameIp = [];
  for (const iterator of data) {
    let iNum = iterator["ip_address"].replace(/\./g, "");
    iNum = Number(Array.from(iNum).sort().join(""));
    nameIp.push({
      firstName: iterator["first_name"],
      lastName: iterator["last_name"],
      iNum: iNum,
    });
  }
  let max = nameIp[0];
  let min = nameIp[0];
  let sum = 0;
  nameIp.forEach((element) => {
    if (element["iNum"] > max["iNum"]) max = element;
    if (element["iNum"] < min["iNum"]) min = element;
    sum += element["iNum"];
  });
  avg = Math.floor(sum / nameIp.length);
  delete max["iNum"];
  delete min["iNum"];
  return {
    highest: max,
    lowest: min,
    average: avg,
  };
}

async function sameBirthday(month, day) {
  if (arguments.length != 2) throw "the number of arguements is wrong!";
  if (!Number(month) || !Number(day)) throw "the month and day must be number!";
  if (month > 12 || month < 1)
    throw "month must less than or equal to 12 and more than 0!";
  switch (month) {
    case 2:
      if (day >= 29 || day < 1)
        throw "the day of February should be less than 29!";
      break;
    case 1:
    case 3:
    case 5:
    case 7:
    case 8:
    case 10:
    case 12:
      if (day > 31 || day < 1)
        throw "the day of bigger month should be less than or equal to 31!";
      break;
    default:
      if (day > 30 || day < 1)
        throw "the day of common month should be less than or equal to 30!";
      break;
  }
  const { data } = await getData();
  let nameBirth = [];
  for (const iterator of data) {
    let birth = new Date(iterator["date_of_birth"]);
    nameBirth.push({
      name: iterator["first_name"] + " " + iterator["last_name"],
      month: birth.getMonth() + 1,
      day: birth.getDate(),
    });
  }
  let result = [];
  nameBirth.forEach((element) => {
    if (element["month"] == month && element["day"] == day)
      result.push(element["name"]);
  });
  if (result.length < 1) throw "nobody have the same birthday";
  return result;
}

module.exports = {
  getPersonById,
  sameEmail,
  manipulateIp,
  sameBirthday,
};
