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

function Genres() {
  const navigate = useNavigate()
  const [genres, setGenres] = useState([]);

  async function fetchGenres() {
    try {
      const response = await axios.get('http://flip3.engr.oregonstate.edu:35281/api/genres');
      const data = response.data
      setGenres(data)
    } catch (error) {
      console.error(error);
    }
  }

  function handleEdit(genre) {
    navigate("/genres/edit", {state: genre});
  }

  function handleDelete(genre) {
    navigate("/genres/delete", {state: genre});
  }
  
  useEffect(() => {
    fetchGenres();
  }, []);
  
  return (
    <div>
      <h1>Genres</h1>
      <table>
        <thead>
          <tr>
            <th>Genre ID</th>
            <th>Genre Title</th>
            <th>Genre Description</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {genres.map((genre) => (
            <tr key={genre.genre_id}>
              <td>{genre.genre_id}</td>
              <td>{genre.genre_title}</td>
              <td>{genre.genre_description}</td>
              <td>
                <button onClick={()=> handleEdit(genre)}>Edit</button>
              </td>
              <td>
                <button onClick={()=> handleDelete(genre)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={()=>navigate('/genres/add')}>Add Genre</button>
      <button onClick={() => navigate('/')}>Return to Home</button>
    </div>
  );
}

export default Genres;