import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
// General Citation that I used to adapt my code
// I read up on state hooks and other effect hooks on the react website.
// Source URL https://react.dev/learn/managing-state
// Citation for handleSubmit/handleEdit/handleDelete/handleAdd
// I used this to help develop my handleSubmit to work with my API backend.
// Source URL https://react-hook-form.com/docs/useform/handlesubmit

function EditDirectors() {
    // Hooks
    const location = useLocation();
    const navigate = useNavigate();
    // State
    const [director, setDirector] = useState(location.state)
    const [director_firstname, setDirector_firstname] = useState(director.director_firstname);
    const [director_lastname, setDirector_lastname] = useState(director.director_lastname);
    const [gender, setGender] = useState(director.gender)
  
  
  useEffect(() => {
    if (!location.state) {
      navigate('/directors')
    }
  }, [location.state, navigate]); 

  const handleEdit = async (event) => {
    event.preventDefault();
    const editDirector = {
        director_firstname: director_firstname,
        director_lastname: director_lastname,
        gender: gender

    };
    
    try {
      await axios.put(`http://flip3.engr.oregonstate.edu:35281/api/directors/${ director.director_id }`, editDirector)
      navigate('/directors')
    } catch (error) {
      console.error(error);
      alert('SQL failure')
      navigate('/directors')
    }
  };

  return (
    <div>
      <h1>Update Director</h1>
      <form onSubmit={handleEdit}>
        <div>
          <label>Director First Name:</label>
          <input
            type="text"
            defaultValue={director.director_first_name}
            onChange={(e) => setDirector_firstname(e.target.value)}
          />
        </div>
        <div>
          <label>Director Last Name:</label>
          <input
            type="text"
            defaultValue={director.director_last_name}
            onChange={(e) => setDirector_lastname(e.target.value)}
          />
        </div>
        <div>
          <label>Gender:</label>
          <input
            type="text"
            defaultValue={director.director_gender}
            onChange={(e) => setGender(e.target.value)}
          />
        </div>
        <button type="submit">Update</button>
      </form>
    </div>
  );
}


export default EditDirectors;