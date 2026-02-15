import React from 'react';
import './style.scss';

export const Genres = ({ genres = [] }) => {
    const count = {};

    // Ensure genres is an array
    if (!Array.isArray(genres)) {
        console.log(genres);
        console.error('Genres prop should be an array');
        return null;
    }

    return (
        <div className="genres">
            {genres.length > 0 && genres.map((g, index) => {
                return genres.map((element, idx) => {
                    if (count[element]) {
                        return null;
                    } else {
                        count[element] = 1;
                        return (
                            <span key={`${index}-${idx}`} className="genre">{element}</span>
                        );
                    }
                });
            })}
        </div>
    );
};
