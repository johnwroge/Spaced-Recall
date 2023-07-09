import React from 'react';

export default function CreateCard({ formData, handleClick, handleSubmit }) {
  return (
    <div className="create-card">
      <h2>Create a New Flashcard</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Add a new flash card title here"
          onChange={handleClick}
          name="title"
          value={formData.title}
          required
        />
        <textarea
          type = "text"
          placeholder="Add the definition to the word here"
          onChange={handleClick}
          name="definition"
          value={formData.definition}
          required
        ></textarea>
        <button type="submit">Add Flash Card</button>
      </form>
    </div>
  );
}


