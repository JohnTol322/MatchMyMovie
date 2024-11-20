import React from "react";
import "./OnboardingPage.scss";
import FavoriteGenreList from "./FavoriteGenreList/FavoriteGenreList";
import {Genre} from "../../models/Movie";
import WatchProviderList from "./WatchProviderList/WatchProviderList";
import WatchProvider from "../../models/WatchProvider";

const OnboardingPage: React.FC = () => {

    const taglines: string[] = [
        "What genres do you like?",
        "What watch providers do you use?",
        "What is your favorite movie?",
        "Summary"
    ];

    const [totalSteps] = React.useState(4);
    const [currentStep, setCurrentStep] = React.useState(1);
    const [favoriteGenres, setFavoriteGenres] = React.useState<Genre[]>([]);
    const [selectedProviders, setSelectedProviders] = React.useState<WatchProvider[]>([]);
    const [isLoading, setIsLoading] = React.useState(false);

    const renderStep = () => {
        switch (currentStep) {
            case 1:
                return <FavoriteGenreList favoriteGenres={favoriteGenres}
                                          setFavoriteGenres={setFavoriteGenres}/>;
            case 2:
                return <WatchProviderList setSelectedProviders={setSelectedProviders}
                                          selectedProviders={selectedProviders}/>;
        }
    }

    return (
        <div className="page-background">
            <div className="onboarding-container">
                <div className="onboarding-title">
                    <b>Complete your profile</b>
                    <p>Step {currentStep}/{totalSteps} - {taglines[currentStep - 1]}</p>
                    <div className="steps-bar">
                        <div style={{width: `${(100 / totalSteps) * currentStep}%`}} className="progress"></div>
                    </div>
                </div>
                {renderStep()}
                <button style={{cursor: isLoading ? "default" : "cursor"}} disabled={isLoading}
                        onClick={() => setCurrentStep(currentStep === totalSteps ? currentStep : currentStep + 1)}>
                    {isLoading ? "Loading..." : currentStep === totalSteps ? "Start swiping!" : "Next step"}
                </button>
            </div>
        </div>
    );
}

export default OnboardingPage;