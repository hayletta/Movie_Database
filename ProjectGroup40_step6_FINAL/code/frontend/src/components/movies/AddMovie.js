import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
// General Citation that I used to adapt my code
// I read up on state hooks and other effect hooks on the react website.
// Source URL https://react.dev/learn/managing-state
// Citation for handleSubmit/handleEdit/handleDelete/handleAdd
// I used this to help develop my handleSubmit to work with my API backend.
// Source URL https://react-hook-form.com/docs/useform/handlesubmit

function AddMovie() {
    const navigate = useNavigate();
    const [movie, setMovie] = useState({
        movie_title: '',
        studio_id: '',
        director_id: '',
        release_date: ''
    });
    const [directors, setDirectors] = useState([]);
    const [studios, setStudios] = useState([]);

    useEffect(() => {
      const fetchDirectorsAndStudios = async () => {
        try {
            const { data: directorsData } = await axios.get('http://flip3.engr.oregonstate.edu:35281/api/directors');
            setDirectors(directorsData);

            const { data: studiosData } = await axios.get('http://flip3.engr.oregonstate.edu:35281/api/studios');
            setStudios(studiosData);
        } catch (error) {
            console.error(error);
        }
      };

      fetchDirectorsAndStudios();
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            await axios.post('http://flip3.engr.oregonstate.edu:35281/api/movies', movie);
            navigate('/movies');
        } catch (error) {
            console.error(error);
            alert('Failed to add movie. Please try again.');
        }
    };

    return (
        <div>
            <h1>Add Movie</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Movie Title:</label>
                    <input
                        type="text"
                        placeholder="Enter movie title"
                        onChange={(e) => setMovie({ ...movie, movie_title: e.target.value })}
                    />
                </div>
                <div>
                    <label>Studio:</label>
                    <select onChange={(e) => setMovie({ ...movie, studio_id: e.target.value })}>
                        <option value="">Select a studio</option>
                        {studios && studios.map((studio) => (
                            <option key={studio.studio_id} value={studio.studio_id}>
                                {studio.studio_name}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label>Director:</label>
                    <select onChange={(e) => setMovie({ ...movie, director_id: e.target.value })}>
                        <option value="">Select a director</option>
                        {directors && directors.map((director) => (
                            <option key={director.director_id} value={director.director_id}>
                                {director.director_firstname} {director.director_lastname}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label>Release Date:</label>
                    <input
                        type="date"
                        onChange={(e) => setMovie({ ...movie, release_date: e.target.value })}
                    />
                </div>
                <button type="submit">Add Movie</button>
            </form>
        </div>
    );
}

export default AddMovie;