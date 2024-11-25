import React, {useEffect} from "react";
import "./OnboardingPage.scss";
import FavoriteGenreList from "./FavoriteGenreList/FavoriteGenreList";
import {Genre, Movie} from "../../models/Movie";
import WatchProviderList from "./WatchProviderList/WatchProviderList";
import WatchProvider from "../../models/WatchProvider";
import MovieSearch from "./MovieSearch/MovieSearch";
import OnboardingSummary from "./OnboardingSummary/OnboardingSummary";
import {useNavigate} from "react-router-dom";
import {onboardingService} from "../../services/OnboardingService";

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
    const [favoriteMovie, setFavoriteMovie] = React.useState<Movie>();
    const [isLoading, setIsLoading] = React.useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const onboardStatus: string | null = localStorage.getItem("onboard_status");
        if (onboardStatus === "finished") {
            navigate("/matcher");
        }
    }, []);

    const renderStep = () => {
        switch (currentStep) {
            case 1:
                return <FavoriteGenreList favoriteGenres={favoriteGenres}
                                          setFavoriteGenres={setFavoriteGenres}/>;
            case 2:
                return <WatchProviderList setSelectedProviders={setSelectedProviders}
                                          selectedProviders={selectedProviders}/>;
            case 3:
                return <MovieSearch favoriteMovie={favoriteMovie}
                                    setFavoriteMovie={setFavoriteMovie} />;
            case 4:
                return <OnboardingSummary favoriteGenres={favoriteGenres}
                                          selectedProviders={selectedProviders}
                                          favoriteMovie={favoriteMovie!} />
        }
    }

    const renderButton = () => {
        let content;
        if (isLoading) {
            content = "Loading...";
        } else if (currentStep === totalSteps) {
            content = "Start swiping!";
        } else {
            content = "Next step";
        }

        const isDisabled = nextStepDisabled();

        return (
            <button className="next-btn" style={isDisabled ? {backgroundColor: "#3C4755", border: "#4BBBAE 2px solid", cursor: "default"} : {}} disabled={isDisabled}
                    onClick={onButtonClick}>
                {content}
            </button>
        );
    }

    const onButtonClick = () => {
        if (currentStep === totalSteps) {
            saveOnboardingData();
        } else {
            setCurrentStep(currentStep + 1);
        }
    }

    const nextStepDisabled = () => {
        switch (currentStep) {
            case 1:
                return favoriteGenres.length === 0;
            case 2:
                return selectedProviders.length === 0;
            case 3:
                return favoriteMovie === undefined;
            default:
                return false;
        }
    }

    const saveOnboardingData = () => {
        setIsLoading(true);
        onboardingService.addOnboardingToUser({
            genreIds: favoriteGenres.map(genre => genre.id),
            watchProviderIds: selectedProviders.map(provider => provider.provider_id),
            favoriteMovieId: favoriteMovie!.id
        }).then(() => {
            setTimeout(() => {
                localStorage.setItem("onboard_status", "finished");
                setIsLoading(false);
                navigate("/matcher");
            }, 400);
        }).catch(() => {
            setIsLoading(false);
        });
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
                {renderButton()}
            </div>
        </div>
    );
}

export default OnboardingPage;