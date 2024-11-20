import React from "react";
import "./OnboardingSummary.scss";
import {Genre, Movie} from "../../../models/Movie";
import WatchProvider from "../../../models/WatchProvider";

interface OnboardingSummaryProps {
    favoriteGenres: Genre[];
    selectedProviders: WatchProvider[];
    favoriteMovie: Movie;
}

const OnboardingSummary: React.FC<OnboardingSummaryProps> = ({
                                                                 favoriteGenres,
                                                                 selectedProviders,
                                                                 favoriteMovie
                                                             }) => {

    return (
        <div className="onboarding-summary-container">
            <div className="summary-content">
                <p className="tagline">All your preferences can be changed later in profile {"->"} preferences</p>
                <div style={{height: "400px"}}>
                    <div className="summary-section">
                        <b className="title">Favorite Genres: </b>
                        <div className="summary-items">
                            {favoriteGenres.map((genre, index) => (
                                <div key={genre.id} className="summary-item">{genre.name}{index !== favoriteGenres.length-1 && <>,&nbsp;</>}</div>
                            ))}
                        </div>
                    </div>
                    <div className="summary-section">
                        <b className="title">Watch Providers: </b>
                        <div className="summary-items">
                            {selectedProviders.map((provider, index) => (
                                <div key={provider.provider_id}
                                     className="summary-item">{provider.provider_name}{index !== selectedProviders.length-1 && <>,&nbsp;</>}</div>
                            ))}
                        </div>
                    </div>
                    <div className="summary-section">
                        <b className="title">Favorite Movie: </b>
                        <div className="summary-items">
                            <div className="summary-item">{favoriteMovie.title}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default OnboardingSummary;