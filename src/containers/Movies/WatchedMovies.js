



import React, { Component } from 'react';
import { push } from 'react-router-redux';
import { bindActionCreators } from 'redux';
import ReactStars from 'react-stars';
import { connect } from 'react-redux';
import { removeMovieFromWatch, handleRatingChanged } from '../../modules/movies';

class WatchedMovies extends Component {
  constructor(props){
    super(props);
    this.state = {
      viewAll: false
    }
  }
  render(){

  let someMovies = this.state.viewAll ? this.props.watchedMovies : this.props.watchedMovies.slice(0,6);
  if(this.props.watchedMovies.length<1){
    return(
      <div className="col-xs-12 col-lg-12 p5 text-center">
        No Movie In Watched Collection
      </div>
    )
  }
  return (
  <div className="col-xs-12 col-lg-12 p5">
    <div className="col-md-12">
      <span className="pull-left" style={{paddingTop:"10px", fontSize:"20px"}}>WatchedMovies</span>
      <span 
        className="pull-right" 
        style={{paddingTop:"10px", fontSize:"14px", color: 'green', fontWeight:"bold"}}
        onClick={()=> this.setState({viewAll: !this.state.viewAll})}
        > view all</span>
    </div>
    {someMovies.map((movie, i)=>{
      return (
        <div className="col-md-2 pt10">
          <button 
            className="btn btn-danger remove_button"
            onClick={(e)=>this.props.removeMovieFromWatch(movie)}
          ><i className="glyphicon glyphicon-remove"></i> </button>
          <img className="watch_poster_img" src={movie.Poster} />
            <ReactStars
              count={5}
              onChange={(val)=>this.props.handleRatingChanged(val, movie)}
              size={24}
              value={movie.starRating}
              color2={'#ffd700'} 
          />
        </div>
      )
    })}
  </div>
)
  }
}

const mapStateToProps = state => ({
    watchedMovies: state.movies.watchedMovies,
    isFetching: state.movies.isFetching,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ removeMovieFromWatch, handleRatingChanged },dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(WatchedMovies);