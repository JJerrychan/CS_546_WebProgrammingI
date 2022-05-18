const express = require('express');
const router = express.Router();
const axios = require('axios');

router.post('/', async (req, res) => {
  try {
    let showSearchTerm = req.body.showSearchTerm;
    showSearchTerm = showSearchTerm.trim();
    if (showSearchTerm.length === 0)
      throw `Your input cannot be empty or just spaces!`;
    const urlSearch = `http://api.tvmaze.com/search/shows?q=${showSearchTerm}`;
    const { data } = await axios.get(urlSearch);
    let show = new Array();
    for (let i = 0; i < data.length; i++) {
      show.push(data[i].show);
    }
    if (show.length == 0)
      res.render('tvMaze/searchshows', {
        title: 'Shows not Found',
        showSearchTerm: showSearchTerm,
        notFound: true,
      });
    show = show.slice(0, 5);
    res.render('tvMaze/searchshows', {
      title: 'Shows Found',
      showSearchTerm: showSearchTerm,
      show: show,
      notFound: false,
    });
  } catch (e) {
    res.status(400).render('tvMaze/error', {
      title: 'ERROR!',
      error: e,
    });
  }
});

module.exports = router;
