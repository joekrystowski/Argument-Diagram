var express = require('express');
var app = express();
const PORT = 8000;

app.use(express.static(__dirname + '/public'));

const listener = app.listen(PORT, () => {
  console.log("Website is listening on " + listener.address().port);
});