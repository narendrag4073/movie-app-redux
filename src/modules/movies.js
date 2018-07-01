import { filter, find, each } from 'lodash';
export const FETCHMOVIE_REQUESTED = 'FETCHMOVIE_REQUESTED';
export const FETCHMOVIE_SUCCESS = 'FETCHMOVIE_SUCCESS';
export const SAVE_TO_WATCH = 'SAVE_TO_WATCH';
export const REMOVE_FROM_WATCH = 'REMOVE_FROM_WATCH';
export const APPLY_RATING = 'APPLY_RATING';

const initialState = {
  movie: {},
  watchedMovies: [],
  isFetching: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCHMOVIE_REQUESTED:
      return {
        ...state,
        isFetching: true
      };

    case FETCHMOVIE_SUCCESS:
      return {
        movie: checkIfWatched(state.watchedMovies, action.data),
        watchedMovies: state.watchedMovies,
        isFetching: false
      };
    case SAVE_TO_WATCH:
      return {
        movie: {...state.movie, isWatched:true },
        watchedMovies: [...state.watchedMovies, action.data],
        isFetching: false
      };
      case REMOVE_FROM_WATCH:
      return{
        movie: getMoviDetail(state.movie, action.data),
        watchedMovies: filterMovie(state.watchedMovies, action.data),
        isFetching: false
      };
      case APPLY_RATING:
      return{
        movie: state.movie,
        watchedMovies: applyStarRating(state.watchedMovies, action.data),
        isFetching: false
      };
    default:
      return state;
  }
};



export const fetchMovieFromApi = (text) => {
  return dispatch => {
    dispatch({
      type: FETCHMOVIE_REQUESTED
    });

    // Returns a promise
    return fetch(`http://www.omdbapi.com/?t=${text}&apikey=aabca0d`)
           .then(response => {
             if(response.ok){
               response.json().then(data => {
                if(data.Response !== 'False'){
                  dispatch({
                    type: FETCHMOVIE_SUCCESS,
                    data: data,
                });
                }
               })
             }
           })
  };
};
export const saveToWatched = (movie) => {
    movie.isWatched = true;
    return dispatch => {
      dispatch({
        type: SAVE_TO_WATCH,
        data: movie,
      });
    };
}
export const removeMovieFromWatch = (movie)=>{
  return dispatch => {
    dispatch({
      type: REMOVE_FROM_WATCH,
      data: movie,
    });
  };

}
export const handleRatingChanged = (rate, movie)=>{
  return dispatch => {
    dispatch({
      type: APPLY_RATING,
      data: {...movie, starRating: rate }
    });
  };
}
const filterMovie =(watchedMovies, movieToRemove)=>{
  return filter(watchedMovies, (item)=>{
    return item.Title !== movieToRemove.Title
  })
}
const checkIfWatched =(watchedmovies, movieFromApi)=>{
  let movie = find(watchedmovies, (item)=>{
    return item.Title === movieFromApi.Title;
  })
  if(movie){
    return movie;
  } else {
    return movieFromApi;
  }
}

const getMoviDetail =(movie, movieToRemove)=>{
  if(movie.Title === movieToRemove.Title){
    return { ...movie, isWatched: false };
  } else {
    return movie;
  }
}
const applyStarRating =  (watchedMovies, movie)=>{
  return each(watchedMovies, (item)=>{
    if(item.Title === movie.Title){
      item.starRating = movie.starRating;
    }
  })
}