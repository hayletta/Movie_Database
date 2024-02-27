import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
// General Citation that I used to adapt my code
// I read up on state hooks and other effect hooks on the react website.
// Source URL https://react.dev/learn/managing-state
// Citation for handleSubmit/handleEdit/handleDelete/handleAdd
// I used this to help develop my handleSubmit to work with my API backend.
// Source URL https://react-hook-form.com/docs/useform/handlesubmit

function Movies() {
  const navigate = useNavigate();
  const [movies, setMovies] = useState([]);

  async function fetchMovies() {
    try {
      const response = await axios.get('http://flip3.engr.oregonstate.edu:35281/api/movies');
      setMovies(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  function handleEdit(movie) {
    navigate("/movies/edit", { state: movie });
  }

  function handleDelete(movie) {
    navigate("/movies/delete", { state: movie });
  }

  useEffect(() => {
    fetchMovies();
  }, []);

  return (
    <div>
      <h1>Movies</h1>
      <table>
        <thead>
          <tr>
            <th>Movie ID</th>
            <th>Movie Title</th>
            <th>Director</th>
            <th>Studio</th>
            <th>Release Date</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {movies.map((movie) => (
            <tr key={movie.movie_id}>
              <td>{movie.movie_id}</td>
              <td>{movie.movie_title}</td>
              <td>{movie.director_firstname} {movie.director_lastname}</td>

              <td>{movie.studio_name}</td>
              <td>{new Date(movie.release_date).toLocaleDateString()}</td>
              
              <td>
                <button onClick={() => handleEdit(movie)}>Edit</button>
              </td>
              <td>
                <button onClick={() => handleDelete(movie)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={() => navigate('/movies/add')}>Add Movie</button>
      <button onClick={() => navigate('/')}>Return to Home</button>
    </div>
    
  );
}

export default Movies;