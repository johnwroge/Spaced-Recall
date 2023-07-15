# hiring-john-wroge-flashcards
Take home assignment for Shortform hiring team. 


Tech Requirements

Build as a web app - should be accessible via browser

App should be deployed to a live server and should not need local deployment to test. App should be continuously live for at least 2 weeks after completion

Must build with MVC-like architecture
Here is a starter app based around our stack (Flask, SQLAlchemy, Vue.js, Docker). You are not required to use it; you should use whatever stack you’re comfortable with.

Final code should be shared with us, ideally as a Github repo. 

Please keep the repository private to avoid discoverability by other candidates. 

Name your repo “hiring-[firstname]-[lastname]-flashcards”

Example: “hiring-thomas-detante-flashcards”

Checklist:

Flashcard Logic:
[x] There are 12 bins of cards, each representing increasing levels of mastery. 
[x] Each user-word starts out in bin 0.
[x] If a user gets a word right, it moves to the next bin, up to bin 11.
[x] If a user gets a word wrong, it goes back to bin 1.
[x] Bins 1-11 are associated with the following timespans:  5 seconds, 25 seconds, 2 minutes, 10 minutes, 1 hour, 5 hours, 1 day, 5 days, 25 days, 4 months, and never. The timespans reflect the amount of time to wait before the next review of that card.

Reviewing Words:
[x] If any words at bin 1 or higher have reached 0 time or less, review these first.
[x] For the subset above, review higher-numbered bins before lower bins.
[x] Between two words of the same bin and same time for review, order does not matter.
? [x] If all words in bin 1 or higher have positive timers on them, start drawing new words from bin 0 (order does not matter).
[x] If there are no words in bin 0 and all other words still have positive timers, display a message: “You are temporarily done; please come back later to review more words.”

Forgetting Words:
[x] If a user has gotten any single word wrong 10 times ever (even if they got the word right in between; this is a lifetime count), the word gets put into a “hard to remember” bin and is never shown again.
[x] If all words are either in the last bin (never review) or in “hard to remember”, display a message “you have no more words to review; you are permanently done!”

Study Interface - User Interaction:
[x] When a user loads the app, he is shown a word.
[x] When he sees a word and clicks “show definition” the definition displays.
[x] After seeing the definition, he clicks “I got it” or “I did not get it”
[x] Status messages may also be shown as defined above
[x] UI can be simple and utilitarian. 

Notes For Development:  
'npm run dev' 


