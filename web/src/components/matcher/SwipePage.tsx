import React from "react";
import "./SwipePage.scss";

const SwipePage = () => {
    return (
        <div className="swipe-page">
            <div className="swipe-box">
                <img className="movie-poster" src={"https://via.placeholder.com/300"} alt={"profile"}/>
                <div className="swipe-buttons">
                    <img src={require("../../assets/images/dislikeButton.png")} alt={"dislike"}/>
                    <img src={require("../../assets/images/likeButton.png")} alt={"dislike"}/>
                </div>
            </div>
        </div>
    );
}

export default SwipePage;