import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
// General Citation that I used to adapt my code
// I read up on state hooks and other effect hooks on the react website.
// Source URL https://react.dev/learn/managing-state
// Citation for handleSubmit/handleEdit/handleDelete/handleAdd
// I used this to help develop my handleSubmit to work with my API backend.
// Source URL https://react-hook-form.com/docs/useform/handlesubmit

function MoviesAndGenres() {
  const navigate = useNavigate();
  const [movieGenres, setMovieGenres] = useState([]);

  async function fetchMovieGenres() {
    try {
      const response = await axios.get('http://flip3.engr.oregonstate.edu:35281/api/movie_genres');
      setMovieGenres(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  function handleDelete(movieGenre) {
    navigate('/movie_genres/delete', { state: movieGenre });
  }

  useEffect(() => {
    fetchMovieGenres();
  }, []);

  return (
    <div>
      <h1>Movies and Genres</h1>
      <table>
        <thead>
          <tr>
            <th>Movie ID</th>
            <th>Movie Title</th>
            <th>Genre ID</th>
            <th>Genre Title</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {movieGenres.map((movieGenre) => (
            <tr key={`${movieGenre.movie_id}-${movieGenre.genre_id}`}>
              <td>{movieGenre.movie_id}</td>
              <td>{movieGenre.movie_title}</td>
              <td>{movieGenre.genre_id}</td>
              <td>{movieGenre.genre_title}</td>
              <td>
                <button onClick={() => handleDelete(movieGenre)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={() => navigate('/movie_genres/add')}>Add Movie-Genre Association</button>
      <button onClick={() => navigate('/')}>Return to Home</button>
    </div>
  );
}

export default MoviesAndGenres;