import React from 'react'
import Profile from '../Profile/Profile'
import "./style.scss";
const Cast = ({ cast = [] }) => {
    return (
        <div className="cast_container">
            {cast.map((name, index) => {
                return (
                    <div className="Cast" key={index}>
                        <Profile name={name} />
                    </div>
                )
            })}
        </div>
    )

}

export default Cast