const { ObjectId } = require('mongodb');
const bands = require('../config/mongoCollections').bands;
const validation = require('./validation');

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
  name = validation.checkString(name, 'name');
  website = validation.checkString(website, 'website');
  recordLabel = validation.checkString(recordLabel, 'recordLabel');
  if (!website.match(/^http:\/\/www\..{5,}.com$/gi))
    throw 'the website is not a valid url!';
  genre = validation.checkStringArray(genre, 'genre');
  bandMembers = validation.checkStringArray(bandMembers, 'bandMembers');
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
    albums: [],
    overallRating: 0,
  };
  const insertInfo = await bandsCollections.insertOne(newBands);
  if (insertInfo.insertedCount == 0) throw 'band create failed!';
  const band = await get(insertInfo.insertedId.toString());
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

async function get(id) {
  id = validation.checkId(id, 'id');
  const bandsCollections = await bands();
  const band = await bandsCollections.findOne({ _id: ObjectId(id) });
  if (!band) throw 'there is no band with that id!';
  band._id = id.toString();
  return band;
}

async function remove(id) {
  const band = await get(id);
  id = validation.checkId(id, 'id');
  const bandsCollections = await bands();
  const deleteInfo = await bandsCollections.deleteOne({ _id: ObjectId(id) });
  if (deleteInfo.deletedCount == 0)
    throw `Could not delete band with id of ${id}`;
  return `${band.name} has been successfully deleted!`;
}

async function update(
  id,
  name,
  genre,
  website,
  recordLabel,
  bandMembers,
  yearFormed
) {
  id = validation.checkId(id,'id');
  if (
    !name ||
    !genre ||
    !website ||
    !recordLabel ||
    !bandMembers ||
    !yearFormed
  )
    throw 'all arguments must hava valid values!';
  name = validation.checkString(name, 'name');
  website = validation.checkString(website, 'website');
  recordLabel = validation.checkString(recordLabel, 'recordLabel');
  if (!website.match(/^http:\/\/www\..{5,}.com$/gi))
    throw 'the website is not a valid url!';
  genre = validation.checkStringArray(genre, 'genre');
  bandMembers = validation.checkStringArray(bandMembers, 'bandMembers');
  if (genre.length < 1 || bandMembers.length < 1)
    throw 'there must be at least one element in both genre and bandMembers!';
  if (typeof yearFormed != 'number' || yearFormed < 1900 || yearFormed > 2022)
    throw 'yearFormed must be a Number and between 1900 and 2022!';
  const bandsCollections = await bands();
  const newBands = {
    name: name,
    genre: genre,
    website: website,
    recordLabel: recordLabel,
    bandMembers: bandMembers,
    yearFormed: yearFormed,
  };
  const updateInfo = await bandsCollections.updateOne(
    { _id: ObjectId(id) },
    { $set: newBands }
  );
  if (updateInfo.modifiedCount == 0)
    throw `Could not update band with id of ${id}`;
  else return get(id);
}

module.exports = {
  create,
  getAll,
  get,
  remove,
  update,
};
