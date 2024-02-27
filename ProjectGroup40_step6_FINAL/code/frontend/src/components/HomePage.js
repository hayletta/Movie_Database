import React from 'react';
import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <div>
      <h1>Welcome to the Movie Database</h1>
      <nav>
        <ul>
          <li>
            <Link to="/genres">Genres</Link>
          </li>
          <li>
            <Link to="/movies">Movies</Link>
          </li>
          <li>
            <Link to="/directors">Directors</Link>
          </li>
          <li>
            <Link to="/studios">Studios</Link>
          </li>
          <li>
            <Link to="/movie_genres">Movies and Genres</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default HomePage;