import React from "react";
import "./CardView.scss";

interface CardViewProps {
    phrase: string;
    image: string;
    imageStyle: React.CSSProperties;

}

const CardView: React.FC<CardViewProps> = ({
                                               phrase,
                                               image,
                                               imageStyle,
                                           }) => {
    return (
        <div className="card">
            <img style={imageStyle}
                 src={require(`../../../../assets/images/${image}`)} alt="example"/>
            <b>{phrase}</b>
        </div>
    );
};

export default CardView;