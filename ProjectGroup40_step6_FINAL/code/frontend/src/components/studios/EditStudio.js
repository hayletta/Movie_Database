import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
// General Citation that I used to adapt my code
// I read up on state hooks and other effect hooks on the react website.
// Source URL https://react.dev/learn/managing-state
// Citation for handleSubmit/handleEdit/handleDelete/handleAdd
// I used this to help develop my handleSubmit to work with my API backend.
// Source URL https://react-hook-form.com/docs/useform/handlesubmit

function EditStudio() {
    // Hooks
    const location = useLocation();
    const navigate = useNavigate();
    // State
    const [studio, setStudio] = useState(location.state)
    const [studio_name, setStudioName] = useState(studio.studio_name);
    const [founded_date, setFoundedDate] = useState(studio.founded_date)
  
  
// On component load
  useEffect(() => {
    if (!location.state) {
      navigate('/studios')
    }
  }, [location.state, navigate]); 

  const handleEdit = async (event) => {
    event.preventDefault();
    const editStudio = {
      studio_name: studio_name,
      founded_date: founded_date,
    }
    
    try {
      await axios.put(`http://flip3.engr.oregonstate.edu:35281/api/studios/${ studio.studio_id }`, editStudio)
      navigate('/studios')
    } catch (error) {
      console.error(error);
      alert('SQL failure')
      navigate('/studios')
    }
  };

  return (
    <div>
      <h1>Update Studio</h1>
      <form onSubmit={handleEdit}>
        <div>
          <label>Studio Name:</label>
          <input
            type="text"
            defaultValue={studio.studio_name}
            onChange={(e) => setStudioName(e.target.value)}
          />
        </div>
        <div>
          <label>Founded Date:</label>
          <input
            type="date"
            defaultValue={studio.founded_date}
            onChange={(e) => setFoundedDate(e.target.value)}
          />
        </div>
        <button type="submit">Update</button>
      </form>
    </div>
  );
}


export default EditStudio;