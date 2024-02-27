import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
// General Citation that I used to adapt my code
// I read up on state hooks and other effect hooks on the react website.
// Source URL https://react.dev/learn/managing-state
// Citation for handleSubmit/handleEdit/handleDelete/handleAdd
// I used this to help develop my handleSubmit to work with my API backend.
// Source URL https://react-hook-form.com/docs/useform/handlesubmit

function EditGenre() {
    // Hooks
    const location = useLocation();
    const navigate = useNavigate();
    // State
    const [genre, setGenre] = useState(location.state)
    const [genre_title, setGenreTitle] = useState(genre.genre_title);
    const [genre_description, setGenreDescription] = useState(genre.genre_description)
  
  
// On component load
  useEffect(() => {
    if (!location.state) {
      navigate('/genres')
    }
  }, [location.state, navigate]); 

  const handleEdit = async (event) => {
    event.preventDefault();
    const editGenre = {
      genre_title: genre_title,
      genre_description: genre_description,
    }
    
    try {
      await axios.put(`http://flip3.engr.oregonstate.edu:35281/api/genres/${ genre.genre_id }`, editGenre)
      navigate('/genres')
    } catch (error) {
      console.error(error);
      alert('SQL failure')
      navigate('/genres')
    }
  };

  return (
    <div>
      <h1>Update Genre</h1>
      <form onSubmit={handleEdit}>
        <div>
          <label>Genre Title:</label>
          <input
            type="text"
            defaultValue={genre.genre_title}
            onChange={(e) => setGenreTitle(e.target.value)}
          />
        </div>
        <div>
          <label>Genre Description:</label>
          <input
            type="text"
            defaultValue={genre.genre_description}
            onChange={(e) => setGenreDescription(e.target.value)}
          />
        </div>
        <button type="submit">Update</button>
      </form>
    </div>
  );
}

export default EditGenre;