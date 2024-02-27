import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
// General Citation that I used to adapt my code
// I read up on state hooks and other effect hooks on the react website.
// Source URL https://react.dev/learn/managing-state
// Citation for handleSubmit/handleEdit/handleDelete/handleAdd
// I used this to help develop my handleSubmit to work with my API backend.
// Source URL https://react-hook-form.com/docs/useform/handlesubmit

// Function to add a director it uses the navigate hook and creates a state and a function to update the state. This state has the properties contained within useState 
function AddDirector() {
    const navigate = useNavigate()
    const [director, setDirector] = useState({
        director_firstname: '',
        director_lastname: '',
        gender: ''
    });


  // Event handler that works with axios to add a director using the API backend link and components in director. 
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post('http://flip3.engr.oregonstate.edu:35281/api/directors', {
        director_firstname: director.director_firstname,
        director_lastname: director.director_lastname,
        gender: director.gender
      });
      navigate('/directors'); // Navigates back to director page
    } catch (error) {
      console.error(error);
      alert('Failed to add Director. Please try again.');
    }
  };

  return (
    <div>
    <h1>Add Director</h1>
    <form onSubmit={handleSubmit}> 
      <div>
        <label>Director First Name:</label>
        <input
          type="text"
          placeholder={'Enter First Name...'}
          onChange={(e) => setDirector({ ...director, director_firstname: e.target.value })}
        />
      </div>
      <div>
        <label>Director Last Name:</label>
        <input
          type="text"
          placeholder={'Enter Last Name...'}
          onChange={(e) => setDirector({ ...director, director_lastname: e.target.value })}
        />
      </div>
      <div>
        <label>Gender:</label>
        <input
          type="text"
          placeholder={'Enter Gender...'}
          onChange={(e) => setDirector({ ...director, gender: e.target.value })}
        />
      </div>
      <button type="submit">Update</button>
    </form>
  </div>
  );
}

export default AddDirector;