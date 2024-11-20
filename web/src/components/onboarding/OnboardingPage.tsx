import React from "react";
import "./OnboardingPage.scss";
import FavoriteGenreList from "./FavoriteGenreList/FavoriteGenreList";
import {Genre} from "../../models/Movie";

const OnboardingPage: React.FC = () => {

    const taglines: string[] = [
        "What are your favorite genres?",
        "What watch providers do you use?",
        "What is your favorite movie?",
        "Summary"
    ];

    const [totalSteps] = React.useState(4);
    const [currentStep, setCurrentStep] = React.useState(1);
    const [favoriteGenres, setFavoriteGenres] = React.useState<Genre[]>([]);
    const [isLoading, setIsLoading] = React.useState(false);

    const renderStep = () => {
        switch (currentStep) {
            case 1:
                return <FavoriteGenreList favoriteGenres={favoriteGenres} setFavoriteGenres={setFavoriteGenres} />;
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