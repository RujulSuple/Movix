import React, { useState, useEffect } from "react";
import parse from "html-react-parser";

const HTMLDisplay = () => {
    const [htmlContent, setHtmlContent] = useState("");

    useEffect(() => {
        fetch("/api/login")
            .then((res) => res.text())
            .then((data) => setHtmlContent(data))
            .catch((err) => console.error("Error fetching HTML:", err));
    }, []);

    return <div>{parse(htmlContent)}</div>;
};

export default HTMLDisplay;