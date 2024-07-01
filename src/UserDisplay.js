/* User dashboard parent component holding flashcard logic. All fetch requests 
are located in this file. Moving to separate files will improve testability. */

import React, { useEffect, useState } from 'react';
import Card from './Card';
import CreateCard from './CreateCard';

export default function UserDisplay() {

  /* Array holding times[i] where i corresponds to bin and times[i] is the wait time before being shown the card */
  const binTimes = [0, 5, 10, 120, 600, 3600, 18000, 86400, 432000, 2160000, 10540800, Infinity];

  /* Cards State */
  
  const [cards, setCards] = useState([]);
  /* Hard bin for items with 10 incorrect attempts */
  const [hardBin, setHardBin] = useState([])

  const [showCard, setShowCard] = useState(false);

  /* State For Create Card Form */
  const [formData, setFormData] = useState({
    title: '',
    definition: '',
    bin: 0,
    timeRemaining: 0,
    incorrectTimes: 0,
    known: false,
  });


  /* Logic allowing user to display all cards and time remaining  */
  const handleDisplayCards = () => {
    setShowCard(prev => !prev)
  }
  

  
  /* Retrieve Updated Cards Every Second From Database */

  useEffect(() => {
    const fetchCards = () => {
      fetch('/user/cards')
        .then(res => res.json())
        .then(data => setCards(data))
        .catch(err => console.error('Error in fetch cards: ', err));
    };
  
    const timer = setInterval(fetchCards, 1000);
    
    return () => {
      clearInterval(timer);
    };
  }, []);

  
  
   


  /* Update form input values per user interaction */

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  

  /* Submitting completed form and resetting input area. For create new card route */

  
  const handleFormSubmit = (event) => {
    event.preventDefault();
    const newCard = {
      title: formData.title,
      definition: formData.definition,
      incorrectTimes: 0,
      timeRemaining: 0,
      bin: 0,
      timeStamp: Math.floor(Date.now() / 1000), 
    };
    
      fetch('/user/cards', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
        body: JSON.stringify(newCard),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to add new card');
        }
      })
      .catch((error) => {
        console.error('error in handle form submit: ',error);
      });
    setFormData({
      title: '',
      definition: '',
    });
  };

  /* Updating Incorrect Count On Selected Flashcard */

  const updateIncorrectCount = (id) => {

    const card = cards.find((card) => card._id === id);
    const { incorrectTimes } = card;

    const timeStamp = Math.floor(Date.now() / 1000);
    const nextBin = incorrectTimes + 1 > 9 ? -1 : 1; 
    
    var timeRemaining =  nextBin >= 0 ? binTimes[nextBin] : Infinity; 
    const incorrect = incorrectTimes + 1;  

    fetch(`/user/cards`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        _id: id,
        incorrectTimes: incorrect,
        bin: nextBin,
        timeStamp: timeStamp,
        timeRemaining: timeRemaining
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Update Incorrect Count Data: ", data)
      })
      .catch((err) => console.error('Error in update incorrect count: ',err));
  };
  
  


/* helper function that increments bin if user is correct in database */


  const updateBin = (id) => {
    // console.log("CLICKED UPDATE CORRECT BIN")
    const card = cards.find((card) => card._id === id);

    const timeStamp = Math.floor(Date.now() / 1000);
    const nextBin = card.bin + 1;
    const cappedBin = nextBin > 11 ? 11 : nextBin;
    var timeRemaining =  binTimes[cappedBin];
    // console.log('Time remaining in update bin',card.timeRemaining)
  
    fetch(`/user/cards`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        _id: id,
        bin: cappedBin,
        timeStamp: timeStamp,
        timeRemaining: timeRemaining
      }),
  
    })
      .then((res) => res.json())
      .then((data) => data)
      .catch((err) => console.error('Error in update bin: ', err));
  };
   


  /*use effect hook to update timers on each card every second */
// clean code means extensible, readable, 
// make code more readable using helper function. people shouldn't stop and think what this code is doing
// 

useEffect(() => {
  const timer = setInterval(() => {
    cards.forEach((card) => {
      if (card.bin !== -1 && card.incorrectTimes < 10){
      const currentTime = Math.floor(Date.now() / 1000);
      const timeElapsed = currentTime - card.timeStamp;
      const timeRemaining = binTimes[card.bin] - timeElapsed;
      if (timeRemaining !== card.timeRemaining) {
       
        fetch(`/user/cards`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            _id: card._id,
            timeRemaining: timeRemaining,
          }),
        })
          .then((res) => res.json())
          .then((data) => data)
          .catch((err) => console.error('Error in update time: ', err));
      }
  }});
  }, 1000);

  return () => {
    clearInterval(timer);
  };
}, [cards]);



// create a helper functions makes code more readable. name of function explains what you are doing. 
// keeps the main function flatter.

  let filteredCards; 
  /* filtering cards based on conditions (no time remaining or not in final bin 11) */
  if (!showCard){
    filteredCards = cards.filter((card) => card.timeRemaining <= 0 && card.bin < 11 && card.bin !== -1);
    filteredCards.sort((a,b) => b.bin - a.bin)
  } else {
    filteredCards = cards.filter((card) =>  card.bin < 11 && card.bin !== -1);
    filteredCards.sort((a,b) => b.bin - a.bin)
  }
  
  // /* Conditional Message for User */ format this to be cleaner
  // instead of nest statements. Switch statment would work, or a guard clause. 
  let display;

   if (cards.length || hardBin.length){
    if (cards.every(el => el.bin === 11 || el.bin === -1)){
     display = "You have no more words to review; you are permanently done!"
  } else if (cards.every(el => el.bin > 0 && el.timeRemaining > 0)){
     display = "You are temporarily done; please come back later to review more words."
  }} else {
     display = ""
  }


  let cardDisplay = showCard ? 'Enabled': 'Disabled';


  return (
    <div>
      <CreateCard handleClick={handleChange} handleSubmit={handleFormSubmit} formData={formData} />

      
      <div> 
        <button className='display-button'> 
          <h4 onClick = {handleDisplayCards}> Show All Cards and Remaining Time </h4>
        </button>
          <h4> {cardDisplay} </h4> 
      </div>
      <h2> {display} </h2>
        <div className="card-container">
        {filteredCards.map((el) => (
          <Card
            id={el._id}
            key={el._id}
            title={el.title}
            definition={el.definition}
            bin={el.bin}
            timeRemaining={el.timeRemaining}
            incorrectTimes={el.incorrectTimes}
            known={el.known}
            handleClick={updateIncorrectCount}
            updateBin={updateBin}
          />
        ))}
        </div> 
    </div>
  );
}



