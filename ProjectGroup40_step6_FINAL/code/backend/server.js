const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 35281;
// Server object
const db = require("./db");
// Express middleware
app.use(cors({ credentials: true}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// The backend was modeled off of the SQL provided in class during weeks 3 - 4. 


/* ==============================================================
   ======================= GENRE API ENDPOINTS =========================
   ============================================================== */

// Helper functions that use SQL
// GET /api/genres - Get all genres
app.get('/api/genres', (req, res) => {
  // WRITE YOUR SQL QUERY HERE
    const selectQuery = `SELECT * FROM genres`;
  
    db.pool.query(selectQuery, (error, results) => {
      if (error) {
        console.error('Failed to execute select query:', error);
        res.status(500).json({ message: 'Internal server error' });
      } else {
        res.json(results);
      }
    });
  });
  

// GET /api/genres/:id - Get a specific genre by ID
app.get('/api/genres/:id', (req, res) => {
  const genreId = req.params.id;
  const selectQuery = `SELECT * FROM genres WHERE genre_id = ?`
  db.pool.query(selectQuery, [genreId,], (error, results) => {
    if (error) {
      console.error('Failed to execute select query:', error);
      res.status(500).json({ message: 'Internal server error' });
    } else {
      res.json(results);
    }
  });
});

// POST /api/genres - Create a new genre
app.post('/api/genres', (req, res) => {
  const { genre_title, genre_description } = req.body;


  // Create a new genre object with the provided name
  const createGenre = `INSERT INTO genres (genre_title, genre_description) VALUES(?, ?)`;
  const parameters = [genre_title, genre_description];
  db.pool.query(createGenre, parameters, (error, result) => {
    if (error) {
      console.error('Failed to create genre:', error);
      res.status(404).json({message: error})
    } else {
      const createdGenre = {
        genre_id:  result.insertID,
        genre_title: genre_title,
        genre_description: genre_description,
      };
      res.status(204).json({message: result})
    }})
});


// PUT /api/genres/:id - Update an existing genre using SQL
app.put('/api/genres/:id', (req, res) => {
  const genre_id = req.params.id;
  const { genre_title, genre_description } = req.body;

  const updateGenre = `UPDATE genres SET genre_title = ?, genre_description = ?
  WHERE genre_id = ?`;

  db.pool.query(updateGenre, [genre_title, genre_description, genre_id], (error, result) =>{
    if (error) {
      console.error('Failed to create genre:', error);
      res.status(404).json({message: error})
    } else {
      res.status(204).json({message: result})
    }})
});

// DELETE /api/genres/genre_id - Delete a genre by ID
app.delete('/api/genres/:id', (req, res) => {
  const genre_id = req.params.id;

  const deleteDirector = `DELETE FROM genres WHERE genre_id = ?`;
  db.pool.query(deleteDirector, [genre_id], (error, result) => {
    if (error) {
      console.error('Failed to delete director:', error);
      res.status(500).json({ message: 'Internal server error' });
    } else {
      res.status(200).json({ message: 'Director deleted successfully' });
    }
  });
});



/* ==============================================================
   ======================= MOVIES API ENDPOINTS =========================
   ============================================================== */

  
   app.get('/api/movies', (req, res) => {
    const selectQuery = `
      SELECT 
        movies.*,
        directors.director_firstname,
        directors.director_lastname,
        studios.studio_name
      FROM movies 
      LEFT JOIN directors ON movies.director_id = directors.director_id
      LEFT JOIN studios ON movies.studio_id = studios.studio_id
    `;
    
    db.pool.query(selectQuery, (error, results) => {
      if (error) {
        console.error('Failed to execute select query:', error);
        res.status(500).json({ message: 'Internal server error' });
      } else {
        res.json(results);
      }
    });
  });

  app.get('/api/directors', (req, res) => {
    const selectQuery = `SELECT * FROM directors`;
    db.pool.query(selectQuery, (error, results) => {
      if (error) {
        console.error('Failed to execute select query:', error);
        res.status(500).json({ message: 'Internal server error' });
      } else {
        res.json(results);
      }
    });
  });

  app.get('/api/studios', (req, res) => {
    const selectQuery = `SELECT * FROM studios`;
    db.pool.query(selectQuery, (error, results) => {
      if (error) {
        console.error('Failed to execute select query:', error);
        res.status(500).json({ message: 'Internal server error' });
      } else {
        res.json(results);
      }
    });
  });


app.post('/api/movies', (req, res) => {
  const { movie_title, director_id, studio_id, release_date } = req.body;

  const createMovie = `INSERT INTO movies (movie_title, director_id, studio_id, release_date) VALUES(?, ?, ?, ?)`;
  const parameters = [movie_title, director_id, studio_id, release_date];

  db.pool.query(createMovie, parameters, (error, result) => {
    if (error) {
      console.error('Failed to create movie:', error);
      res.status(500).json({ message: 'Internal server error' });
    } else {
      res.status(201).json({ message: 'Movie created successfully' });
    }
  });
});

app.put('/api/movies/:id', (req, res) => {
  const movie_id = req.params.id;
  const { title, studio_id, director_id, release_date } = req.body;

  const updateMovie = `UPDATE movies SET title = ?, _id = ?, director_id = ?, release_date = ? WHERE movie_id = ?`;
  const parameters = [title, studio_id, director_id, release_date, movie_id];

  db.pool.query(updateMovie, parameters, (error, result) => {
    if (error) {
      console.error('Failed to update movie:', error);
      res.status(500).json({ message: 'Internal server error' });
    } else {
      res.status(200).json({ message: 'Movie updated successfully' });
    }
  });
});

app.delete('/api/movies/:id', (req, res) => {
  const movie_id = req.params.id;

  const deleteMovie = `DELETE FROM movies WHERE movie_id = ?`;
  db.pool.query(deleteMovie, [movie_id], (error, result) => {
    if (error) {
      console.error('Failed to delete movie:', error);
      res.status(500).json({ message: 'Internal server error' });
    } else {
      res.status(200).json({ message: 'Movie deleted successfully' });
    }
  });
});
/* ==============================================================
   ======================= Directors API ENDPOINTS =========================
   ============================================================== */

// GET all genders from directors
app.get('/api/directors/genders', (req, res) => {
  const selectQuery = `SELECT gender FROM directors`;
  db.pool.query(selectQuery, (error, results) => {
    if (error) {
      console.error('Failed to execute select query:', error);
      res.status(500).json({ message: 'Internal server error' });
    } else {
      res.json(results);
    }
  });
});

// GET all directors
app.get('/api/directors', (req, res) => {
  const selectQuery = `SELECT * FROM directors`;
  db.pool.query(selectQuery, (error, results) => {
    if (error) {
      console.error('Failed to execute select query:', error);
      res.status(500).json({ message: 'Internal server error' });
    } else {
      res.json(results);
    }
  });
});

// POST /api/directors - Create a new director
app.post('/api/directors', (req, res) => {
  const { director_firstname, director_lastname, gender, } = req.body;

  const createDirector = `INSERT INTO directors (director_firstname, director_lastname, gender, movies_directed) VALUES (?, ?, ?, 0)`;
  const parameters = [director_firstname, director_lastname, gender];

  db.pool.query(createDirector, parameters, (error, result) => {
    if (error) {
      console.error('Failed to create director:', error);
      res.status(500).json({ message: 'Internal server error' });
    } else {
      res.status(201).json({ message: 'Director created successfully' });
    }
  });
});

// PUT /api/directors/:id - Update an existing director
app.put('/api/directors/:id', (req, res) => {
  const director_id = req.params.id;
  const { director_firstname, director_lastname, gender } = req.body;

  const updateDirector = `UPDATE directors SET director_firstname = ?, director_lastname = ?, gender = ? WHERE director_id = ?`;
  const parameters = [director_firstname, director_lastname, gender, director_id];

  db.pool.query(updateDirector, parameters, (error, result) => {
    if (error) {
      console.error('Failed to update director:', error);
      res.status(500).json({ message: 'Internal server error' });
    } else {
      res.status(200).json({ message: 'Director updated successfully' });
    }
  });
});

// DELETE /api/directors/:id - Delete a director by ID
app.delete('/api/directors/:id', (req, res) => {
  const director_id = req.params.id;

  const deleteDirector = `DELETE FROM directors WHERE director_id = ?`;
  db.pool.query(deleteDirector, [director_id], (error, result) => {
    if (error) {
      console.error('Failed to delete director:', error);
      res.status(500).json({ message: 'Internal server error' });
    } else {
      res.status(200).json({ message: 'Director deleted successfully' });
    }
  });
});

/* ==============================================================
   ======================= STUDIO API ENDPOINTS =========================
   ============================================================== */

// GET /api/studios - Get all studios
app.get('/api/studios', (req, res) => {
  const selectQuery = `SELECT * FROM studios`;
  db.pool.query(selectQuery, (error, results) => {
    if (error) {
      console.error('Failed to execute select query:', error);
      res.status(500).json({ message: 'Internal server error' });
    } else {
      res.json(results);
    }
  });
});

// GET /api/studios/:id - Get a specific studio by ID
app.get('/api/studios/:id', (req, res) => {
  const studioId = req.params.id;
  const selectQuery = `SELECT * FROM studios WHERE studio_id = ?`
  db.pool.query(selectQuery, [studioId,], (error, results) => {
    if (error) {
      console.error('Failed to execute select query:', error);
      res.status(500).json({ message: 'Internal server error' });
    } else {
      res.json(results);
    }
  });
});

// POST /api/studios - Create a new studio
app.post('/api/studios', (req, res) => {
  const { studio_name, founded_date } = req.body;
  const createStudio = `INSERT INTO studios (studio_name, founded_date) VALUES(?, ?)`;
  const parameters = [studio_name, founded_date];
  db.pool.query(createStudio, parameters, (error, result) => {
    if (error) {
      console.error('Failed to create studio:', error);
      res.status(404).json({message: error})
    } else {
      const createdStudio = {
        studio_id:  result.insertID,
        studio_name: studio_name,
        founded_date: founded_date,
      };
      res.status(201).json(createdStudio);
    }})
});

// PUT /api/studios/:id - Update an existing studio
app.put('/api/studios/:id', (req, res) => {
  const studio_id = req.params.id;
  const { studio_name, founded_date } = req.body;
  const updateStudio = `UPDATE studios SET studio_name = ?, founded_date = ?
  WHERE studio_id = ?`;
  db.pool.query(updateStudio, [studio_name, founded_date, studio_id], (error, result) => {
    if (error) {
      console.error('Failed to update studio:', error);
      res.status(404).json({message: error})
    } else {
      res.status(204).json({message: 'Studio updated successfully.'})
    }})
});

// DELETE /api/studios/:id - Delete a studio by ID
app.delete('/api/studios/:id', (req, res) => {
  const studio_id = req.params.id;
  const deleteStudio = `DELETE FROM studios WHERE studio_id = ?`;
  db.pool.query(deleteStudio, [studio_id], (error, result) => {
    if (error) {
      console.error('Failed to execute delete query:', error);
      res.status(404).json({message: error})
    } else {
      res.status(204).json({message: 'Studio deleted successfully.'})
    }})
});

/* ==============================================================
   ======================= movie_genres API endpoints =========================
   ============================================================== */

   app.get('/api/movie_genres', (req, res) => {
    const selectQuery = `
      SELECT 
        movie_genres.movie_id,
        movie_genres.genre_id,
        movies.movie_title,
        genres.genre_title
      FROM movie_genres
      INNER JOIN movies ON movie_genres.movie_id = movies.movie_id
      INNER JOIN genres ON movie_genres.genre_id = genres.genre_id
    `;
  
    db.pool.query(selectQuery, (error, results) => {
      if (error) {
        console.error('Failed to execute select query:', error);
        res.status(500).json({ message: 'Internal server error' });
      } else {
        res.json(results);
      }
    });
  });

  app.get('/api/movies', (req, res) => {
    const selectQuery = `SELECT * FROM movies`;
    db.pool.query(selectQuery, (error, results) => {
      if (error) {
        console.error('Failed to execute select query:', error);
        res.status(500).json({ message: 'Internal server error' });
      } else {
        res.json(results);
      }
    });
  });

  app.get('/api/genres', (req, res) => {
    const selectQuery = `SELECT * FROM genres`;
    db.pool.query(selectQuery, (error, results) => {
      if (error) {
        console.error('Failed to execute select query:', error);
        res.status(500).json({ message: 'Internal server error' });
      } else {
        res.json(results);
      }
    });
  });

  app.get('/api/movie_genres/:movie_id', (req, res) => {
    const movieId = req.params.movie_id;
    const selectQuery = `SELECT * FROM movie_genres WHERE movie_id = ?`;
  
    db.pool.query(selectQuery, [movieId], (error, results) => {
      if (error) {
        console.error('Failed to execute select query:', error);
        res.status(500).json({ message: 'Internal server error' });
      } else {
        res.json(results);
      }
    });
  });

  app.get('/api/genres/:genre_id/movies', (req, res) => {
    const genreId = req.params.genre_id;
    const selectQuery = `SELECT * FROM movie_genres WHERE genre_id = ?`;
  
    db.pool.query(selectQuery, [genreId], (error, results) => {
      if (error) {
        console.error('Failed to execute select query:', error);
        res.status(500).json({ message: 'Internal server error' });
      } else {
        res.json(results);
      }
    });
  });



   app.post('/api/movie_genres', (req, res) => {
    const { movie_id, genre_id } = req.body;
  
    const createMovieGenre = `INSERT INTO movie_genres (movie_id, genre_id) VALUES (?, ?)`;
    const parameters = [movie_id, genre_id];
  
    db.pool.query(createMovieGenre, parameters, (error, result) => {
      if (error) {
        console.error('Failed to associate movie with genre:', error);
        res.status(500).json({ message: 'Internal server error' });
      } else {
        res.status(201).json({ message: 'Movie associated with genre successfully' });
      }
    });
  });

  app.delete('/api/movie_genres/:movie_id/:genre_id', (req, res) => {
    const movieId = req.params.movie_id;
    const genreId = req.params.genre_id;
  
    const deleteMovieGenre = `DELETE FROM movie_genres WHERE movie_id = ? AND genre_id = ?`;
    db.pool.query(deleteMovieGenre, [movieId, genreId], (error, result) => {
      if (error) {
        console.error('Failed to delete movie-genre association:', error);
        res.status(500).json({ message: 'Internal server error' });
      } else {
        res.status(200).json({ message: 'Movie-genre association deleted successfully' });
      }
    });
  });


// Start the server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
