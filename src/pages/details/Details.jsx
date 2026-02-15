import React, { useEffect } from 'react'
import "./style.scss";
import { useParams } from 'react-router-dom';
import Img from '../../components/LazyLoadImage/Img';
import useFetch from '../../hooks/useFetch';
import { Genres } from '../../components/Genres/Genres';
import { Rating } from "../../components/Rating/rating";
import Description from '../../components/Description/Description';
import Tabs from '../../components/Tabs/Tabs';

const Details = () => {
    const { mediaType, id } = useParams();
    const { data } = useFetch(`/${mediaType}/${id}`);
    console.log(data);

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
        }, 1500);
    }, [])

    return (
        <div className="details-main">
            {data ? (
                <>
                    <div className="details-Banner">
                        <div className="details-backdrop">
                            <Img src={(data?.backdrop_path) || (data?.backdrop_path)} className={"details-backdrop"} />
                        </div>
                        <div className="details-poster">
                            <Img src={(data?.poster_path) || (data?.poster_path)} className={"details-poster"} />
                        </div>

                        <div className="movie-details">
                            <div className="movie-title oswald">{(data?.original_title) || (data?.original_title)}</div>
                            {/* <Genres genres={(data?.genres)} /> */}
                            <Rating vote={(data?.vote_average)} year={(data?.release_date) || (data?.first_air_date)} youtubeTrailer={data?.youtube_trailer} />
                            <Description description={(data?.overview) || (data?.show?.overview)} />
                        </div>
                    </div>
                    <div className="opacity-layer"></div>
                    <Tabs Data={data} />
                </>
            ) : (
                <div className="details-Banner">
                    <div className="details-backdrop skeleton"></div>
                    <div className="movie-details skeleton"></div>
                </div>
            )}
        </div>
    )
};

export default Details