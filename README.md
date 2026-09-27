# FlowBoard

FlowBoard is a responsive productivity board built with HTML, CSS, and vanilla JavaScript. It is a small frontend project made to show practical UI work without depending on a framework.

## Features

- Three-column task board: To Do, In Progress, Done
- Add and delete task cards
- Drag cards between columns
- Search by title, notes, priority, status, or tags
- Filter tasks by priority
- Dark and light theme toggle
- Progress statistics
- Browser persistence using `localStorage`
- Responsive layout for laptop and mobile screens

## Tech Stack

- HTML5
- CSS3
- JavaScript
- localStorage

## Why I Built This

I wanted a frontend project that is simple enough to explain clearly, but still demonstrates real interface logic: rendering data from JavaScript, updating the DOM, saving state, filtering, and handling drag-and-drop interactions.

## Project Structure

```text
flowboard/
├── index.html
├── css/
│   └── style.css
├── js/
│   ├── app.js
│   ├── dragdrop.js
│   └── storage.js
├── README.md
└── LICENSE
```

## Run Locally

Open `index.html` directly in a browser.

For a local server, run:

```bash
python -m http.server 5500
```

Then open:

```text
http://localhost:5500
```

## GitHub Pages

1. Push this project to a GitHub repository.
2. Go to repository `Settings`.
3. Open `Pages`.
4. Select the `main` branch and root folder.
5. Save and wait for GitHub to create the live link.

## Resume Description

**FlowBoard - Interactive Productivity Dashboard**  
Built a responsive task-management interface using HTML, CSS, and vanilla JavaScript, featuring drag-and-drop task organization, dynamic filtering, persistent local storage, progress statistics, and theme switching.
