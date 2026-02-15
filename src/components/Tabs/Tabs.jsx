import React, { useState, useRef, useEffect } from 'react'
import "./Tabs.scss";
import { Carousel } from '../Carousel/carousel';
import Cast from '../Cast/Cast';
import Seasons from '../Seasons/Seasons';
import useFetch from '../../hooks/useFetch';
const tabs = ["YOU MIGHT LIKE", "CAST", "DETAILS"];

const Tabs = ({ Data = {} }) => {
    const [activeTab, setActiveTab] = useState(1);
    const tabRefs = useRef([]); //Reference for the activeTab....
    let recommendation;
    let movie_data = Data?.release_date; //Checking the data is movie or show
    if (movie_data !== undefined) {
        const { data } = useFetch(`/movie/${Data?.id}/recommendations?language=en-US&page=1`);
        recommendation = data?.results
    }

    const handleClick = (index) => {
        setActiveTab(index);
        scrollTo({
            behavior: 'smooth',
            top: 320
        });
    }

    useEffect(() => {
        let activeTabElement = tabRefs.current[activeTab];
        if (activeTabElement) {
            const tabWidth = activeTabElement.offsetWidth;
            const tabLeft = activeTabElement.offsetLeft;

            // Setting the width and left properties dynamically
            const beforeElement = document.querySelector('.underline');
            if (beforeElement) {
                beforeElement.style.width = `${tabWidth}px`;
                beforeElement.style.left = `${tabLeft}px`;
            }
        }
    }, [activeTab]);

    return (
        <div className="tabs-container">
            <div className="tabs">
                {tabs.map((tab, index) => {
                    index += 1;
                    return (
                        <div className={`tab ${activeTab == index ? "activeTab" : ""}`} key={index} onClick={() => { handleClick(index) }} ref={(elm) => { tabRefs.current[index] = elm }}>
                            {(tab)}
                        </div>
                    )
                })}
                <span className="underline"></span>
            </div>
            <div className="tab-body">
                <div className={`tab-content ${activeTab == 1 ? "activeTab" : ""}`}>
                    {movie_data ? (<Carousel data={recommendation} />) : (<Seasons seasons_data={Data?.seasons} />)}
                </div>
                <div className={`tab-content ${activeTab == 2 ? "activeTab" : ""}`}>
                    <Cast cast={["Tom Cruise", "Leonardo DiCaprio", "Robert De Niro", "Chris Hemsworth", "Brad Pitt"]} />
                </div>
                <div className={`tab-content ${activeTab == 3 ? "activeTab" : ""}`}>Content for tab 3</div>
            </div>
        </div>
    )
}

export default Tabs