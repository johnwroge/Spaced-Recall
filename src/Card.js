import React, { useState } from 'react'



export default function Card({ id, title, definition, bin, timeRemaining, incorrectTimes, handleClick, updateBin }) {
  const [value, setValue] = useState(false);

  const showMeAnswer = () => {
    setValue(!value);
  };

  const updateIncorrect = () => {
    handleClick(id);
  };

  const handleCorrect = () => {
    updateBin(id);
  };

  //changing time to 0 if it's negative (personal preference)
  const time = timeRemaining < 0 ? 0: timeRemaining;
  
  return (
    <div className="card">
      <p>title: {title}</p>
      {value && <p>definition: {definition}</p>}
      <p>bin: {bin}</p>

      <p>Remaining Time: {time}</p>
      <p>Incorrect Times: {incorrectTimes}</p>
      
      <button onClick={showMeAnswer}>Show Definition</button>
      <button onClick={handleCorrect}>I got it</button>
      <button onClick={updateIncorrect}>I did not get it</button>

    </div>
  );
}