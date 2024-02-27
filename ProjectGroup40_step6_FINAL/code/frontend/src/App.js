import './App.css';
import Genres from "./components/genres/Genres"
import { Routes, Route } from "react-router-dom";
import HomePage from './components/HomePage';
import Movies from './components/movies/Movies';
import Directors from './components/directors/Directors';
import Studios from './components/studios/Studios'
import EditGenre from './components/genres/EditGenre';
import AddGenre from './components/genres/AddGenre';
import DeleteGenre from './components/genres/DeleteGenres';
import AddMovie from './components/movies/AddMovie';
import AddStudio from './components/studios/AddStudio';
import DeleteStudio from './components/studios/DeleteStudio';
import EditStudio from './components/studios/EditStudio';
import AddDirector from './components/directors/AddDirector';
import EditDirectors from './components/directors/EditDirector';
import DeleteDirector from './components/directors/DeleteDirector';
import EditMovie from './components/movies/EditMovie';
import MoviesAndGenres from './components/moviesAndGenres/MoviesAndGenres.js';
import DeleteMovieGenre from './components/moviesAndGenres/DeleteMovieGenre';
import AddMovieGenre from './components/moviesAndGenres/AddMovieGenre.js';
import DeleteMovie from './components/movies/DeleteMovie';


function App() {
    return (
    <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route path="/genres" element={<Genres />} />
        <Route path="/genres/edit" element={<EditGenre />} />
        <Route path="/genres/add" element={<AddGenre />} />
        <Route path="/genres/delete" element={<DeleteGenre />} />
        <Route path="/movies" element={<Movies/>} />
        <Route path="/movies/add" element={<AddMovie/>} /> 
        <Route path="/movies/edit" element={<EditMovie/>} /> 
        <Route path="/movies/delete" element={<DeleteMovie/>} />
        <Route path="/directors" element={<Directors/>} />
        <Route path="/directors/add" element={<AddDirector/>} />
        <Route path="/directors/edit" element={<EditDirectors/>} />
        <Route path="/directors/delete" element={<DeleteDirector/>} />
        <Route path="/studios" element={<Studios/>} />
        <Route path="/studios/add" element={<AddStudio/>} />
        <Route path="/studios/delete" element={<DeleteStudio/>} />
        <Route path="/studios/edit" element={<EditStudio/>} />
        <Route path="/movie_genres" element={<MoviesAndGenres/>} />
        <Route path="/movie_genres/delete" element={<DeleteMovieGenre/>} />
        <Route path="/movie_genres/add" element={<AddMovieGenre/>} />

    </Routes>    
      );  
  }
  


export default App;
