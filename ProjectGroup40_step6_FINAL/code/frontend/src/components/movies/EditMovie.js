import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
// General Citation that I used to adapt my code
// I read up on state hooks and other effect hooks on the react website.
// Source URL https://react.dev/learn/managing-state
// Citation for handleSubmit/handleEdit/handleDelete/handleAdd
// I used this to help develop my handleSubmit to work with my API backend.
// Source URL https://react-hook-form.com/docs/useform/handlesubmit

function EditMovie() {
  // Hooks
  const location = useLocation();
  const navigate = useNavigate();
  
  // State
  const [movie, setMovie] = useState({});
  const [directors, setDirectors] = useState([]);
  const [studios, setStudios] = useState([]);

  // On component load
  useEffect(() => {
    if (!location.state) {
      navigate('/movies');
    } else {
      setMovie(location.state);
      fetchDirectors();
      fetchStudios();
    }
  }, [location.state, navigate]);

  const fetchDirectors = async () => {
    try {
      const response = await axios.get('http://flip3.engr.oregonstate.edu:35281/api/directors');
      setDirectors(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchStudios = async () => {
    try {
      const response = await axios.get('http://flip3.engr.oregonstate.edu:35281/api/studios');
      setStudios(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = async (event) => {
    event.preventDefault();
    try {
      await axios.put(`http://flip3.engr.oregonstate.edu:35281/api/movies/${movie.movie_id}`, movie);
      navigate('/movies');
    } catch (error) {
      console.error(error);
      alert('Failed to update movie. Please try again.');
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setMovie((prevMovie) => ({ ...prevMovie, [name]: value }));
  };

  return (
    <div>
      <h1>Update Movie</h1>
      <form onSubmit={handleEdit}>
        <div>
          <label>Movie Title:</label>
          <input
            type="text"
            name="movie_title"
            value={movie.movie_title || ''}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Studio:</label>
          <select
            name="studio_id"
            value={movie.studio_id || ''}
            onChange={handleInputChange}
          >
            <option value="">Select a studio</option>
            {studios.map((studio) => (
              <option key={studio.studio_id} value={studio.studio_id}>
                {studio.studio_name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Director:</label>
          <select
            name="director_id"
            value={movie.director_id || ''}
            onChange={handleInputChange}
          >
            <option value="">Select a director</option>
            {directors.map((director) => (
              <option key={director.director_id} value={director.director_id}>
                {director.director_firstname} {director.director_lastname}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Release Date:</label>
          <input
            type="date"
            name="release_date"
            value={movie.release_date || ''}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit">Update</button>
      </form>
    </div>
  );
}

export default EditMovie;