import React, { useState, useEffect } from "react";

import "./style.scss";

const SwitchTabs = ({ data, onTabChange }) => {
    const [selectedTab, setSelectedTab] = useState(0);
    const [left, setLeft] = useState(0);
    const [tabWidth, setTabWidth] = useState(100); // Default width

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth <= 600) {
                setTabWidth(50); // Width for smaller screens
            } else {
                setTabWidth(100); // Width for larger screens
            }
        };

        window.addEventListener("resize", handleResize);
        handleResize(); // Call initially to set the width

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);


    const activeTab = (tab, index) => {
        setLeft(index * tabWidth);
        setTimeout(() => {
            setSelectedTab(index);
        }, 300);
        onTabChange(tab, index);
    };

    return (
        <div className="switchingTabs">
            <div className="tabItems">
                {data.map((tab, index) => (
                    <span
                        key={index}
                        className={`tabItem ${selectedTab === index ? "active" : ""
                            }`}
                        onClick={() => activeTab(tab, index)}
                    >
                        {tab}
                    </span>
                ))}
                <span className="movingBg" style={{ left: `${left}px` }} />
            </div>
        </div>
    );
};

export default SwitchTabs;