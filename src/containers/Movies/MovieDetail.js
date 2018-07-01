
import React from 'react';
import { push } from 'react-router-redux';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { saveToWatched } from '../../modules/movies';
import { each } from 'lodash';

const getOtherRating = (Ratings = [])=>{
  return Ratings.map((item)=>{
    if(item.Source === 'Rotten Tomatoes'){
      return (
        <span className="pl-0 col-md-2">
          <h4>{item.Value}</h4>
          <h6 className="col_grey">{item.Source}</h6>
        </span>
      )
    }
  })
}
const checkIfWatched =(movie)=>{
  if(movie.isWatched){
    return(
      <button className="btn btn-success col-md-1 pl-0">Watched</button>
    )
  }
}
const MovieDetail = ({ movie, saveToWatched }) => {
  if(movie.Title){
    return(
        <div className="col-xs-12 col-lg-12 p10 bb">
            <div className="col-md-2">
              <img 
                className="poster_img" 
                src={movie.Poster}
                onClick={(e)=>{
                  if(!movie.isWatched){
                    saveToWatched(movie);
                  } else {
                    alert('Movie already Watched');
                  }
                }} 
              />
            </div>  
            <div className="col-md-10">
              <h4>{movie.Title}</h4>
              <h5 className="col_grey">{movie.Released}</h5>
              <span className="pl-0 col-md-2">
                <h4>{movie.imdbRating}</h4>
                <h6 className="col_grey">Imdb Rating</h6>
              </span>
              {getOtherRating(movie.Ratings)}
              {checkIfWatched(movie)}
              <p className = "col-md-12 pl-0">Discription</p>
              <div className = "col-md-12 pl-0 col_grey">{movie.Plot}</div>
            </div>
        </div>
    )
  } else {
    return(
      <div className="text-center">To Find the MovieDetail Search from SearchBar</div>
    )
  }
}

const mapStateToProps = state => ({
  movie: state.movies.movie,
  isFetching: state.movies.isFetching,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ saveToWatched },dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(MovieDetail);