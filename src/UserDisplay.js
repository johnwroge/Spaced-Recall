import React, { useEffect, useState } from 'react';
import Card from './Card';
import CreateCard from './CreateCard';
import { v4 as uuidv4 } from 'uuid';


export default function UserDisplay() {


  const fetchCards = async() => {

    const apiRes = await fetch(`http://localhost:3000/user/cards`);

    if (!apiRes.ok){
        throw new Error(`fetch not ok`)
    }

     apiRes.json()
     .then(result => 
      console.log(result))
      .catch(err => 
        console.log(err));
}

fetchCards()


  //array holding times[i] where i corresponds to bin and times[i] is the wait time
  const binTimes = [0, 5, 25, 120, 600, 3600, 18000, 86400, 432000, 2160000, 10540800, Infinity];

  // Bin 0
  const [cards, setCards] = useState([]);

  // Hard bin for items with 10 incorrect attempts
  const [hardBin, setHardBin] = useState([])

  // Working
  const [formData, setFormData] = useState({
    title: '',
    definition: '',
    bin: 0,
    timeRemaining: 0,
    incorrectTimes: 0,
    known: false,
  });

  // Working: update form input values on user interaction
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  // Working: submitting completed form and resetting input area
  const handleFormSubmit = (event) => {
    event.preventDefault();
    const newCard = {
      id: uuidv4(),
      title: formData.title,
      definition: formData.definition,
      incorrectTimes: 0,
      timeRemaining: 0,
      bin: 0,
      timestamp: Math.floor(Date.now() / 1000), // Set the timestamp when the card is added
    };
    setCards((prevCards) => [...prevCards, newCard]);
    setFormData({
      title: '',
      definition: '',
    });
  };
  

  //helper function that finds the card and updates incorrect count. 
  const updateIncorrectCount = (id) => {
    setCards((prevCards) => {
      var updatedCards = prevCards.map((card) => {
        if (card.id === id) {
          if (card.incorrectTimes === 9) {
            return { ...card, bin: -1 };
          }
          return {
            ...card,
            incorrectTimes: card.incorrectTimes + 1,
            bin: 1,
            timestamp: Math.floor(Date.now() / 1000),
          };
        }
        return card;
      });
  
      const hardBinCards = updatedCards.filter((card) => card.bin === -1);
      setHardBin((prev) => [...prev, ...hardBinCards]);
      return updatedCards.filter((card) => card.bin !== -1);
    });
  };
  


//helper function that increments bin if user is correct
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
              timestamp: Math.floor(Date.now() / 1000)
            };
          }
        }
        return el;
      });
    });
  };



//use effect hook to update timers on each card every second
useEffect(() => {
    const timer = setInterval(() => {
          setCards((prevCards) => {
          return prevCards.map((card) => {
          const currentTime = Math.floor(Date.now() / 1000);
          const timeElapsed = currentTime - card.timestamp;
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

  //filtering cards based on conditions (no time remaining or not in final bin 11)
  const filteredCards = cards.filter((card) => card.timeRemaining <= 0 && card.bin < 11);
  filteredCards.sort((a,b) => b.bin - a.bin)
  
  let display;
   if (cards.length || hardBin.length){
    if (cards.every(el => el.bin === 11 || el.bin === -1)){
     display = "you have no more words to review; you are permanently done!"
  } else if (cards.every(el => el.bin > 0 && el.timeRemaining > 0)){
     display = "You are temporarily done; please come back later to review more words."
  }}else {
     display = ""
  }


  
  return (
    <div>
      <CreateCard handleClick={handleChange} handleSubmit={handleFormSubmit} formData={formData} />

      <h1>UserDisplay</h1>
      <h2> {display} </h2>
      {filteredCards.map((el) => (
        <Card
          id={el.id}
          key={el.id}
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



  
