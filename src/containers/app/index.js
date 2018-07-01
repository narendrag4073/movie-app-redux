import React from 'react';
import { Route, Link } from 'react-router-dom';
import Header from '../header/header';
import MovieDetail from '../Movies/MovieDetail';
import WatchedMovies from '../Movies/WatchedMovies';
import { Navbar } from 'react-bootstrap';


const App = () => (
  <div>
  
 <Header />
  <div className="movie_detail">
    <div className="container">
        <div className="row">
            <MovieDetail />
            <WatchedMovies />
        </div>
      </div>
    </div>
  </div>
);

export default App;
