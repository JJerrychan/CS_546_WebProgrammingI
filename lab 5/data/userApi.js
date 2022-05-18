const axios = require('axios');

async function getPeople() {
  const { data } = await axios.get(
    'https://gist.githubusercontent.com/graffixnyc/31e9ef8b7d7caa742f56dc5f5649a57f/raw/43356c676c2cdc81f81ca77b2b7f7c5105b53d7f/people.json'
  );
  return data;
}

async function getWork() {
  const { data } = await axios.get(
    'https://gist.githubusercontent.com/graffixnyc/febcdd2ca91ddc685c163158ee126b4f/raw/c9494f59261f655a24019d3b94dab4db9346da6e/work.json'
  );
  return data;
}

function checkId(id) {
  id = Number(id.trim());
  if (Number.isNaN(id)) throw 'id must be a number!';
  if (id < 0 || !Number.isInteger(id))
    throw 'id must be a positive integer number!';
  return id;
}

async function getPeopleByID(id) {
  id = checkId(id);
  const data = await getPeople();
  for (const iterator of data) {
    if (iterator.id == id) {
      return iterator;
    }
  }
  throw 'Cannot find people by this id';
}

async function getWorkByID(id) {
  id = checkId(id);
  const data = await getWork();
  for (const iterator of data) {
    if (iterator.id == id) {
      return iterator;
    }
  }
  throw 'Cannot find work by this id';
}

module.exports = {
  getPeople,
  getWork,
  getPeopleByID,
  getWorkByID,
};
