import React from 'react';
import "./styles.scss";
import ContentWrapper from '../ContentWrapper/ContentWrapper';


const AutoComplete = ({ results }) => {
    console.log(results);

    return (
        <div className='auto-suggest'>
            <ContentWrapper>
                <div className="suggestion">
                    {results?.contents.map((result, index) => (
                        <li key={index} className='result'>{result.title}</li>
                    ))}
                </div>
            </ContentWrapper>
        </div>
    );
};

export default AutoComplete;
