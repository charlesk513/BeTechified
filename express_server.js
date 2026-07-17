// require('dotenv').config(); getting it from the .env file
const express = require('express');
const app = express();
//const port = process.env.PORT;
const port = 3000;
app.use(express.json()); //middlewhere used when going for a post method

app.use((req, res, next) => {
    console.log(req.method, req.url, " - ", new Date());
    next();
});
// Routing parameter; this is the generic that extracts the string replaced in place of ':id'
app.get('/user/:id', (req, res) => {
    const id = req.params.id;
    console.log(id);
    res.send("Hello this is the id added on the URL " + id);
});

// Searching, 
app.get('/search', (req, res) => {
    const id = req.search;
    console.log(id);
    res.send("Hello this is the value searched! " + id);
});

app.post('/echo', (req, res) => {
    res.json({ echoed: req.body });
});

app.get('/', (req, res) => {
    res.send('Hello from express!');
});
app.get('/about', (req, res) => {
    res.send('Hello this is the about page!');
});


app.listen(port, () => {
    console.log("Express app listening to port ", port);
});