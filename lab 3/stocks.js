const axios = require('axios');
async function getData(s) {
  if (s == 'people') {
    const { data } = await axios.get(
      'https://gist.githubusercontent.com/graffixnyc/a1196cbf008e85a8e808dc60d4db7261/raw/9fd0d1a4d7846b19e52ab3551339c5b0b37cac71/people.json'
    );
    return data;
  }
  if (s == 'stocks') {
    const { data } = await axios.get(
      'https://gist.githubusercontent.com/graffixnyc/8c363d85e61863ac044097c0d199dbcc/raw/7d79752a9342ac97e4953bce23db0388a39642bf/stocks.json'
    );
    return data;
  }
}

async function listShareholders(stockName) {
  if (arguments.length != 1) throw 'the number of arguements is wrong!';
  if (typeof stockName != 'string') throw 'the stockName must be a String!';
  if (!stockName || stockName.trim() == '') throw 'the stockName is empty!';
  const data = await getData('stocks');
  for (const iterator of data) {
    if (iterator['stock_name'] == stockName) return iterator;
  }
  throw `${stockName} not found!`;
}

async function totalShares(stockName) {
  let stock = await listShareholders(stockName);
  let shareHolders = stock['shareholders'];
  let count = shareHolders.length;
  let total = 0;
  shareHolders.forEach((element) => {
    total += element['number_of_shares'];
  });
  switch (count) {
    case 0:
      return `${stockName}, currently has no shareholders.`;
    case 1:
      return `${stockName}, has 1 shareholder that owns a total of ${total} shares.`;
    default:
      return `${stockName}, has ${count} shareholders that own a total of ${total} shares.`;
  }
}

async function listStocks(firstName, lastName) {
  if (arguments.length != 2) throw 'the number of arguements is wrong!';
  if (typeof firstName != 'string' || typeof lastName != 'string')
    throw 'the firstName and lastname must be a String!';
  if (
    !firstName ||
    firstName.trim() == '' ||
    !lastName ||
    lastName.trim() == ''
  )
    throw 'the firstName and lastname cannot be empty!';
  const people = await getData('people');
  const stocks = await getData('stocks');
  let holderId = String();
  for (const iterator of people) {
    if (
      iterator['first_name'] == firstName &&
      iterator['last_name'] == lastName
    )
      holderId = iterator['id'];
  }
  if (holderId.length < 1) throw 'people not found!';
  let result = [];
  for (const iterator of stocks) {
    let shareHolders = iterator['shareholders'];
    shareHolders.forEach((element) => {
      if (element['userId'] == holderId) {
        result.push({
          stock_name: iterator['stock_name'],
          number_of_shares: element['number_of_shares'],
        });
      }
    });
  }
  if (result.length < 1)
    throw `${firstName} ${lastName} do not have any stocks!`;
  else return result;
}

async function getStockById(id) {
  if (arguments.length != 1) throw 'the number of arguements is wrong!';
  if (typeof id != 'string') throw 'the id must be a String!';
  if (!id || id.trim() == '') throw 'the id is empty!';
  const data = await getData('stocks');
  for (const iterator of data) {
    if (iterator['id'] == id) return iterator;
  }
  throw 'stock not found!';
}

module.exports = {
  listShareholders,
  totalShares,
  listStocks,
  getStockById,
};
