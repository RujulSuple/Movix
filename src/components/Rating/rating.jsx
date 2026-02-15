import React, { useState } from 'react'
import "./rating.scss";
import MovieTrailer from '../MovieTrailer/MovieTrailer';

export const Rating = ({ vote, year, youtubeTrailer }) => {
    //converting vote into rating
    let rating = parseInt((vote / 2));
    year = year.split("-")[0];

    return (
        <div className="year-rating">
            <MovieTrailer youtubeTrailer={youtubeTrailer} />
            <div className="year">
                <ul>
                    <li>{year}</li>
                </ul>
            </div>
            <div className="star-rating">
                {[...Array(5)].map((star, index) => {
                    index += 1;
                    return (
                        <button
                            type="button"
                            key={index} // 1, 2, 3, 4, 5
                        >
                            <span className={index <= rating ? "on" : "off"} >&#9733;</span>
                        </button>
                    );
                })}
                <text className='imdb'>IMDB</text>
            </div>
        </div>
    )
}
