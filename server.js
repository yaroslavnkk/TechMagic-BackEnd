const { connectDB } = require('./config/database/database');

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const userRoutes = require('./routes/user');


const app = express();
 
connectDB();

app.use(bodyParser.json());
app.use(cors());
const port = 4000;


app.use('', userRoutes);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});