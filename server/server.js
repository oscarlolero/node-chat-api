const path = require('path');
const express = require('express');
const hbs = require('hbs');

const port = process.env.PORT || 3000;
let app = express();

const publicPath = path.join(__dirname, '../public');
app.set('view engine', 'hbs');
app.use(express.static(publicPath));

app.listen(port, () => {
    console.log(`Server is up on port ${port}.`);
});