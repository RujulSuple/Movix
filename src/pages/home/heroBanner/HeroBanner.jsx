import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import Img from '../../../components/LazyLoadImage/Img';
import ReactTypingAnimation from '../../../components/TypingAnimation/typingAnimation';
import "./styles.scss";
import ContentWrapper from '../../../components/ContentWrapper/ContentWrapper';

const HeroBanner = () => {
    const [background, setBackground] = useState("");
    const { backdrop } = useSelector((state) => state?.home?.home_data);
    const config = useSelector((state) => state?.home?.config);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (backdrop && backdrop.length > 0) {
            const randomIndex = Math.floor(Math.random() * backdrop.length);
            setBackground(`${config?.images?.base_url}${config?.images?.backdrop_sizes[3]}${backdrop[randomIndex]}`);
            setLoading(false);
        }
    }, [backdrop]);

    return (
        <div className="heroBanner">
            <div className="backdrop-img">
                {loading ? (<div className="_skeleton" style={{ height: '100%', width: '100%' }}></div>) : <Img src={background} />}
            </div>

            <div className="opacity-layer"></div>

            <ContentWrapper>
                <div className="heroBannerContent roboto-homePage">
                    <span className="title">Welcome </span>
                    <span className="subtitle">Millons of Movies, TV shows and pepole to discover.
                        <br />Explore Now.
                    </span>
                    <div className="searchInput">
                        <ReactTypingAnimation placeholders={["Search for Movies", "Search for TV shows", "Search for people", "Explore more"]} />
                        <button>Search</button>
                    </div>
                </div>
            </ContentWrapper >
        </div >
    )
}

export default HeroBanner