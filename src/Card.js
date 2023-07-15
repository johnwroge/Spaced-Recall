/* Card component holding title, definition, bin, time remaining, and incorrect times */


import React, { useState } from 'react'

export default function Card({ id, title, definition, bin, timeRemaining, incorrectTimes, handleClick, updateBin }) {
  /* Show definition state*/
  const [value, setValue] = useState(false);
  /* Disable button after clicking (instead of debounce or throttle)*/
  const [buttonsDisabled, setButtonsDisabled] = useState(false);



  //Logic to show definition or not
  const showMeAnswer = () => {
    setValue(!value);
  };

  //Invokes the update incorrect bin function in UserDisplay.
  const updateIncorrect = () => {
    setButtonsDisabled(true);
    handleClick(id);

  };

  //Invokes the update bin function in UserDisplay
  const handleCorrect = () => {
    setButtonsDisabled(true);
    updateBin(id);
  };

  //Changes remaining time to 0 if it's negative 
  const time = timeRemaining < 0 ? 0: timeRemaining;
  
  return (
    <div className="card">
      <h3>Word: {title}</h3>
      {value && <h3>Definition: {definition}</h3>}
      <h4>Bin: {bin}</h4>

      <h4>Remaining Time: {time}</h4>
      <h4>Incorrect Times: {incorrectTimes}</h4>
      {
        !value && (
      <button onClick={showMeAnswer}>Show Definition</button>
        )
      }
      {value && (
        <>
          <button disabled={buttonsDisabled} onClick={handleCorrect}>I got it</button>
          <button disabled={buttonsDisabled} onClick={updateIncorrect}>I did not get it</button>
        </>
      )}
    </div>
  );
}