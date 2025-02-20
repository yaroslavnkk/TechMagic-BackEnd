const express = require('express');
const app = express();
const port = 4000;

app.get('/', (req,res) => {
    res.send('<h1>Backend Server started</h1>');
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});