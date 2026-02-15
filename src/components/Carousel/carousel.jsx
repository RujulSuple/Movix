import React, { useRef } from 'react'
import dayjs from 'dayjs';
import "./style.scss";
import { useNavigate } from 'react-router-dom';
import {
    BsFillArrowLeftCircleFill,
    BsFillArrowRightCircleFill,
} from "react-icons/bs";
import ContentWrapper from '../ContentWrapper/ContentWrapper.jsx';
import PosterFallback from '../../assets/no-poster.png';
import Img from '../LazyLoadImage/Img.jsx';
import { Genres } from '../Genres/Genres.jsx';
import { useSelector } from 'react-redux';

export const Carousel = ({ data }) => {

    const carouselContainer = useRef();
    const navigate = useNavigate();
    const config = useSelector(state => state?.home?.config);

    const navigation = (dir) => {
        const container = carouselContainer.current;
        const scroll_amount = (dir === "right") ? (container.offsetWidth) : (-container.offsetWidth);
        //scroll container by specificed pixels
        container.scrollBy({
            behavior: "smooth",
            left: scroll_amount
        })
    };

    const handleClick = (item) => {
        navigate(`/${item?.media_type}/${item?.id}`);
    }

    const skeleton = () => {
        return (
            <div className="carouselItem">
                <div className="posterBlock skeleton"></div>
                <div className="textBlock">
                    <div className="title skeleton"></div>
                    <div className="date skeleton"></div>
                </div>
            </div>
        )
    };

    return (
        <div className='carousel'>
            <ContentWrapper>

                <BsFillArrowLeftCircleFill
                    className="carouselLeftNav arrow"
                    onClick={() => navigation("left")}
                />
                <BsFillArrowRightCircleFill
                    className="carouselRighttNav arrow"
                    onClick={() => navigation("right")}
                />

                {(data !== null | undefined) ? (
                    <div className="carouselItems" ref={carouselContainer}>
                        {data?.map((item) => {
                            const posterURL = item.poster_path ? item.poster_path : PosterFallback;
                            return (
                                <div className="carouselItem" key={item.id} onClick={() => { handleClick(item) }}>
                                    <div className="posterBlock">
                                        <Img src={posterURL ? `${config?.images?.base_url}${config?.images?.poster_sizes[1]}${posterURL}` : (PosterFallback)} />
                                        <Genres genres={item?.genres} />
                                    </div>
                                    <div className="textBlock">
                                        <span className="title">{(item?.original_title) || (item?.original_name)}</span>
                                        <span className='date'>{dayjs(item?.release_date).format("MMM DD, YYYY")}</span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                ) :
                    (<div className='carouselItems'>
                        {skeleton()}
                        {skeleton()}
                        {skeleton()}
                        {skeleton()}
                        {skeleton()}
                        {skeleton()}
                    </div>)
                }

            </ContentWrapper>
        </div>

    )
}
