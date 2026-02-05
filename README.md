# Game Design Document

## Game Title
**Tickle the Pickle**

## Game Type
**Retro Arcade**

---

## Win Condition
**You have to shoot pickles with a dill/pickling ingredients like the game Galaga. The player wins by destroying all enemy pickles on the screen. Pickles move in patterns from the top of the screen and fire back. Clearing a wave spawns a new, faster pickle wave**

---

## Lose Condition
**You have 3 lives. A life is lost when: the player gets hit by a pickle projectile OR a pickle collides with the player. The game ends when all 3 lives are gone.**

---

## Core Mechanics
**(3–5 features that MUST work)**

1. **Movement left and right * up and down(Player slides horizontally along the bottom of the screen)**
2. **Shooting upward (Player fires dill/pickling ingredient projectiles straight up)**
3. **Special key for upgrade (Shoot faster, Shoot multiple projectiles, Or increase damage)**
4. **Enemy movement patterns (Pickles move side-to-side & up and down to attack)**
5. **Lives and score system, score increases when each pickle is destroyed**

---

## Player Input
**(What does the user type?)**
Whatever the user presses
- **A** to move left
- **D** to move right
- **Spacebar** to shoot
- **P** Speical key
- **Q** to quit the game

---

## Inputs We Will Validate
**(QA Test Ideas)**

- **What if the user presses an invilad key? Ignore the input and the game should continue**
- **What if the user holds down shoot? Limit fire rate to prevent spamming**
- **What if the player tries to upgrade without enough points? Display a message letting them know**

---

## Known Limitations
**(Be honest)**

- **No fancy graphics**
- **No multiplayer**
- **No advance enemy AI**
- **Lmited sound effects**
- **Single screen gameplaye (no spilt two player)**

---

## Tech Stack

- Local JS website setup
- Keyboard input handling
- Simple print-based rendering
