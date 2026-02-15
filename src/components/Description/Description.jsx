import React, { useState } from 'react';
import "./Description.scss";

const Description = ({ description }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const truncateText = (text, lines) => {
        const words = text.split(' ');
        let truncated = '';

        for (let i = 0; i < words.length; i++) {
            truncated += words[i] + ' ';
            if (truncated.length >= lines * 25) { // Approximate length for 4 lines
                truncated = truncated.trim() + '...';
                break;
            }
        }

        return truncated;
    };

    const toggleExpand = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <div className="description">
            <p className={`text roboto ${isExpanded ? "expanded" : ""}`}>
                {isExpanded ? description : truncateText(description, 4)}
            </p>
            <button onClick={toggleExpand}>
                {isExpanded ? 'Show Less' : 'Read More'}
            </button>
        </div>
    );
};

export default Description;
