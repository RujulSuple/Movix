import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux';
import "./style.scss";
import ContentWrapper from '../../../components/ContentWrapper/ContentWrapper';
import SwitchTabs from '../../../components/switchtabs/SwitchTabs';
import { Carousel } from '../../../components/Carousel/carousel';
const Popular = () => {

    const home_data = useSelector((store) => store?.home?.home_data);
    const [data, setData] = useState(undefined);
    // console.log(data);

    // const onTabChange = (tab, index) => {
    //     const movie_data = tab == 'Day' ? url?.trending : url?.new_movie;
    //     setData(movie_data);
    // };

    useEffect(() => {
        if (home_data?.popular_shows) {
            setData(home_data?.popular_shows);
        }
    }, [home_data]);


    return (
        <div className="carouselSection">
            <ContentWrapper>
                <span className="carouselTitle">Popular Shows</span>
                {/* <SwitchTabs data={["Day", "Week"]} onTabChange={onTabChange} /> */}
            </ContentWrapper>
            <Carousel data={data} />
        </div>
    );
}

export default Popular;