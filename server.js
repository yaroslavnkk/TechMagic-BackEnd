const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const userRoutes = require('./routes/user');


const app = express();
app.use(bodyParser.json());
app.use(cors());
const port = 4000;

mongoose.connect('mongodb://localhost:27017/medcare', { useNewUrlParser: true })
    .then(console.log('DB connected'))
    .catch(err => console.log('Error' + err))

app.use('', userRoutes);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});