import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
// General Citation that I used to adapt my code
// I read up on state hooks and other effect hooks on the react website.
// Source URL https://react.dev/learn/managing-state
// Citation for handleSubmit/handleEdit/handleDelete/handleAdd
// I used this to help develop my handleSubmit to work with my API backend.
// Source URL https://react-hook-form.com/docs/useform/handlesubmit

function AddGenre() {
    const navigate = useNavigate()
    const [genre, setGenre] = useState({
        genre_title: '',
        genre_description: ''
    });

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await axios.post('http://flip3.engr.oregonstate.edu:35281/api/genres', {
        genre_title: genre.genre_title,
        genre_description: genre.genre_description
      });
      navigate('/genres');
    } catch (error) {
      console.error(error);
      alert('Failed to add genre. Please try again.');
    }
  };

  return (
    <div>
    <h1>Add Genre</h1>
    <form onSubmit={handleSubmit}>
      <div>
        <label>Genre Name:</label>
        <input
          type="text"
          placeholder={'Enter Genre Name...'}
          onChange={(e) => setGenre({ ...genre, genre_title: e.target.value })}
        />
      </div>
      <div>
        <label>Genre Description:</label>
        <input
          type="text"
          placeholder={''}
          onChange={(e) => setGenre({ ...genre, genre_description: e.target.value })}
        />
      </div>
      <button type="submit">Update</button>
    </form>
  </div>
  );
}

export default AddGenre;