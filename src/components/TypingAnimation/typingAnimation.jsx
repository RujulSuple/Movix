import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles.scss';

const ReactTypingAnimation = ({ placeholders = [] }) => {
    const [index, setIndex] = useState(0);
    const [placeholder, setPlaceholder] = useState('');
    const [query, setQuery] = useState('');
    const navigate = useNavigate();
    const inputRef = useRef(null);
    const blinkerRef = useRef(null);

    //Typing effect
    useEffect(() => {
        if (document.activeElement != inputRef.current && query === '') {
            let place = '';
            const typingInterval = setInterval(() => {
                if (place.length < placeholders[index].length) {
                    place += placeholders[index][place.length];
                    setPlaceholder(place);
                } else {
                    clearInterval(typingInterval);
                    const deletingInterval = setInterval(() => {
                        if (place.length > 0) {
                            place = place.slice(0, place.length - 1);
                            setPlaceholder(place);
                        } else {
                            clearInterval(deletingInterval);
                            setIndex((index + 1) % placeholders.length);
                        }
                    }, 100);
                }
            }, 200);
            return () => clearInterval(typingInterval);
        }
    }, [index]);

    //Dynamic Styling for the blikning pipe
    useEffect(() => {
        const inputElement = inputRef.current;
        let adjLength = getComputedStyle(inputElement).fontSize === '20px' ? '10' : '7.3';
        let padding;
        if (adjLength === '10') {
            padding = 33;
        }
        else {
            padding = 15;
        }
        if (query === '' && placeholder != '') {
            const placeholderWidth = (inputElement.placeholder.length * adjLength) + padding; // Add 30 for padding and 10 for some extra space
            blinkerRef.current.style.left = `${placeholderWidth}px`;
        }
        else {
            blinkerRef.current.style.left = padding;
        }
    }, [placeholder]);

    const handleSearchQuery = (event) => {
        if (event.key === 'Enter') {
            navigate(`/search/${query}`);
        }
    };

    return (
        <>
            <input
                className='roboto-typingAnimation'
                type="text"
                value={query}
                ref={inputRef}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={placeholder}
                onKeyUp={handleSearchQuery}
            />
            {query === '' && <span className="blinking-cursor" ref={blinkerRef}>|</span>}
        </>
    );
};

export default ReactTypingAnimation;
