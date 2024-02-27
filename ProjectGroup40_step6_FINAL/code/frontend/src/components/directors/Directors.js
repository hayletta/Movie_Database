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
// I adapted this resource to help with my async fetchDirectors and all other fetch functions.
// Source URL: https://dmitripavlutin.com/javascript-fetch-async-await/

function Directors() {
  const navigate = useNavigate()
  const [directors, setDirectors] = useState([]);

  // Works with the API backend to display all directors that are stored
  async function fetchDirectors() {
    try {
      const response = await axios.get(`http://flip3.engr.oregonstate.edu:35281/api/directors`);
      const data = response.data;
      setDirectors(data);
    } catch (error) {
      console.error(error);
    }
  }

  // Allows this page to go to edit and edit a director
  function handleEdit(director) {
    navigate("/directors/edit", { state: director });
  }

  // Allows this page to go to delete and delete a director
  function handleDelete(director) {
    navigate("/directors/delete", { state: director });
  }

  useEffect(() => {
    fetchDirectors();
  }, []);

  return (
    <div>
      <h1>Directors</h1>
      <table>
        <thead>
          <tr>
            <th>Director ID</th>
            <th>Director First Name</th>
            <th>Director Last Name</th>
            <th>Gender</th>
            <th>Movies Directed</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {directors.map((director) => (
            <tr key={director.director_id}>
              <td>{director.director_id}</td>
              <td>{director.director_firstname}</td>
              <td>{director.director_lastname}</td>
              <td>{director.gender}</td>
              <td>{director.movies_directed}</td>
              <td>
                <button onClick={() => handleEdit(director)}>Edit</button>
              </td>
              <td>
                <button onClick={() => handleDelete(director)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={() => navigate('/directors/add')}>Add Director</button>
      <button onClick={() => navigate('/')}>Return to Home</button>
    </div>
  );
}

export default Directors;