import React, { useState, useEffect } from 'react';
import "./style.scss";
import { MdKeyboardArrowRight } from "react-icons/md";
import useFetch from '../../hooks/useFetch';

const Seasons = ({ seasons_data }) => {
    const [activeSeason, setActiveSeason] = useState(null);
    const [seasonId, setSeasonId] = useState(null);
    const [episodes, setEpisodes] = useState([]);
    const shouldFetch = !!activeSeason;

    // custom useFetch hook (called at top level)
    const { data } = useFetch(
        shouldFetch ? `/tv/${seasonId}/season/1?language=en-US` : null
    );

    // Whenever new data comes in, update episodes
    useEffect(() => {
        if (data?.episodes) {
            setEpisodes(data.episodes);
        }
    }, [data]);

    const handleToggle = (season) => {
        if (activeSeason === season?.season_number) {
            setActiveSeason(null);
            setSeasonId(null);
            setEpisodes([]);
        } else {
            setActiveSeason(season?.season_number);
            setSeasonId(season?.id);
        }
    };

    return (
        <div className='seasons-container'>
            <ul className="seasons_list">
                {seasons_data?.map((season) => (
                    <div className="season" key={season.season_number}>
                        <MdKeyboardArrowRight
                            className={`arrow ${season.season_number === activeSeason ? "rotate" : ""}`}
                            onClick={() => handleToggle(season)}
                        />
                        <li
                            className='season-title'
                            onClick={() => handleToggle(season)}
                        >
                            Season {season.season_number}
                        </li>
                        {season.season_number === activeSeason &&
                            (<ul className={`episodes-list ${season.season_number === activeSeason ? "show" : "hide"}`}>
                                {(episodes.length > 0) && episodes?.map((episode, index) => {
                                    const episodeDelay = `${index * 0.03}s`;
                                    return (
                                        <li
                                            key={episode.episode_number}
                                            className={`episode ${season.season_number === activeSeason ? "show" : ""}`}
                                            style={{ animationDelay: episodeDelay }}
                                        >
                                            Episode: {episode.episode_number} {episode.name}
                                        </li>
                                    );
                                })}
                            </ul>)
                        }
                    </div>
                ))}
            </ul>
        </div>
    );
};

export default Seasons;
