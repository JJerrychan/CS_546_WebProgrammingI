const { ObjectId } = require('mongodb');
const validation = require('./validation');
const bands = require('../config/mongoCollections').bands;
const bandsData = require('./bands');

async function create(bandId, title, releaseDate, tracks, rating) {
  if (!bandId || !title || !releaseDate || !tracks || !rating)
    throw 'all arguments must hava valid values!';
  bandId = validation.checkId(bandId, 'bandId');
  title = validation.checkString(title, 'title');
  releaseDate = validation.checkString(releaseDate, 'releaseDate');
  tracks = validation.checkStringArray(tracks, 'tracks');
  let releaseD = new Date(releaseDate);
  let now = new Date();
  if (
    !releaseD ||
    releaseD.getFullYear() < 1900 ||
    releaseD.getFullYear() > now.getFullYear() + 1
  )
    throw `releaseDate must be a valid Date between 1900 and ${
      now.getFullYear() + 1
    }!`;
  if (tracks.length < 3) throw 'there must be at least 3 elements in tracks';
  if (typeof rating != 'number' || rating < 1 || rating > 5)
    throw 'rating must be a Number and between 1 and 5!';
  const bandsCollections = await bands();
  const newAlbums = {
    _id: ObjectId(),
    title: title,
    releaseDate: releaseDate,
    tracks: tracks,
    rating: rating,
  };
  const updateInfo = await bandsCollections.updateOne(
    { _id: ObjectId(bandId) },
    { $addToSet: { albums: newAlbums } }
  );
  if (updateInfo.modifiedCount == 0)
    throw `Could not create album with bandId of ${bandId}`;
  else return await get(newAlbums._id.toString());
}

async function getAll(bandId) {
  bandId = validation.checkId(bandId, 'bandId');
  const band = await bandsData.get(bandId);
  const allAlbums = band.albums;
  if (allAlbums.length) {
    allAlbums.forEach((element) => {
      element._id = element._id.toString();
    });
  }
  return allAlbums;
}

async function get(albumId) {
  albumId = validation.checkId(albumId, 'albumId');
  const allBands = await bandsData.getAll();
  for (const iterator of allBands) {
    for (let i = 0; i < iterator.albums.length; i++) {
      if (iterator.albums[i]._id.toString() == albumId)
        return iterator.albums[i];
    }
  }
  throw `there is no album with albumId:${albumId}!`;
}

async function remove(albumId) {
  albumId = validation.checkId(albumId, 'albumId');
  let band;
  const allBands = await bandsData.getAll();
  let totalRating = 0;
  for (const iterator of allBands) {
    for (let i = 0; i < iterator.albums.length; i++) {
      if (iterator.albums[i]._id.toString() == albumId) {
        iterator.albums.splice(i, 1);
        band = iterator;
        continue;
      }
      totalRating += iterator.albums[i].rating;
    }
  }
  let newRating = totalRating / band.albums.length;
  if (!band) throw `there is no album with albumId:${albumId}!`;
  const bandsCollections = await bands();
  const updateInfo = await bandsCollections.updateOne(
    { _id: ObjectId(band._id) },
    { $set: { albums: band.albums, overallRating: newRating } }
  );
  if (updateInfo.modifiedCount == 0)
    throw `Could not delete album with albumId of ${albumId}`;
  else return band;
}

module.exports = {
  create,
  getAll,
  get,
  remove,
};
