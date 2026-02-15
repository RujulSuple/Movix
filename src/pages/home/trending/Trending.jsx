import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux';
import "./style.scss";
import ContentWrapper from '../../../components/ContentWrapper/ContentWrapper';
import SwitchTabs from '../../../components/switchtabs/SwitchTabs';
import { Carousel } from '../../../components/Carousel/carousel';
import { fetchDataFromApi } from '../../../../util/api';

const Trending = () => {

    const home_data = useSelector((state) => state?.home?.home_data);
    const [data, setData] = useState(undefined);

    const onTabChange = async (tab, index) => {
        const movie_data = (tab == 'Day') ? (home_data?.trending) : (await fetchDataFromApi("/trending/all/week", "language=en-US").then(res => res.results));
        setData(movie_data);
    };

    useEffect(() => {
        if (home_data?.trending) {
            setData(home_data?.trending);
        }
    }, [home_data]);


    return (
        <div className="carouselSection">
            <ContentWrapper>
                <span className="carouselTitle">Trending Movies</span>
                <SwitchTabs data={["Day", "Week"]} onTabChange={onTabChange} />
            </ContentWrapper>
            <Carousel data={data} />
        </div>
    );
}

export default Trending