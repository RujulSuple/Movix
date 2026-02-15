import React, { useEffect } from 'react';
import { fetchDataFromApi } from "/util/api.js";
import { getAPIConfiguration, getHomeData } from "./store/homeSlice.js";
import { useSelector, useDispatch } from 'react-redux';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// importing all pages & components...
import Home from './pages/home/Home.jsx';
import Details from './pages/details/Details.jsx';
import Explore from './pages/explore/Explore.jsx';
import PageNotFound from './pages/404/pageNotFound.jsx';
import SearchResult from './pages/searchResult/SearchResult.jsx';
import Header from './components/header/Header.jsx';
import Footer from './components/footer/Footer.jsx';


function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    setTimeout(() => {
      scrollTo({
        behavior: 'smooth',
        top: 350
      });
    }, 1200);

    setTimeout(() => {
      scrollTo({
        behavior: 'smooth',
        top: 0
      });
    }, 2000);
    fetchHomeData();
  }, []);

  const fetchHomeData = async () => {    //This is for herobanner backdrops
    const config = await fetchDataFromApi("/configuration").then(res => { return (res) });
    await fetchDataFromApi("/trending/all/day", "language=en-US").then((res) => {
      const backdrops = res?.results?.map(movie => movie.backdrop_path);
      const new_movies = res?.results?.map(movie => movie);    //for trending section
      const trendings = res?.results?.filter(movie => movie?.media_type == "movie");     //for trending section
      const trending_shows = res?.results?.filter(movie => movie?.media_type == "tv"); //for popular section

      const home_data = {
        backdrop: backdrops,
        new_movie: new_movies,
        trending: trendings,
        popular_shows: trending_shows
      };

      dispatch(getHomeData(home_data));
      dispatch(getAPIConfiguration(config));
    });
    // await fetch("/api").then(res => res.json()).then(data => console.log(data)).catch(err => `Error connecting server: ${console.error(err)}`)
    // await fetch("/api/login").then(res => res.text()).then(data => console.log(data)).catch(err => `Error connecting server: ${console.error(err)}`)
  };

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={< Home />} ></Route>
        <Route path='/:mediaType/:id' element={<Details />}></Route>
        <Route path='/search/:query' element={<SearchResult />}></Route>
        <Route path='/explore/:mediaType' element={<Explore />}></Route>
        <Route path='*' element={<PageNotFound />}></Route>
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
