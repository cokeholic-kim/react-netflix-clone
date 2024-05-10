import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import axios from './../../api/axios';
import './SearchPage.css'
import { useDebounce } from '../../Hooks/useDebounce';

const SearchPage = () => {
  const[searchResult,setSearchResult] = useState([]);
  const navigate = useNavigate();

  const useQuery = () => {
    return new URLSearchParams(useLocation().search)
   }
   
  const searchTerm = useQuery().get('q')
  const debounceSearchTerm = useDebounce(useQuery().get('q'),500);

  useEffect(()=>{
    if(debounceSearchTerm){
      fetchSearchMovie();
    }
  },[debounceSearchTerm])

  const renderSearchResults = () => {
    return searchResult.length > 0 ? (
      <section className='search-container'>
        {searchResult.map(movie => {
          if(movie.backdrop_path !== null && movie.media_type !== "person"){
            const movieImageUrl = `https://image.tmdb.org/t/p/w500${movie.backdrop_path}`
            return(
              <div className='movie' key={movie.id}>
                <div className='movie__column-poster' onClick={()=>navigate(`/${movie.id}`)}>
                  <img
                    src={movieImageUrl}
                    alt='movie image'
                    className='movie__poster'
                  />

                </div>
              </div>
            )
          }
          })}
      </section>
    )
    :
    <section className='no-results'>
      <div className='no-results__text'>
        <p> 찾고자 하는 검색어"{debounceSearchTerm}"에 맞는 영화가 없습니다. </p>
      </div>
    </section>
  }

  const fetchSearchMovie = async () => {
    try {
      const request = await axios.get(`/search/multi?include_audult=false&query=${debounceSearchTerm}`)
      setSearchResult(request.data.results);
    } catch (error) {
      console.log(error);
    }
  }

 

  return renderSearchResults();
}

export default SearchPage
