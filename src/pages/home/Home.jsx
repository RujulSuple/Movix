import React from 'react'
import "./styles.scss";
import HeroBanner from './heroBanner/HeroBanner';
import Trending from './trending/Trending';
import Popular from './popular/popular';
import HTMLDisplay from '../../components/serverhtml/serverhtml';
const Home = () => {
    return (
        <div className='homePage'>
            <HeroBanner />
            <Trending />
            <Popular />
        </div>
    )
}


export default Home