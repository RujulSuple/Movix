import React from 'react'
import { useState } from 'react';
import "./style.scss";
import { FaPlay } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";
const MovieTrailer = ({ youtubeTrailer }) => {
    const [showTrailer, setShowTrailer] = useState(false);

    // Extract the YouTube video ID
    const getYoutubeVideoId = (url) => {
        try {
            const urlParams = new URL(url);
            return urlParams.searchParams.get("v");
        } catch (error) {
            // If the URL is invalid or cannot be parsed, return null
            console.error("Invalid YouTube URL:", url);
            return null;
        }
    };

    const videoId = getYoutubeVideoId(youtubeTrailer);
    const youtubeEmbedUrl = `https://www.youtube.com/embed/${videoId}`;


    return (
        <div className='movietrailer'>
            {/* Watch Trailer Button */}
            <button onClick={() => setShowTrailer(true)}>Watch <FaPlay /></button>

            {/* Video Modal/Container */}
            {showTrailer && (
                <div className="trailer-modal">
                    <div className="trailer-container">
                        {/* YouTube Embed */}
                        <iframe
                            width="560"
                            height="315"
                            src={youtubeEmbedUrl}
                            title="YouTube video player"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        ></iframe>

                        {/* Close Button */}
                        <button onClick={() => setShowTrailer(false)}><IoClose /></button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MovieTrailer