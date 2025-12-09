# Snack Man – JavaScript Maze Game

This project is my Assignment 2 submission for Web Development, where I created a Pac-Man style maze game using HTML, CSS and JavaScript. The purpose of the assignment was to design and build an interactive browser-based game that demonstrated key concepts such as DOM manipulation, game logic, collision detection, event handling and dynamic rendering.

Snack Man begins with a menu where the player can choose either one-player or two-player mode before the game starts. Once the game loads, the player navigates through a maze, collecting points while avoiding moving enemies. When all points are collected, the game generates a completely new maze layout and the player progresses to the next level. Each level becomes more challenging as the maze changes and the enemies move unpredictably.

The maze is not pre-designed. Instead, it is generated programmatically using JavaScript. Every wall, point, player position and enemy position is created dynamically according to the values stored within the maze array. This means that each level has a unique layout, providing variety and increasing difficulty as the game continues.

The game includes a number of features such as a score counter, lives, level progression, a game-over screen, a restart option and a leaderboard that stores records using localStorage. Enemy characters move randomly and adjust their direction when colliding with walls. When the player collides with an enemy, a life is lost. Once all lives are gone, the player can submit their name to be recorded on the leaderboard.

Accessibility was also considered. The game includes on-screen arrow controls for users who may struggle with keyboard movement. A light mode option is also available, which changes the appearance and colour theme while keeping the core gameplay functional.

Throughout the development process, I carried out testing to ensure that the game behaved as expected. This included playing through the game to observe behaviours (black-box testing) and using the browser console to manually trigger functions such as level progression and game-over states. This allowed me to confirm that each part of the system worked independently as well as part of the complete game.

This project demonstrates my ability to:

- Build an interactive game using JavaScript  
- Generate a maze and game objects programmatically  
- Implement player controls using both keyboard and on-screen buttons  
- Detect collisions between players, enemies, walls and points  
- Manage game states, including score, lives, levels and difficulty  
- Store and update leaderboard records using localStorage  
- Design visual themes and responsive layouts using CSS  
- Structure and organise code for clarity and maintainability  

The project includes:

- **index.html** – the structure of the game and menu interface  
- **script.js** – all game logic, movement, generation systems and state management  
- **style.css** – design, layout and styling for both dark mode and light mode  
- **icon.png** – the game’s icon  
- **AS2Report.docx** – the written evaluation and testing report for the assignment  

Snack Man is the most advanced JavaScript game I have created so far. It helped me develop stronger problem-solving skills, understand how to manage game loops, and improve my approach to user interaction and interface design. If extended in the future, improvements could include enhanced enemy behaviour, smoother movement handling and additional interactive elements such as power-ups.

This project represents my progress as a developer and showcases my ability to design and implement a co
