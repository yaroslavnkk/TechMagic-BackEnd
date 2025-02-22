const { connectDB } = require('./config/database/database');
const { initializeDB } = require('./config/database/db-init');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const userRoutes = require('./routes/user');


const app = express();
 
connectDB().then(() => {
    initializeDB();
});

app.use(bodyParser.json());
app.use(cors());
const port = 4000;


app.use('', userRoutes);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});