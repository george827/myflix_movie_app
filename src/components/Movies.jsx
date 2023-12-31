import { React, useContext, useEffect, useState } from 'react'
import "../style/movies.css"
import axios from 'axios'
import { AiFillPlayCircle, AiOutlineClose } from "react-icons/ai";
import { Container } from './NavBar';
import TrailerMovies from '../Trailers/TrailerMovies';

// "https://api.themoviedb.org/3/movie/550?api_key=0a2b0b0c0d0e0f0a0b0c0d0e0f0a2b0b"
// https://static.vecteezy.com/system/resources/thumbnails/004/141/669/small/no-photo-or-blank-image-icon-loading-images-or-missing-image-mark-image-not-available-or-image-coming-soon-sign-simple-nature-silhouette-in-frame-isolated-illustration-vector.jpg

function Movies() {
  const [movieData, setMovieData] = useState([])
  const { toggle, InputValue } = useContext(Container)
  const input = InputValue
  const shown = input ? "search" : "discover"
  const Api = `https://api.themoviedb.org/3/${shown}/movie`
  const img = "https://image.tmdb.org/t/p/w500/"
  const noImg = "https://www.publicdomainpictures.net/pictures/280000/velka/not-found-image-15383864787lu.jpg"
  const [trailer, setTrailer] = useState(true)
  const [movieTitle, setMovieTitle] = useState('')

  const MovieCall = async () => {
    const data = await axios.get(Api, {
      params: {
        api_key: "09543633934773fe0f7b19a738612ce3",
        query: input,
      }
    })
    const res = data.data.results
    setMovieData(res)
  }
  useEffect(() => {
    setTimeout(() => {
    MovieCall()
    }, 100)
  }, [input])

  // console.log(movieData)
  const MoviesTitle = (movie) => {
    setMovieTitle(movie.title)
    setTrailer(!trailer)
  }

  return (
    <>
      <div className={toggle ? "mainBgColor" : "secondaryBgColor"} id="main-container">
        <div className="movies-container">
          {movieData.map((movie) => {
            return (
              <>
                <div id={trailer ? "container" : "NoContainer"}>
                  < AiFillPlayCircle id={trailer ? "playIcon" : "hide"} color='#fff' fontSize={40}
                    onClick={() => MoviesTitle(movie)}
                  />
                  <img src={movie.poster_path ? `${img}${movie.poster_path}` : noImg} alt=""
                    onClick={() => MoviesTitle(movie)}
                  />
                  <h3
                    id={movie.title.lenght > 28 ? "smaller-Text" : ""}
                    className={toggle ? "DarkTheme" : "LightThemeClose"}
                  >
                    {movie.title}</h3>
                </div>
              </>
            )
          })}
          {trailer ? "": <TrailerMovies moviesTitle={movieTitle}/>}
          <AiOutlineClose
            id={trailer ? "Nothing" : "Exit1"}
            className={toggle ? "DarkTheme" : "LightThemeClose"}
            onClick={() => setTrailer(true)}
            fontSize={55}
            color='#fff'
            cursor={"pointer"}
          />
        </div>
      </div>
    </>
  )
}

export default Movies;
