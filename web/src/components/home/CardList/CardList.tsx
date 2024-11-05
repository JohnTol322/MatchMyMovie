import React from "react";
import "./CardList.scss";
import CardView from "./CardView/CardView";

const CardList = () => {
    return (
        <div className="card-list">
            <CardView phrase="SWIPE" image="swipe-example.png"
                      imageStyle={{width: "290px", height: "390px", marginRight: "70px"}}/>
            <CardView phrase="MATCH" image="match-example.png"
                      imageStyle={{width: "260px", height: "290px"}}/>
            <CardView phrase="WATCH" image="streaming-services.png"
                      imageStyle={{width: "360px", height: "320px"}}/>
        </div>
    );
}

export default CardList;