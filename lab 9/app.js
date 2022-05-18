const express = require('express');
const app = express();
const static = express.static(__dirname + '/static');
app.use('/static', static);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/static/index.html');
});

app.listen(3000, () => {
  console.log("We've now got a server!");
  console.log('Your routes will be running on http://localhost:3000');
});
