import React, {useRef} from 'react';
import "./HomePage.scss";
import CardList from "./CardList/CardList";
import {Link} from "react-router-dom";

const HomePage = () => {

    const sectionRef = useRef(null);

    const scrollToCards = () => {
        if (sectionRef.current) {
            //@ts-ignore
            sectionRef.current.scrollIntoView({behavior: 'smooth'});
        }
    }

    return (
        <>
            <div className="container" style={{marginTop: "140px"}}>
                <div className="logo-container">
                    <div className="logo"></div>
                    <div className="start-buttons">
                        <Link to={"/matcher"}>
                            <button className="start-btn">GET STARTED</button>
                        </Link>
                        <button className="more-btn" onClick={scrollToCards}>READ MORE</button>
                    </div>
                </div>
                <div className="swipe-example"></div>
            </div>
            <div ref={sectionRef} className="container">
                <CardList/>
            </div>
        </>
    );
};

export default HomePage;