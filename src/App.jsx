import { useState, useEffect } from 'react'

import './App.css'

function App() {
 const [movies, setMovies] = useState()

 const BASEURL = 'http://localhost:8000/api/v1/'
 const YOUTUBE = 'https://www.youtube.com/embed/'


 async function fetchMovies(){
    const response = await fetch(`${BASEURL}all-movies/`)
    const data= await response.json()
    console.log(data);
    setMovies(data)
    
 }

 useEffect(() => {
  fetchMovies();
 }, []);

  return (
    <>
     {movies && movies.map((x)=>{
      return (
        <div style={{display: 'inline-block', padding: '10px'}} key={x.id}>

          <img src={x.image} alt="" />
          <h1>{x.title}</h1>
          <p>{x.description}</p>

          <iframe width="560" height="315"
  src={`${YOUTUBE}${x.video}`}
  frameBorder="0"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
  allowFullScreen>
</iframe>

        </div>

      )
     })}
    </>
  )
}

export default App
