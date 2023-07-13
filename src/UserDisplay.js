/* User dashboard parent component holding flashcard logic. All fetch requests 
are located in this file. Moving to separate files would improve testability. 
*/

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

  /* State For Create Card Form */
  const [formData, setFormData] = useState({
    title: '',
    definition: '',
    bin: 0,
    timeRemaining: 0,
    incorrectTimes: 0,
    known: false,
  });

  
  /* Retrieve Updated Cards Every Second From Database */

  useEffect(() => {
    const fetchCards = () => {
      fetch('/user/cards')
        .then(res => res.json())
        .then(data => setCards(data))
        .catch(err => console.error(err));
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
        console.log('error in handle form submit: ',error);
      });
    setFormData({
      title: '',
      definition: '',
    });
  };

  /* Updating Incorrect Count On Selected Flashcard */

  const updateIncorrectCount = (id) => {
    // console.log("CLICKED UPDATE INCORRECT BIN")
    // const cardToUpdate = cards.find((card) => card._id === id);
    // if (!cardToUpdate) {
    //   console.error(`Card with id ${id} not found.`);
    //   return;
    // }
    // var newBin; 
    // let timeRemaining;
    // const updatedIncorrectTimes = cardToUpdate.incorrectTimes + 1;
    // const shouldMoveToHardBin = updatedIncorrectTimes > 9;
    // if (shouldMoveToHardBin) {
    //   setHardBin((prev) => [...prev, cardToUpdate]);
    //   timeRemaining = Infinity
    //   newBin = -1
    // } else {
    //   timeRemaining = 5;
    //   newBin = 1
    // } const timeStamp = Math.floor(Date.now() / 1000);


    console.log("CLICKED INCORRECT BIN")
    const card = cards.find((card) => card._id === id);
    const { incorrectTimes } = card;

    const timeStamp = Math.floor(Date.now() / 1000);
    const nextBin = incorrectTimes + 1 > 9 ? -1 : 1; 
    
    var timeRemaining =  nextBin >= 0 ? binTimes[nextBin] : Infinity; 
    incorrectTimes += 1; 

    fetch(`/user/cards`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        _id: id,
        incorrectTimes: incorrectTimes,
        bin: newBin,
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
    const card = cards.find((card) => card._id === id);

    const timeStamp = Math.floor(Date.now() / 1000);
    const nextBin = card.bin + 1;
    const cappedBin = nextBin > 11 ? 11 : nextBin;
    var timeRemaining =  binTimes[cappedBin];
    console.log("CLICKED UPDATE CORRECT BIN")
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
      .catch((err) => console.error(err));
  };
   






  /*use effect hook to update timers on each card every second */


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
          .catch((err) => console.error(err));
      }
  }});
  }, 1000);

  return () => {
    clearInterval(timer);
  };
}, [cards]);







  /* filtering cards based on conditions (no time remaining or not in final bin 11) */
  const filteredCards = cards.filter((card) => card.timeRemaining <= 0 && card.bin < 11 && card.bin !== -1);
  filteredCards.sort((a,b) => b.bin - a.bin)
  
  /* Conditional Message for User */
  let display;
   if (cards.length || hardBin.length){
    if (cards.every(el => el.bin === 11 || el.bin === -1)){
     display = "you have no more words to review; you are permanently done!"
  } else if (cards.every(el => el.bin > 0 && el.timeRemaining > 0)){
     display = "You are temporarily done; please come back later to review more words."
  }} else {
     display = ""
  }


  return (
    <div>
      <CreateCard handleClick={handleChange} handleSubmit={handleFormSubmit} formData={formData} />

      <h1>Welcome User </h1>
      <h2> {display} </h2>
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
  );
}



/*
useEffect(() => {
    const timer = setInterval(() => {
          setCards((prevCards) => {
          return prevCards.map((card) => {
          const currentTime = Math.floor(Date.now() / 1000);
          // const timeElapsed = currentTime - card.timestamp;
          const timeElapsed = currentTime - card.timeStamp;
          const timeRemaining =  binTimes[card.bin] - timeElapsed;
  
          return {
            ...card,
            timeRemaining,
          };
        });
      });
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [cards]);


  const updateBin = (id) => {
    setCards((prevCards) => {
      return prevCards.map((el) => {
        if (el.id === id) {
          const nextBin = el.bin + 1;
          const cappedBin = nextBin > 11 ? 11 : nextBin;
          if (el.bin >= 0) {
            return {
              ...el,
              bin: cappedBin,
              timeRemaining: binTimes[cappedBin],
              timeStamp: Math.floor(Date.now() / 1000)
            };
          }
        }
        return el;
      });
    });
  };


*/


  /*helper function that finds the card and updates incorrect count.
  patch route */
  // const updateIncorrectCount = (id) => {
  //   setCards((prevCards) => {
  //     var updatedCards = prevCards.map((card) => {
  //       if (card._id === _id) {
  //         if (card.incorrectTimes === 9) {
  //           return { ...card, bin: -1 };
  //         }
  //         return {
  //           ...card,
  //           incorrectTimes: card.incorrectTimes + 1,
  //           bin: 1,
  //           timeStamp: Math.floor(Date.now() / 1000),
  //         };
  //       }
  //       return card;
  //     });
  
  //     const hardBinCards = updatedCards.filter((card) => card.bin === -1);
  //     setHardBin((prev) => [...prev, ...hardBinCards]);
  //     return updatedCards.filter((card) => card.bin !== -1);
  //   });
  // };

  
