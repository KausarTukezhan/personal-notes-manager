const express = require('express');
<<<<<<< HEAD
const fs = require('fs');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const PORT = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

const dbPath = path.join(__dirname, 'data', 'notes.db');
const db = new sqlite3.Database(dbPath);

db.serialize(() => {
    db.run(`
        CREATE TABLE IF NOT EXISTS notes (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            content TEXT NOT NULL
        )
    `);
});

app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'views', 'index.html')));
app.get('/about', (req, res) => res.sendFile(path.join(__dirname, 'views', 'about.html')));
app.get('/contact', (req, res) => res.sendFile(path.join(__dirname, 'views', 'contact.html')));
app.get('/search', (req, res) => {
    if (!req.query.q) return res.status(400).send("Missing search query");
    res.sendFile(path.join(__dirname, 'views', 'search.html'));
});
app.get('/item/:id', (req, res) => res.sendFile(path.join(__dirname, 'views', 'item.html')));

app.post('/contact', (req, res) => {
    const { name, message } = req.body;
    if (!name || !message) return res.status(400).send("Name and message are required");

    const filePath = path.join(__dirname, 'data', 'contacts.json');
    const data = fs.existsSync(filePath) ? JSON.parse(fs.readFileSync(filePath, 'utf8') || '[]') : [];
    data.push({ name, message, date: new Date().toISOString() });
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

    res.send(`<h2>Message sent!</h2><a href="/">Back</a>`);
});


app.get('/api/notes', (req, res) => {
    db.all("SELECT * FROM notes ORDER BY id ASC", [], (err, rows) => {
        if (err) return res.status(500).json({ error: "Database error" });
        res.json(rows);
    });
});

app.get('/api/notes/:id', (req, res) => {
    const id = Number(req.params.id);
    if (isNaN(id)) return res.status(400).json({ error: "Invalid id" });

    db.get("SELECT * FROM notes WHERE id = ?", [id], (err, row) => {
        if (err) return res.status(500).json({ error: "Database error" });
        if (!row) return res.status(404).json({ error: "Note not found" });
        res.json(row);
    });
});

app.post('/api/notes', (req, res) => {
    const { title, content } = req.body;
    if (!title || !content) return res.status(400).json({ error: "Missing title or content" });

    db.run("INSERT INTO notes (title, content) VALUES (?, ?)", [title, content], function (err) {
        if (err) return res.status(500).json({ error: "Database error" });
        res.status(201).json({ id: this.lastID, title, content });
    });
});


app.put('/api/notes/:id', (req, res) => {
    const id = Number(req.params.id);
    const { title, content } = req.body;

    if (isNaN(id)) return res.status(400).json({ error: "Invalid id" });
    if (!title || !content) return res.status(400).json({ error: "Missing title or content" });

    db.run("UPDATE notes SET title = ?, content = ? WHERE id = ?", [title, content, id], function (err) {
        if (err) return res.status(500).json({ error: "Database error" });
        if (this.changes === 0) return res.status(404).json({ error: "Note not found" });
        res.json({ id, title, content });
    });
});

app.delete('/api/notes/:id', (req, res) => {
    const id = Number(req.params.id);
    if (isNaN(id)) return res.status(400).json({ error: "Invalid id" });

    db.run("DELETE FROM notes WHERE id = ?", [id], function (err) {
        if (err) return res.status(500).json({ error: "Database error" });
        if (this.changes === 0) return res.status(404).json({ error: "Note not found" });
        res.json({ message: "Deleted successfully" });
    });
});

app.use('/api', (req, res) => res.status(404).json({ error: "API route not found" }));
app.use((req, res) => res.status(404).sendFile(path.join(__dirname, 'views', '404.html')));
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
=======
const app = express();
const PORT = 3000;

app.use(express.static('public'));
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/index.html');
});
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
>>>>>>> dd9f57447c1be998b740ecb8793c95ec39f99761
