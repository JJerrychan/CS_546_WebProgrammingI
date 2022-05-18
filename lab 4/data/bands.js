const { ObjectId } = require('mongodb');

const bands = require('../config/mongoCollections').bands;

async function create(
  name,
  genre,
  website,
  recordLabel,
  bandMembers,
  yearFormed
) {
  if (
    !name ||
    !genre ||
    !website ||
    !recordLabel ||
    !bandMembers ||
    !yearFormed
  )
    throw 'all arguments must hava valid values!';
  if (
    typeof name != 'string' ||
    typeof website != 'string' ||
    typeof recordLabel != 'string'
  )
    throw 'name, website and recordLabel must be a String!';
  name = name.trim();
  website = website.trim();
  recordLabel = recordLabel.trim();
  if (name == '' || website == '' || recordLabel == '')
    throw 'name, website and recordLabel cannot be empty!';
  if (!website.match(/^http:\/\/www\..{5,}.com$/gi))
    throw 'the website is not a valid url!';
  if (!Array.isArray(genre) || !Array.isArray(bandMembers))
    throw 'genre and bandMembers must be an Array!';
  if (genre.length < 1 || bandMembers.length < 1)
    throw 'there must be at least one element in both genre and bandMembers!';
  if (typeof yearFormed != 'number' || yearFormed < 1900 || yearFormed > 2022)
    throw 'yearFormed must be a Number and between 1900 and 2022!';
  const bandsCollections = await bands();
  let newBands = {
    name: name,
    genre: genre,
    website: website,
    recordLabel: recordLabel,
    bandMembers: bandMembers,
    yearFormed: yearFormed,
  };
  const insertInfo = await bandsCollections.insertOne(newBands);
  if (insertInfo.insertedCount == 0) throw 'band create failed!';
  const band = await get(insertInfo.insertedId.toString());
  console.log(band);
  return band;
}

async function getAll() {
  const bandsCollections = await bands();
  let all = await bandsCollections.find({}).toArray();
  all.forEach((element) => {
    element._id = element._id.toString();
  });
  return all;
}

function checkId(id) {
  if (!id) throw 'id did not provided!';
  if (typeof id != 'string') throw 'provided id is not a String!';
  id = id.trim();
  if (id == '') throw 'provided id is empty!';
  if (!ObjectId.isValid(id)) throw 'provided id is not a valid ObjectId!';
  let ObjId = new ObjectId(id);
  return ObjId;
}

async function get(id) {
  id = checkId(id);
  const bandsCollections = await bands();
  const band = await bandsCollections.findOne({ _id: id });
  if (!band) throw 'there is no band with that id!';
  band._id = id.toString();
  return band;
}

async function remove(id) {
  const band = await get(id);
  id = checkId(id);
  const bandsCollections = await bands();
  const deleteInfo = await bandsCollections.deleteOne({ _id: id });
  if (deleteInfo.deletedCount == 0)
    throw `Could not delete band with id of ${id}`;
  return `${band.name} has been successfully deleted!`;
}

async function rename(id, newName) {
  id = checkId(id);
  if (typeof newName != 'string') throw `newName must be a string!`;
  newName = newName.trim();
  if (!newName || newName == '') throw 'newName must not empty!';
  const all = await getAll();
  all.forEach((element) => {
    if (element.name == newName) throw `${newName} already existed!`;
  });
  const bandsCollections = await bands();
  const updateInfo = await bandsCollections.updateOne(
    {
      _id: id,
    },
    {
      $set: { name: newName },
    }
  );
  if (updateInfo.modifiedCount == 0) throw 'rename unsuccessfully';
  return await get(id.toString());
}

module.exports = {
  create,
  getAll,
  get,
  remove,
  rename,
};
