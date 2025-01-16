# 8866 Scouting App

Welcome to the 8866 Scouting App! This application is designed to assist in collecting and analyzing data for scouting purposes during robotics competitions. Below you will find instructions on how to set up, use, and contribute to the project.

## Table of Contents
1. [Features](#features)
2. [Installation](#installation)
3. [Usage](#usage)
4. [File Structure](#file-structure)
5. [Contributing](#contributing)
6. [License](#license)

## Features
- Pre-game selections including match number, team number, alliance color, and match type.
- Scoring options for the autonomous and teleoperated phases.
- End game options including win, lose, tie, park, deep, and shallow.
- QR code generation for match data.
- User-friendly interface for easy navigation and operation.

## Installation

Download the available files from the release.

### Prerequisites
- Node.js and npm (Node Package Manager) installed on your machine.
- A modern web browser.

### Steps
1. Clone the repository:
    ```bash
    git clone https://github.com/8866CJ/8866-Scouting-App.git
    cd 8866-Scouting-App
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Start the application:
    ```bash
    npm start
    ```

4. Open your web browser and navigate to `http://localhost:3000` to use the application.

## Usage

## Pre-Game Selections
Enter the match number and team number.
Select the alliance color and match type.
Click the "Start Scouting" button to proceed to the game section.
## Game Section
Click the "Start Game" button to begin the timer.
Use the buttons provided to record scoring options for both the autonomous and teleoperated phases.
Select the end game options as applicable.
Click the "Generate QR Code" button to generate a QR code for the match data.

### QR Code Generation
- The application generates QR codes offline for easy sharing of match data.

## File Structure
```
8866-Scouting-App/
├── public/
│   ├── index.html
│   └── styles.css
├── src/
│   ├── renderer.js
│   ├── preload.js
│   ├── main.js
│   └── script.js
├── .gitignore
├── package.json
├── README.md
└── qrcode.min.js
```

## Contributing
We welcome contributions to the 8866 Scouting App! To contribute:

1. Fork the repository.
2. Create a new branch:
    ```bash
    git checkout -b feature/your-feature-name
    ```
3. Make your changes.
4. Commit your changes:
    ```bash
    git commit -m 'Add some feature'
    ```
5. Push to the branch:
    ```bash
    git push origin feature/your-feature-name
    ```
6. Open a pull request.

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

Thank you for using the 8866 Scouting App! We hope it helps you in your competitions and data analysis.
