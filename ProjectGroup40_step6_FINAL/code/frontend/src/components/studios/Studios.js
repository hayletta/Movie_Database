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

function Studios() {
  const navigate = useNavigate()
  const [studios, setStudios] = useState([]);

  async function fetchStudios() {
    try {
      const response = await axios.get('http://flip3.engr.oregonstate.edu:35281/api/studios');
      const data = response.data
      setStudios(data)
    } catch (error) {
      console.error(error);
    }
  }

  function handleEdit(studio) {
    navigate("/studios/edit", {state: studio});
  }

  function handleDelete(studio) {
    navigate("/studios/delete", {state: studio });
  }
  
  useEffect(() => {
    fetchStudios();
  }, []);
  
  return (
    <div>
      <h1>Studios</h1>
      <table>
        <thead>
          <tr>
            <th>Studio ID</th>
            <th>Studio Name</th>
            <th>Founded Date</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {studios.map((studio) => (
            <tr key={studio.studio_id}>
              <td>{studio.studio_id}</td>
              <td>{studio.studio_name}</td>
              <td>{new Date(studio.founded_date).toLocaleDateString()}</td>
              <td>
                <button onClick={()=> handleEdit(studio)}>Edit</button>
              </td>
              <td>
                <button onClick={()=> handleDelete(studio)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={()=>navigate('/studios/add')}>Add Studio</button>
      <button onClick={() => navigate('/')}>Return to Home</button>
    </div>
  );
}

export default Studios;