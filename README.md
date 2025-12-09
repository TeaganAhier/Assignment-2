# Snack Man – JavaScript Maze Game

This project is my Assignment 2 submission for Web Development, where I created my own version of a Pac-Man-style maze game using HTML, CSS and JavaScript. The aim of the assignment was to design and build a fully interactive browser-based game that demonstrated my understanding of DOM manipulation, event handling, game logic, collision detection and dynamic rendering.

Snack Man begins with a menu where the player can choose between one-player and two-player mode before starting the game. Once the game begins, the player navigates a randomly generated maze, collecting points while avoiding moving enemies. Each new level creates an entirely new maze layout, increasing the difficulty as the game progresses. The game also includes lives, a score counter, level progression, a leaderboard that stores scores using localStorage, and a restart/game-over system.

The maze is not pre-designed — instead it is created programmatically using JavaScript, ensuring that every level feels different. Walls, points, the player and enemies are all produced dynamically based on the values in the maze array. As the player collects all the points, the maze regenerates into a new layout and the difficulty increases. Enemy characters move randomly around the maze and respond to wall collisions by choosing a new direction. The player loses a life when colliding with an enemy, and once all lives are lost, a game-over screen appears and the player can enter their name to be recorded on the leaderboard.

This project also includes accessibility features such as on-screen arrow buttons for movement and a switchable light/dark mode. Light mode transforms the visual style of the game by changing colours, backgrounds and text, while still keeping gameplay functional.

Throughout development I implemented and tested a large number of required features, such as wall collision, point collection, score updating, enemy movement, maze generation, level progression, a working leaderboard, and both keyboard and on-screen control systems. I used black-box testing extensively by playing through scenarios and observing behaviour, and I also used the browser console to trigger functions like `nextLevel()` and `showGameOverScreen()` to test specific states without replaying the game repeatedly.

This project demonstrates my ability to:

- Create an interactive game using JavaScript  
- Dynamically generate game structures (maze, player, enemies, points)  
- Handle user input from both keyboard and on-screen controls  
- Detect and respond to collisions  
- Manage game states such as lives, score, levels and difficulty  
- Store and sort player data using localStorage  
- Build transitions, menus and UI components  
- Apply CSS for both aesthetic and functional design, including animations  

The project files include:

- **index.html** – structure of the game and UI  
- **script.js** – all game logic, generation systems, movement, collision detection and state handling  
- **style.css** – layout, theme styles, animations and visual design  
- **icon.png** – the game’s visual icon  
- **AS2Report.docx** – full write-up of testing, evaluation and conclusions  

Snack Man is the most advanced JavaScript game I have created so far, and it taught me a lot about problem-solving, debugging, randomness, game loops and user experience design. If I were to develop it further, I would refine enemy behaviour, improve light-mode rendering across levels, add more power-ups and possibly redesign the movement system to be more grid-based for smoother control.

Overall, this project allowed me to combine creativity with technical programming skills, resulting in a fully playable game that meets the assignment requirements and demonstrates my growth as a developer.
