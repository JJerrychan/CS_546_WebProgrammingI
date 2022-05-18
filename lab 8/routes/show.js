const express = require('express');
const router = express.Router();
const axios = require('axios');

router.get('/:id', async (req, res) => {
  try {
    let id = req.params.id.trim();
    const urlSearch = `http://api.tvmaze.com/shows/${id}`;
    const { data } = await axios.get(urlSearch);
    res.render('tvMaze/show', {
      title: data.name,
      name: data.name,
      image: data.image? data.image.medium:'/public/No_image_available.png',
      language: data.language ? data.language : 'N/A',
      genres: data.genres,
      rating: data.rating.average ? data.rating.average : 'N/A',
      network: data.network ? data.network.name : 'N/A',
      summary: data.summary ? data.summary.replace(/(<([^>]+)>)/ig) : 'N/A',
    });
  } catch (e) {
    res.status(404).render('tvMaze/error', {
      title: 'ERROR!',
      error: 'cannot find that TV!',
    });
  }
});

module.exports = router;
