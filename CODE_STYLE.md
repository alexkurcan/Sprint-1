# Code Style Guide – *Tickle the Pickle* 

This document defines the coding standards and conventions used in the **Tickle the Pickle** project. The goal is to keep the code **readable, consistent, maintainable, and beginner‑friendly**.

---

## 1. General Principles

* Write code that is **clear over clever**
* Favor readability and simplicity
* Keep logic modular and easy to debug
* Avoid unnecessary complexity or premature optimization
* All game logic should be deterministic and reproducible

---

## 2. File Structure

The project uses a simple and clean separation of concerns:

```
/ TickelThePickle
├── index.html          // Game layout and UI
├── TickleThePickle.js  // Game logic and rendering
└── TickleThePickle.css // Styling and visuals
```

Each file has a **single responsibility**:

* **HTML** → Structure and UI elements
* **CSS** → Styling and visual effects
* **JavaScript** → Game state, logic, input, and rendering

---

## 3. JavaScript Code Style

### 3.1 Naming Conventions

* **camelCase** for variables and functions

  ```js
  let gameStarted;
  function spawnWave() {}
  ```

* **Descriptive names** over abbreviations

  ```js
  fireCooldown  // good
  cd            // bad
  ```

* Constants use `const`, mutable values use `let`

---

### 3.2 Functions

* Functions should do **one thing only**
* Keep functions short and readable
* Group related logic together (update, draw, input, collision)

Example:

```js
function update() {
  handleMovement();
  handleShooting();
  handleCollisions();
}
```

---

### 3.3 Game State Management

* Global game state variables are declared at the top of the file
* Game state is reset using a dedicated `resetGame()` function
* No magic numbers — values should be meaningful and documented

---

### 3.4 Arrays & Iteration

* Avoid mutating arrays while iterating forward
* Prefer backward loops when removing elements

Example:

```js
for (let i = bullets.length - 1; i >= 0; i--) {
  // safe removal
}
```

---

## 4. HTML Style Guidelines

* Semantic HTML where possible
* IDs are unique and descriptive
* Minimal inline styling (handled in CSS instead)
* JavaScript is loaded **at the bottom of the body**

Example:

```html
<script src="TickleThePickle.js"></script>
```

---

## 5. CSS Style Guidelines

* Styles are grouped by feature or component
* Avoid overly specific selectors
* Use comments to separate major sections

Example:

```css
/* ---------- START SCREEN ---------- */
#startScreen {
  position: absolute;
}
```

* Visual consistency is prioritized over realism

---

## 6. Comments & Documentation

* Comments explain **why**, not what
* Use section headers to organize large files
* Remove commented‑out dead code before submission

---

## 7. AI Assistance Disclosure 🤖

This project was developed with the assistance of **AI tools for learning, debugging, and refactoring purposes**.

The following tools were used responsibly:

* **ChatGPT** – logic debugging, game architecture suggestions, and code cleanup
* **Claude AI** – readability improvements and edge‑case analysis
* **GitHub Copilot** – code completion and syntax suggestions

All generated suggestions were:

* Reviewed by the developer
* Modified where necessary
* Integrated with full understanding of the code

The final implementation reflects the developer’s intent and learning.

---

## 8. Final Notes

This code style guide exists to:

* Support collaboration
* Improve grading clarity
* Encourage clean game development practices

Consistency matters more than perfection.


