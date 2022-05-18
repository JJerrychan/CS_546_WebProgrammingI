const bands = require('./data/bands');
const connection = require('./config/mongoConnection');

async function main() {
  let pinkFloyd = undefined;
  let theBeatles = undefined;
  let linkinPark = undefined;
  try {
    // 1. Create a band of your choice.
    console.log('1. Create a band of your choice.');
    pinkFloyd = await bands.create(
      'Pink Floyd',
      ['Progressive Rock', 'Psychedelic rock', 'Classic Rock'],
      'http://www.pinkfloyd.com',
      'EMI',
      [
        'Roger Waters',
        'David Gilmour',
        'Nick Mason',
        'Richard Wright',
        'Sid Barrett',
      ],
      1965
    );
    // 2. Log the newly created band. (Just that band, not all bands)
    console.log('\n2. Log the newly created band.');
    console.log(pinkFloyd);
  } catch (e) {
    console.error(e);
  }

  try {
    // 3. Create another band of your choice.
    console.log('\n3. Create another band of your choice.');
    theBeatles = await bands.create(
      'The Beatles',
      ['Rock', 'Pop', 'Psychedelia'],
      'http://www.thebeatles.com',
      'Parlophone',
      ['John Lennon', 'Paul McCartney', 'George Harrison', 'Ringo Starr'],
      1960
    );
  } catch (e) {
    console.error(e);
  }

  try {
    // 4. Query all bands, and log them all
    console.log('\n4. Query all bands, and log them all');
    console.log(await bands.getAll());
  } catch (e) {
    console.error(e);
  }

  try {
    // 5. Create the 3rd band of your choice.
    console.log('5. Create the 3rd band of your choice.');
    linkinPark = await bands.create(
      'Linkin Park',
      ['Alternative Rock', 'Pop Rock', 'Alternative Metal'],
      'http://www.linkinpark.com',
      'Warner',
      [
        'Chester Bennington',
        'Rob Bourdon',
        'Brad Delson',
        'Mike Shinoda',
        'Dave Farrell',
        'Joe Hahn',
      ],
      1996
    );
    // 6. Log the newly created 3rd band. (Just that band, not all bands)
    console.log('\n6. Log the newly created 3rd band.');
    console.log(linkinPark);
  } catch (e) {
    console.error(e);
  }

  try {
    // 7. Rename the first band
    console.log('\n7. Rename the first band');
    pinkFloyd = await bands.rename(pinkFloyd._id, 'newName');
    // 8. Log the first band with the updated name.
    console.log('\n8. Log the first band with the updated name.');
    console.log(pinkFloyd);
  } catch (e) {
    console.error(e);
  }

  try {
    // 9. Remove the second band you created.
    console.log('\n9. Remove the second band you created.');
    await bands.remove(theBeatles._id);
  } catch (e) {
    console.error(e);
  }

  try {
    // 10. Query all bands, and log them all
    console.log('\n10. Query all bands, and log them all');
    console.log(await bands.getAll());
  } catch (e) {
    console.error(e);
  }

  try {
    // 11. Try to create a band with bad input parameters to make sure it throws errors.
    console.log(
      '\n11. Try to create a band with bad input parameters to make sure it throws errors.'
    );
    await bands.create(
      'Pink Floyd',
      ['Progressive Rock', 'Psychedelic rock', 'Classic Rock'],
      'www.pinkfloyd.net',
      'EMI',
      ['Roger Waters'],
      true
    );
  } catch (e) {
    console.error(e);
  }

  try {
    // 12. Try to remove a band that does not exist to make sure it throws errors.
    console.log(
      '\n12. Try to remove a band that does not exist to make sure it throws errors.'
    );
    console.log(await bands.remove('6211922a1900'));
  } catch (e) {
    console.error(e);
  }

  try {
    // 13. Try to rename a band that does not exist to make sure it throws errors.
    console.log(
      '\n13. Try to rename a band that does not exist to make sure it throws errors.'
    );
    console.log(await bands.rename(theBeatles._id, 'LOL'));
  } catch (e) {
    console.error(e);
  }

  try {
    // 14. Try to rename a band passing in invalid data for the newName parameter to make sure it throws errors.
    console.log(
      '\n14. Try to rename a band passing in invalid data for the newName parameter to make sure it throws errors.'
    );
    console.log(await bands.rename(linkinPark._id, true));
  } catch (e) {
    console.error(e);
  }

  try {
    // 15. Try getting a band by ID that does not exist to make sure it throws errors.
    console.log(
      '\n15. Try getting a band by ID that does not exist to make sure it throws errors.'
    );
    console.log(await bands.get('adsewfasd'));
  } catch (e) {
    console.error(e);
  }

  await connection.closeConnection();
}

main();
