import React from "react";
import "./SwipeButtonSet.scss";

interface SwipeButtonSetProps {
    onSwipeRight: () => void;
    onSwipeLeft: () => void;
    onInfoClick: () => void;
}

const SwipeButtonSet: React.FC<SwipeButtonSetProps> = ({
                                                            onSwipeRight,
                                                            onSwipeLeft,
                                                            onInfoClick
                                                        }) => {

    return (
        <div className="swipe-buttons">
            <div className="left-side">
                <img onClick={onSwipeLeft}
                     src={require("../../../assets/images/icons/dislikeButton.png")} alt={"dislike"}/>
            </div>
            <div className="right-side">
                <img onClick={onSwipeRight}
                     src={require("../../../assets/images/icons/likeButton.png")} alt={"dislike"}/>
                <img onClick={onInfoClick}
                     className="info-icon"
                     src={require("../../../assets/images/icons/infoIcon.png")} alt={"info"}/>
            </div>
        </div>
    );
}

export default SwipeButtonSet;