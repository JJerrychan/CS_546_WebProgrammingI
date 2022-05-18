const express = require('express');
const router = express.Router();
const data = require('../data');
const albumsData = data.albums;
const validation = require('../data/validation');

router.get('/:id', async (req, res) => {
  try {
    req.params.id = validation.checkId(req.params.id, 'Id URL Param');
  } catch (e) {
    return res.status(400).json({ error: e });
  }
  try {
    const albums = await albumsData.getAll(req.params.id);
    res.json(albums);
  } catch (e) {
    res.status(404).json({ error: e });
  }
});

router.post('/:id', async (req, res) => {
  const albumsPostData = req.body;
  try {
    req.params.id = validation.checkId(req.params.id, 'Id URL Param');
    if (
      !albumsPostData.title ||
      !albumsPostData.releaseDate ||
      !albumsPostData.tracks ||
      !albumsPostData.rating
    )
      throw 'all arguments must hava valid values!';
    albumsPostData.title = validation.checkString(
      albumsPostData.title,
      'title'
    );
    albumsPostData.releaseDate = validation.checkString(
      albumsPostData.releaseDate,
      'releaseDate'
    );
    albumsPostData.tracks = validation.checkStringArray(
      albumsPostData.tracks,
      'tracks'
    );
    let releaseD = new Date(albumsPostData.releaseDate);
    let now = new Date();
    if (
      !releaseD ||
      releaseD.getFullYear() < 1900 ||
      releaseD.getFullYear() > now.getFullYear() + 1
    )
      throw `releaseDate must be a valid Date between 1900 and ${
        now.getFullYear() + 1
      }!`;
    if (albumsPostData.tracks.length < 3)
      throw 'there must be at least 3 elements in tracks';
    if (
      typeof albumsPostData.rating != 'number' ||
      albumsPostData.rating < 1 ||
      albumsPostData.rating > 5
    )
      throw 'rating must be a Number and between 1 and 5!';
  } catch (e) {
    return res.status(400).json({ error: e });
  }
  try {
    await albumsData.getAll(req.params.id);
  } catch (e) {
    return res.status(404).json({ error: e });
  }
  try {
    const updatedPost = await albumsData.create(
      req.params.id,
      albumsPostData.title,
      albumsPostData.releaseDate,
      albumsPostData.tracks,
      albumsPostData.rating
    );
    res.json(updatedPost);
  } catch (e) {
    res.status(500).json({ error: e });
  }
});

router.get('/album/:id', async (req, res) => {
  try {
    req.params.id = validation.checkId(req.params.id, 'Id URL Param');
  } catch (e) {
    return res.status(400).json({ error: e });
  }
  try {
    const albums = await albumsData.get(req.params.id);
    res.json(albums);
  } catch (e) {
    res.status(404).json({ error: e });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    req.params.id = validation.checkId(req.params.id, 'Id URL Param');
  } catch (e) {
    return res.status(400).json({ error: e });
  }
  try {
    await albumsData.get(req.params.id);
  } catch (e) {
    return res.status(404).json({ error: e });
  }
  try {
    await albumsData.remove(req.params.id);
    res.status(200).json({ albumId: req.params.id, deleted: true });
  } catch (e) {
    res.status(500).json({ error: e });
  }
});

module.exports = router;
