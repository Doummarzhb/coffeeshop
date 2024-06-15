const express = require('express');
const path = require('path');
const app = express();


const angularAppPath = path.join(__dirname, '../dist/COFFESHOPP177');

app.use(express.static(angularAppPath));

app.get('/api/items', (req, res) => {
  res.json({ message: 'Hello from API!' });
});
app.get('http://localhost:3000/users', (req, res) => {
  res.json({ message: 'Hello from API!' });
});

app.get('*', (_req, res) => {
    res.sendFile(path.join(angularAppPath, 'index.html'));
});



//node app.js for show running
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
