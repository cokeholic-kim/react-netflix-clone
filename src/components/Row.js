import React, { useEffect, useState } from 'react'
import axios from '../api/axios';
import './Row.css';
import MovieModal from './MovieModal';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import { A11y, Navigation, Pagination, Scrollbar } from 'swiper/modules';

const Row = ({title,id,fetchURL,isLargeRow}) => {

    const [movies, setMovies] = useState([]);
    const [modalOpen,setModalOpen] = useState(false);
    const [movieSelected,setMovieSelected] = useState({});

    useEffect(() => {
        fetchMovieData();
    },[]);

    const fetchMovieData = async () => {
        const request = await axios.get(fetchURL);
        
        setMovies(request.data.results);
    }

    const handleClick = (movie) => {
        console.log(movie);
        setModalOpen(true);
        setMovieSelected(movie);
    }
  
    return (
    <section>
        <h2 className='row'>{title}</h2>
            <Swiper
                id={id} 
                modules={[Navigation, Pagination, Scrollbar, A11y]}
                pagination={{clickable: true}}
                loop={true}
                breakpoints={{
                    1378: {
                        slidesPerView:6,
                        slidesPerGroup:6,
                    },
                    998: {
                        slidesPerView:5,
                        slidesPerGroup:5,
                    },
                    625: {
                        slidesPerView:4,
                        slidesPerGroup:4,
                    },
                    0: {
                        slidesPerView:3,
                        slidesPerGroup:3,
                    },
                }}
                onSlideChange={() => console.log('slide change')}
                onSwiper={(swiper) => console.log(swiper)}
            >
                <div id={id} className="row__posters">
                    {movies.map(movie => (
                        <SwiperSlide key={movie.id}>
                            <img
                                className={`row__poster ${isLargeRow && 'row__posterLarge'}`}
                                src={`https://image.tmdb.org/t/p/original/${isLargeRow ? movie.poster_path: movie.backdrop_path}`}
                                alt={movie.name}
                                onClick={()=>handleClick(movie)}
                            />
                        </SwiperSlide>
                    ))}
                    </div>
            </Swiper>


        {
            modalOpen && (
                <MovieModal {...movieSelected} setModalOpen={setModalOpen}></MovieModal>
            )
        }
    </section>
  )
}

export default Row
