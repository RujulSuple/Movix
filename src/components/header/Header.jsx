import React, { useState, useEffect } from "react";
import { HiOutlineSearch } from "react-icons/hi";
import { SlMenu } from "react-icons/sl";
import { FaArrowRight } from "react-icons/fa6";
import { VscChromeClose } from "react-icons/vsc";
import { useNavigate } from "react-router-dom";
import "./Header.scss";


import ContentWrapper from "../ContentWrapper/ContentWrapper";
import logo from '../../assets/movix-logo.svg';
import { fetchDataFromApi } from "../../../util/api";
import AutoComplete from "../AutoComplete/AutoComplete";
let debounceTimer;

const Header = () => {
    const [show, setShow] = useState("top");
    const [lastScrollY, setLastScrollY] = useState(0);
    const [mobileMenu, setMobileMenu] = useState(false);
    const [query, setQuery] = useState("");
    const [results, setResults] = useState();
    const [showSearch, setShowSearch] = useState("");
    const [searchTriggered, setSearchTriggered] = useState(false);
    const navigate = useNavigate();

    const openMobileMenu = () => {
        setMobileMenu(true);
        setShowSearch(false);
    };

    const openSearch = () => {
        setMobileMenu(false);
        setShowSearch(true);
    };

    const controlNavbar = () => {
        if (window.scrollY > 200) {
            if (window.scrollY > lastScrollY) {
                setShow("hide");
            } else {
                setShow("show");
            }
        } else {
            setShow("top");
        }
        setLastScrollY(window.scrollY);
    };

    const handleQuerySearch = (e) => {
        if (e.key == 'Enter') {
            setSearchTriggered(true);
        }
    };

    const fetchResults = (query) => {
        try {
            fetchDataFromApi("/search", query).then(res => setResults(res));
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        if (query.length > 0) {
            clearTimeout(debounceTimer);
            debounceTimer = setTimeout(() => {
                fetchResults(query);
            }, 1500); // 700ms debounce
        }

        /*const fetchData = async () => {
            if (searchTriggered && query) {
                try {
                    const data = await fetchDataFromApi("/search", query);
                    console.log("Fetched data:", data);
                } catch (error) {
                    console.error("Error fetching data:", error);
                } finally {
                    setSearchTriggered(false);
                }
            }
        };
        fetchData(); */
    }, [query]);

    useEffect(() => {
        window.addEventListener("scroll", controlNavbar);
        return () => {
            window.removeEventListener("scroll", controlNavbar);
        };
    }, [lastScrollY]);

    useEffect(() => {
        const closeSearchBar = (e) => {
            if (setShowSearch && !e.target.closest(".searchBar") && !e.target.closest(".menuItem")) {
                setShowSearch(false);
                setQuery("");
            }
        }
        document.body.addEventListener("click", closeSearchBar)
        return () => document.body.removeEventListener("click", closeSearchBar)
    }, [])

    return (
        <header className={`header ${mobileMenu ? 'showMenu' : 'hideMenu'} ${show}`}>
            <ContentWrapper>
                <div className="logo">
                    <img src={logo} alt="App logo" onClick={() => navigate(`/`)} />
                </div>
                <ul className="menuItems">
                    <li className="menuItem">Movies</li>
                    <li className="menuItem">TV Shows</li>
                    <li className="menuItem" onClick={openSearch}><HiOutlineSearch /></li>
                </ul>

                <div className="mobileMenuItems">
                    <HiOutlineSearch onClick={openSearch} />
                    {mobileMenu ? <VscChromeClose onClick={() => setMobileMenu(false)} /> : <SlMenu onClick={openMobileMenu} />} {/*For closing the button */}
                </div>
            </ContentWrapper>
            {showSearch && (
                <div className="searchBar">
                    <ContentWrapper>
                        <div className="searchInput">
                            <input
                                type="text"
                                placeholder="Search for a movie or tv show...."
                                onChange={(e) => setQuery(e.target.value)}
                                onKeyUp={(e) => { handleQuerySearch(e) }}
                            />
                            {(query.length) > 0 ? <FaArrowRight /> : <VscChromeClose onClick={() => setShowSearch(false)} />}
                        </div>
                    </ContentWrapper>
                    {/* Search Suggestions */}
                    {query.length > 0 && results !== undefined &&
                        <AutoComplete results={results} />
                    }
                </div>
            )}
        </header>
    );
};

export default Header;