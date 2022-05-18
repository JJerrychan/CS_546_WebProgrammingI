const people = require('./people');
const stocks = require('./stocks');

async function main() {
  try {
    console.log('1. getPersonById');
    console.log(
      await people.getPersonById('7989fa5e-8f3f-458d-ad58-23c8d9ef5a10')
    );
  } catch (e) {
    console.error(e);
  }

  try {
    console.log('\n2. sameEmail');
    console.dir(await people.sameEmail('unblog.fr'), { depth: null });
  } catch (e) {
    console.error(e);
  }

  try {
    console.log('\n3. manipulateIp');
    console.dir(await people.manipulateIp());
  } catch (e) {
    console.error(e);
  }

  try {
    console.log('\n4. sameBirthday');
    console.dir(await people.sameBirthday('2', true));
  } catch (e) {
    console.error(e);
  }

  try {
    console.log('\n5. listShareholders');
    console.log(await stocks.listShareholders('Selecta Biosciences, Inc.'));
  } catch (e) {
    console.error(e);
  }

  // try {
  //   console.log('\n6. totalShares');
  //   console.log(await stocks.totalShares('Aeglea BioTherapeutics, Inc.'));
  // } catch (e) {
  //   console.error(e);
  // }

  // try {
  //   console.log('\n7. listStocks');
  //   console.log(await stocks.listStocks("Abbey", "Hindhaugh"));
  // } catch (e) {
  //   console.error(e);
  // }

  // try {
  //   console.log('\n8. getStockById');
  //   console.log(
  //     await stocks.getStockById('f652f797-7ca0-4382-befb-2ab8be914ff0')
  //   );
  // } catch (e) {
  //   console.error(e);
  // }
}

main();
