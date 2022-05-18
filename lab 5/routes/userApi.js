const express = require('express');
const router = express.Router();
const data = require('../data');

router.get('/people', async (req, res) => {
  try {
    res.json(await data.getPeople());
  } catch (e) {
    res.status(404).json({ message: 'People not found' });
  }
});

router.get('/work', async (req, res) => {
  try {
    res.json(await data.getWork());
  } catch (e) {
    res.status(404).json({ message: 'Work not found' });
  }
});

router.get('/people/:id', async (req, res) => {
  try {
    const people = await data.getPeopleByID(req.params.id);
    res.json(people);
  } catch (e) {
    res.status(404).json({ message: e });
  }
});

router.get('/work/:id', async (req, res) => {
  try {
    const work = await data.getWorkByID(req.params.id);
    res.json(work);
  } catch (e) {
    res.status(404).json({ message: e });
  }
});

module.exports = router;
