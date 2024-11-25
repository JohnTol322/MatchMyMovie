import React, {useEffect} from "react";
import "./WatchProviderList.scss";
import {watchProviderService} from "../../../services/WatchProviderService";
import AuthError from "../../../models/errors/AuthError";
import WatchProvider from "../../../models/WatchProvider";
import {useNavigate} from "react-router-dom";
import WatchProviderItem from "./WatchProviderItem/WatchProviderItem";

interface WatchProviderListProps {
    setSelectedProviders: (providers: WatchProvider[]) => void;
    selectedProviders: WatchProvider[];
}

const WatchProviderList: React.FC<WatchProviderListProps> = ({
                                            setSelectedProviders,
                                            selectedProviders
                                     }) => {

    const [watchProviders, setWatchProviders] = React.useState<WatchProvider[]>([]);

    const handleSelectProvider = (provider: WatchProvider) => {
        if (selectedProviders.includes(provider)) {
            setSelectedProviders(selectedProviders.filter((p) => p !== provider));
        } else {
            setSelectedProviders([...selectedProviders, provider]);
        }
    }

    const navigate = useNavigate();
    useEffect(() => {
        watchProviderService.getWatchProviders().then((watchProviders) => {
            setWatchProviders(watchProviders);
        }).catch((error) => {
            if (error instanceof AuthError) {
                navigate("/login");
            }

            console.error(error);
        });
    }, [navigate]);

    return (
        <div className="watch-provider-container">
            {watchProviders.map((watchProvider) => <WatchProviderItem key={watchProvider.provider_id} handleSelectProvider={handleSelectProvider} provider={watchProvider} />)}
        </div>
    );
}

export default WatchProviderList;