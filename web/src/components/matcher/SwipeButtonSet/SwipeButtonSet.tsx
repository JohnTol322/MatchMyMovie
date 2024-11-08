import React from "react";
import "./SwipeButtonSet.scss";

interface SwipeButtonSetProps {
    onSwipeRight: () => void;
    onSwipeLeft: () => void;
}

const SwipteButtonSet: React.FC<SwipeButtonSetProps> = ({
                                                            onSwipeRight,
                                                            onSwipeLeft
                                                        }) => {

    return (
        <div className="swipe-buttons">
            <img onClick={onSwipeLeft}
                 src={require("../../../assets/images/dislikeButton.png")} alt={"dislike"}/>
            <img onClick={onSwipeRight}
                 src={require("../../../assets/images/likeButton.png")} alt={"dislike"}/>
        </div>
    );
}

export default SwipteButtonSet;