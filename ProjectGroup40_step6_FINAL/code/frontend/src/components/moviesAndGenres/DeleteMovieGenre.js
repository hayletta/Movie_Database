import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
// Citation for handleDelete
// Date: 05/25/2023
// Adapted from based on the structure of how to work with axios methods. I also had help from office hours and added the loading state and event handler
// Source URL: https://jasonwatmore.com/post/2021/08/25/axios-http-delete-request-examples. This was the basis for my other components as well. 
// General Citation that I used to adapt my code
// I read up on state hooks and other effect hooks on the react website.
// Source URL https://react.dev/learn/managing-state
// Citation for handleSubmit/handleEdit/handleDelete/handleAdd
// I used this to help develop my handleSubmit to work with my API backend.
// Source URL https://react-hook-form.com/docs/useform/handlesubmit


function DeleteMoviesAndGenres() {
  const navigate = useNavigate();
  const location = useLocation();

  // sets the location state to false
  const [loading, setLoading] = useState(false);

  // Allows access to movie_id and genre_id
  const { movie_id, genre_id } = location.state;

  // Checks to see if the movie_id or genre_id exist and alerts if it is invalid. Then navigates back to the correct page.
  useEffect(() => {
    if (!movie_id || !genre_id) {
      alert('Invalid movie-genre association');
      navigate('/movies_and_genres');
    }
  }, [movie_id, genre_id, navigate]);

  // Works with the API in the backend to delete. 
  const handleDelete = async () => {
    try {
      // Sets the loading state to true
      setLoading(true);
      // Sends the request to the api in the backend with movie_id and genre_id.
      await axios.delete(`http://flip3.engr.oregonstate.edu:35281/api/movie_genres/${movie_id}/${genre_id}`);
      // Sets the loading state to False after it is finished
      setLoading(false);
      // Navigates back to the page
      navigate('/movie_genres');
    }
    // error handling 
    catch (error) {
      console.error(error);
      alert('Cannot delete since it is a foreign key in movie. Delete associated movie first.');
      setLoading(false);
    }
  };

  // Gives the HTML formatting. 
  return (
    <div>
      <h2>Delete Movie-Genre Association</h2>
      <p>Are you sure you want to delete this movie-genre association?</p>
      <button disabled={loading} onClick={handleDelete}>
        {loading ? 'Deleting...' : 'Delete'}
      </button>
    </div>
  );
}

export default DeleteMoviesAndGenres;