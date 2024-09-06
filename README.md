# Spaced Repetition Flashcard App

_"Repetition is the mother of all learning" - an Athenian Proverb_

## Overview

This application is designed to help lifelong learners master new topics through effective spaced repetition. Users can store flashcards in a database and review them based on how well they know each card. The app uses a timed system to manage review intervals, which range from 5 seconds to 5 months, spread across 10 bins. Correctly answered cards move to the next bin with an increased review interval, while incorrect answers move the card back to the first bin. Cards that are answered incorrectly ten times are moved to a special 'hard to remember' bin for additional review.

## Getting Started

To get started with the application, follow these steps:

1. **Fork and Clone the Repository**
   - Fork the repository on GitHub and clone it to your local machine.

2. **Install Dependencies**
   - Navigate to the project directory and run:
     ```bash
     npm install
     ```

3. **Configure Environment Variables**
   - Create a `.env` file in the root directory and add your MongoDB connection string:
     ```env
     MONGO_URI=mongodb+srv://...
     ```

4. **Run the Application in Development Mode**
   - Start the development server with:
     ```bash
     npm run dev
     ```

5. **Build the Project for Production**
   - To create a production build, run:
     ```bash
     npm run build
     ```

6. **Access the Application**
   - Open your browser and visit [http://localhost:3000](http://localhost:3000) to use the application.

## Using the Application

1. **Add Flashcards**
   - Enter a new card name and definition in the input area and click **'Add Flash Card'**.

2. **Review Flashcards**
   - When reviewing a card, click **'I got it'** if you answered correctly or **'I didn't get it'** if you answered incorrectly.
