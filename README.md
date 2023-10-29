Repetition is the mother of all learning' - an Athenian Proverb.

As a lifelong learner, it can be challenging to keep track of and review all the new topics one would like to master. This project was designed to simplify this process by enabling students to store their flashcards in a database and display these cards on a timed scale dependent on how many times they have answered correctly.

This application allows users to store flashcards in a database for spaced repetition. It includes a set timer for each card, ranging from 5 seconds to 5 months, spread over 10 bins. If the user answers the question correctly, the card is moved to the next bin, and the timer is reset to an increased amount. If not, the card is placed in the first bin, and the process repeats itself. If the user answers incorrectly ten times, the card is moved to a 'hard to remember' bin, which can be accessed as needed for review.

To get started fork and clone this repo. 

Install Dependencies 

`npm install`

Create an env file to store your database. The backend api is set up to use a mongodb database for simpicity and efficient retrieval. 

`MONGO_URI= mongodb+srv://...`

To run the application in development

`npm run dev`

To build the project for production

`npm run build`

Visit http://localhost:3000 in development to use the application. 

Enter a new card name and definition in the input area and click 'Add Flash Card'. If you get the answer, click 'I got it', if not click 'I didn't get it'. 


