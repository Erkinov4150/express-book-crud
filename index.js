const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

const books = [
    {
        id: 1,
        name: "Qanday qilib dasturlashni organsa boladi",
        author: "Erkinov Sardor",
        year: 1925
    },
    {
        id: 2,
        name: "Jsda cod yozishnni organish",
        author: "Erkinov Sardor",
        year: 1960
    },
    {
        id: 3,
        name: "Backendni organish",
        author: "Erkinov Sardor",
        year: 1948
    }

];

app.get('/books', (req, res) => {
    res.json(books);
});

app.post('/books', (req, res) => {
    const book = req.body;
    books.push(book);
    res.status(201).json(book);
});

app.get('/books/:id', (req, res) => {
    const id = +req.params.id;
    const book = books.find(book => book.id == id);
    if (book) {
        res.json(book);
    } else {
        res.status(404).json({ error: 'Kitob topilmadi' });
    }
});

app.put('/books/:id', (req, res) => {
    const id = +req.params.id;
    const book = req.body;
    const index = books.findIndex(book => book.id == id);
    if (index !== -1) {
        books[index] = book;
        res.json(book);
    } else {
        res.status(404).json({ error: 'Kitob topilmadi dedim' });
    }
});

app.delete('/books/:id', (req, res) => {
    const id = +req.params.id;
    const index = books.findIndex(book => book.id == id);
    if (index !== -1) {
        books.splice(index, 1);
        res.sendStatus(204);
    } else {
        res.status(404).json({ error: 'Kitob topilmadi dedim e qara' });
    }
});

app.listen(PORT, () => {
    console.log(`Server yugurvotti ${PORT}-da`);
});

