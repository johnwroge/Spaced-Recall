



This application allows users to store flashcards in a database for spaced repetition.
There is a set timer for each card for each successive bin, from 5 seconds (bin 1) to 5 months (bin10) 


To get started fork and clone this repo. 

Install Dependencies 

`npm install`

Create an env file to store your database. The backend api is set up to use a mongodb database, but can be configured to work with a sql database if needed. 

`MONGO_URI= mongodb+srv://...`

To run the application in development

`npm run dev`

To build the project for production

`npm run build`

Visit http://localhost:3000 to use the application. 

