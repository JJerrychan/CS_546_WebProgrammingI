const express = require('express');
const router = express.Router();
const data = require('../data');
const bandsData = data.bands;
const validation = require('../data/validation');

router.get('/', async (req, res) => {
  try {
    const allBands = await bandsData.getAll();
    res.json(allBands);
  } catch (e) {
    res.status(500).json({ error: e });
  }
});

router.post('/', async (req, res) => {
  const bandPostData = req.body;
  try {
    if (
      !bandPostData.name ||
      !bandPostData.genre ||
      !bandPostData.website ||
      !bandPostData.recordLabel ||
      !bandPostData.bandMembers ||
      !bandPostData.yearFormed
    )
      throw 'all arguments must hava valid values!';
    bandPostData.name = validation.checkString(bandPostData.name, 'name');
    bandPostData.website = validation.checkString(
      bandPostData.website,
      'website'
    );
    bandPostData.recordLabel = validation.checkString(
      bandPostData.recordLabel,
      'recordLabel'
    );
    if (!bandPostData.website.match(/^http:\/\/www\..{5,}.com$/gi))
      throw 'the website is not a valid url!';
    bandPostData.genre = validation.checkStringArray(
      bandPostData.genre,
      'genre'
    );
    bandPostData.bandMembers = validation.checkStringArray(
      bandPostData.bandMembers,
      'bandMembers'
    );
    if (bandPostData.genre.length < 1 || bandPostData.bandMembers.length < 1)
      throw 'there must be at least one element in both genre and bandMembers!';
    if (
      typeof bandPostData.yearFormed != 'number' ||
      bandPostData.yearFormed < 1900 ||
      bandPostData.yearFormed > 2022
    )
      throw 'yearFormed must be a Number and between 1900 and 2022!';
  } catch (e) {
    return res.status(400).json({ error: e });
  }
  try {
    const { name, genre, website, recordLabel, bandMembers, yearFormed } =
      bandPostData;
    res.json(
      await bandsData.create(
        name,
        genre,
        website,
        recordLabel,
        bandMembers,
        yearFormed
      )
    );
  } catch (e) {
    res.status(500).json({ error: e });
  }
});

router.get('/:id', async (req, res) => {
  try {
    req.params.id = validation.checkId(req.params.id, 'Id URL Param');
  } catch (e) {
    return res.status(400).json({ error: e });
  }
  try {
    const band = await bandsData.get(req.params.id);
    res.json(band);
  } catch (e) {
    res.status(404).json({ error: e });
  }
});

router.put('/:id', async (req, res) => {
  const bandPutData = req.body;
  try {
    req.params.id = validation.checkId(req.params.id, 'ID url param');
    if (
      !bandPutData.name ||
      !bandPutData.genre ||
      !bandPutData.website ||
      !bandPutData.recordLabel ||
      !bandPutData.bandMembers ||
      !bandPutData.yearFormed
    )
      throw 'all arguments must hava valid values!';
    bandPutData.name = validation.checkString(bandPutData.name, 'name');
    bandPutData.website = validation.checkString(
      bandPutData.website,
      'website'
    );
    bandPutData.recordLabel = validation.checkString(
      bandPutData.recordLabel,
      'recordLabel'
    );
    if (!bandPutData.website.match(/^http:\/\/www\..{5,}.com$/gi))
      throw 'the website is not a valid url!';
    bandPutData.genre = validation.checkStringArray(bandPutData.genre, 'genre');
    bandPutData.bandMembers = validation.checkStringArray(
      bandPutData.bandMembers,
      'bandMembers'
    );
    if (bandPutData.genre.length < 1 || bandPutData.bandMembers.length < 1)
      throw 'there must be at least one element in both genre and bandMembers!';
    if (
      typeof bandPutData.yearFormed != 'number' ||
      bandPutData.yearFormed < 1900 ||
      bandPutData.yearFormed > 2022
    )
      throw 'yearFormed must be a Number and between 1900 and 2022!';
  } catch (e) {
    return res.status(400).json({ error: e });
  }
  try {
    await bandsData.get(req.params.id);
  } catch (e) {
    return res.status(404).json({ error: e });
  }
  try {
    const updatedBand = await bandsData.update(
      req.params.id,
      bandPutData.name,
      bandPutData.genre,
      bandPutData.website,
      bandPutData.recordLabel,
      bandPutData.bandMembers,
      bandPutData.yearFormed
    );
    res.json(updatedBand);
  } catch (e) {
    res.status(500).json({ error: e });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    req.params.id = validation.checkId(req.params.id, 'Id URL Param');
  } catch (e) {
    return res.status(400).json({ error: e });
  }
  try {
    await bandsData.get(req.params.id);
  } catch (e) {
    return res.status(404).json({ error: e });
  }
  try {
    await bandsData.remove(req.params.id);
    res.status(200).json({ bandId: req.params.id, deleted: true });
  } catch (e) {
    res.status(500).json({ error: e });
  }
});

module.exports = router;
