



import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { fetchMovieFromApi } from '../../modules/movies';

const Header = props => (
  <div>
    <div class="topnav">
        <a class="active" >Movies</a>
        <div class="search-container">
            <form >
                <i className="glyphicon glyphicon-search search_icon_position" ></i>
                <input 
                    type="text" 
                    className="form-control"
                    placeholder="Search...."
                    onChange={(e)=> props.fetchMovieFromApi(e.target.value)} 
                    name="search" 
                />
            </form>
        </div>
    </div>
  </div>
);

const mapStateToProps = state => ({
  movies: state.movies,
  isFetching: state.movies.isFetching,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
        fetchMovieFromApi
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Header);



 