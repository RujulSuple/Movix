import React from 'react'
import './style.scss';
import Img from "../LazyLoadImage/Img";
import Photo from "../../assets/avatar.png";
const Profile = ({ name = "Not_Found" }) => {
    return (
        <>
            <div className="profile_photo">
                <Img src={Photo} />
            </div>
            <div className="profile_name">{name}</div>
        </>

    )
}

export default Profile