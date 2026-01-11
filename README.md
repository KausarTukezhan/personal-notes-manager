# Personal Notes Manager

## Description
Personal Notes Manager is a web application that allows users to create, view, edit, and delete personal notes efficiently.  
The application is built using Node.js and Express.js, focusing on backend development concepts.

## Team Members
- Kausar Tukezhan
- Behruz Tokkhtamishov
- Ginayat Yerassyl

## Installation
1. Clone or download this repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the server:
   ```bash
   node server.js
   ```
4. Open your browser and navigate to: `http://localhost:3000`

## Database

The project uses **SQLite**

### Table: `notes`

| Field   | Type    | Description                  |
| ------- | ------- | ---------------------------- |
| id      | INTEGER | Primary Key (auto increment) |
| title   | TEXT    | Note title                   |
| content | TEXT    | Note content                 |

Database file location:

```
/data/notes.db
```

The table is created automatically when the server starts.

---

## API (CRUD)

| Method | Endpoint       | Description       |
| ------ | -------------- | ----------------- |
| GET    | /api/notes     | Get all notes     |
| GET    | /api/notes/:id | Get a note by ID  |
| POST   | /api/notes     | Create a new note |
| PUT    | /api/notes/:id | Update a note     |
| DELETE | /api/notes/:id | Delete a note     |

### Example POST body

```json
{
  "title": "My first note",
  "content": "This is my note content"
}
```

## 🌐 Routes

| Route           | Description             |
| --------------- | ----------------------- |
| /               | Home page               |
| /search?q=value | Search example          |
| /item/:id       | Route parameter example |
| /contact        | Contact form            |
| /api/info       | Project info in JSON    |

### POST Routes
- `/contact` - Handles form submissions from the contact page
  - Accepts: name, email, message

## Behavior:

 - Server validates input

 - Data is saved into a JSON file (data/contacts.json)

 - User receives a confirmation message
## Middleware:
 The project uses:
 - express.urlencoded({ extended: true })
 - Custom logger middleware (logs HTTP method and URL)

### Error Handling
- Custom 404 page for unknown routes using app.use()

## Contact Form Details
The contact form includes the following fields:
- **Name** (required) - Text input for user's name
- **Email** (required) - Email input with validation
- **Message** (required) - Textarea for user's message
- **Submit button** - Sends data via POST to `/contact`

When submitted, the form:
1. Sends data to the server using POST method
2. Server logs the data to the console
3. User receives a confirmation message with their name

## Technologies Used
- Node.js
- Express.js
- HTML5
- CSS3

## Project Structure

```
personal-notes-manager/
│
├── server.js
├── package.json
├── README.md
│
├── data/
│   ├── contacts.json
│   └── notes.db
│
├── public/
│   └── style.css
│
└── views/
   ├── index.html
   ├── contact.html
   ├── about.html
   ├── item.html
   ├── search.html
   └── 404.html
```

## Technologies

* Node.js
* Express.js
* SQLite
* HTML5
* CSS3

## Implemented Features
- Create notes
- View all notes
- Edit notes
- Delete notes
- Store notes in a database (SQLite)

## Planned Features
- Categorize notes
- Tagging system
- Full-text search

## Roadmap
* Week 1: Express setup & landing page ✅
* Week 2: Forms and POST routes ✅
* Week 3: Database integration (SQLite) ✅
* Week 4: CRUD operations for Notes API ✅
* Week 5: Final validation & improvements 