import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
// General Citation that I used to adapt my code
// I read up on state hooks and other effect hooks on the react website.
// Source URL https://react.dev/learn/managing-state
// Citation for handleSubmit/handleEdit/handleDelete/handleAdd
// I used this to help develop my handleSubmit to work with my API backend.
// Source URL https://react-hook-form.com/docs/useform/handlesubmit



function AddStudio() {
    const navigate = useNavigate()
    const [studio, setStudio] = useState({
        studio_name: '',
        founded_date: ''
    });

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await axios.post('http://flip3.engr.oregonstate.edu:35281/api/studios', {
        studio_name: studio.studio_name,
        founded_date: studio.founded_date
      });
      navigate('/studios');
    } catch (error) {
      console.error(error);
      alert('Failed to add studio. Please try again.');
    }
  };

  return (
    <div>
    <h1>Add Studio</h1>
    <form onSubmit={handleSubmit}>
      <div>
        <label>Studio Name:</label>
        <input
          type="text"
          placeholder={'Enter Studio Name...'}
          onChange={(e) => setStudio({ ...studio, studio_name: e.target.value })}
        />
      </div>
      <div>
        <label>Founded Date:</label>
        <input
          type="date"
          placeholder={'MM/DD/YYYY'}
          onChange={(e) => setStudio({ ...studio, founded_date: e.target.value })}
        />
      </div>
      <button type="submit">Update</button>
    </form>
  </div>
  );
}

export default AddStudio;