import React, { useState } from 'react';
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

function DeleteMovie() {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(`http://flip3.engr.oregonstate.edu:35281/api/movies/${ location.state.movie_id }`);
      setLoading(false);
      navigate('/movies');
    } catch (error) {
      console.error(error);
      alert('Cannot delete because it is cross-references in Movies and Genres, delete there first.');
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Delete Movie</h2>
      <p>Are you sure you want to delete this Movie?</p>
      <button disabled={loading} onClick={handleDelete}>
        {loading ? 'Deleting...' : 'Delete'}
      </button>
    </div>
  );
}

export default DeleteMovie;