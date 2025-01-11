## Two Words, One Letter Apart

A fast-paced, engaging word puzzle game where players guess two words that differ by just one letter based on creative hints. Test your vocabulary, challenge your mind, and climb the leaderboard!

## Features

- Addictive Gameplay: Solve word pairs where the second word is one letter apart from the first.
- Hints-Based Puzzle: Each word comes with unique, descriptive hints.
- Leaderboard: Compete with others or yourself by setting high scores.
- Reveal Answer: A helpful feature to display the correct answers.
- Guest Play: Play without logging in, but leaderboard features are reserved for registered users.
- Sound Effects and Animations: Immersive sounds and visuals to enhance gameplay.

## How to Play

- Start the game by entering your name or logging in.
- Each round presents two hints for two words.
- Use the letter boxes to input your guesses.
- Correct answers update your score, and a timer bonus keeps the game alive.
- Click "Reveal Answers" if stuck, but be ready for the next challenge.
- Climb the leaderboard by scoring higher each time!

## Setup and Installation

1. Clone the Repository:

```
git clone https://github.com/mohaksnghl/puzzle-app.git
cd puzzle-app
```

2. Install Dependencies:

```
npm install
```

3. Start the Development Server:

```
npm start
```

4. Set Up Backend:

- Deploy the provided AWS Lambda scripts and configure the API Gateway.
- Ensure CORS is enabled for S3 and API Gateway.

5. Environment Variables:

Add your firebase keys in a .env file.

```
REACT_APP_FIREBASE_API_KEY=<firebase-api-key>
REACT_APP_FIREBASE_AUTH_DOMAIN=<firebase-auth-domain>
REACT_APP_FIREBASE_PROJECT_ID=<firebase-project>
REACT_APP_FIREBASE_STORAGE_BUCKET=<firebase-storage-bucket>
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=<firebase-messaging-sended-id>
REACT_APP_FIREBASE_APP_ID=<firebase-app-id>
```

Enjoy solving word puzzles, one letter at a time! 🎉
