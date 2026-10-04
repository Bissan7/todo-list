# To-Do List

A simple, responsive to-do list built with plain HTML, CSS, and JavaScript. Tasks are saved in the browser, so they are still there after you close or refresh the page.

**Live demo:** 



## Features

- Add tasks with the Add button or by pressing Enter
- Mark tasks as completed, or delete them
- Progress bar and counters showing total and completed tasks
- Tasks are saved automatically using `localStorage`
- Responsive layout that works on phones and desktops
- Basic accessibility support: labelled inputs, keyboard-friendly buttons, and visible focus styles

## Built with

- HTML5
- CSS3 (Flexbox, CSS variables, media queries)
- Vanilla JavaScript (no frameworks or libraries)

## Getting started

No installation or build step is needed.

1. Clone the repository:
   `git clone https://github.com/your-username/your-repo-name.git`
2. Open the project folder.
3. Open `index.html` in your browser.

## Project structure

```
├── index.html   # Page structure
├── style.css    # Styling and responsive layout
└── script.js    # App logic and localStorage handling
```

## How it works

The app keeps all tasks in a single array, which is the source of truth. Every time a task is added, completed, or deleted, the array is updated, saved to `localStorage`, and the list is redrawn from it. User input is inserted with `textContent` rather than `innerHTML` to prevent XSS.

## Limitations

Because data is stored in `localStorage`, tasks only exist in the browser and on the device where they were created. Clearing the browser data will remove them.

## Future improvements

- Edit existing tasks
- Filter by all, active, and completed
- Set priorities or due dates
- Sync across devices with a backend service

## Author

Bissan