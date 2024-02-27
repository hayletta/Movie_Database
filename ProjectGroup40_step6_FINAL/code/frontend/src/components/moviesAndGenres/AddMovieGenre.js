import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
// General Citation that I used to adapt my code
// I read up on state hooks and other effect hooks on the react website.
// Source URL https://react.dev/learn/managing-state
// Citation for handleSubmit/handleEdit/handleDelete/handleAdd
// I used this to help develop my handleSubmit to work with my API backend.
// Source URL https://react-hook-form.com/docs/useform/handlesubmit

function AddMovieGenre() {
  const navigate = useNavigate();
  const [movieGenre, setMovieGenre] = useState({
    movie_id: '',
    genre_id: '',
  });
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const { data } = await axios.get('http://flip3.engr.oregonstate.edu:35281/api/movies');
        setMovies(data);
      } catch (error) {
        console.error(error);
      }
    };

    const fetchGenres = async () => {
      try {
        const { data } = await axios.get('http://flip3.engr.oregonstate.edu:35281/api/genres');
        setGenres(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchMovies();
    fetchGenres();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await axios.post('http://flip3.engr.oregonstate.edu:35281/api/movie_genres', movieGenre);
      navigate('/movie_genres');
    } catch (error) {
      console.error(error);
      alert('Failed to add movie genre. Please try again.');
    }
  };

  return (
    <div>
      <h1>Add Movie Genre</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Movie:</label>
          <select onChange={(e) => setMovieGenre({ ...movieGenre, movie_id: e.target.value })}>
            <option value="">Select a movie</option>
            {movies.map((movie) => (
              <option key={movie.movie_id} value={movie.movie_id}>
                {movie.movie_title}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Genre:</label>
          <select onChange={(e) => setMovieGenre({ ...movieGenre, genre_id: e.target.value })}>
            <option value="">Select a genre</option>
            {genres.map((genre) => (
              <option key={genre.genre_id} value={genre.genre_id}>
                {genre.genre_title}
              </option>
            ))}
          </select>
        </div>
        <button type="submit">Add Movie Genre</button>
      </form>
    </div>
  );
}

export default AddMovieGenre;