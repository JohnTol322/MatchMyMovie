import React from "react";
import "./WatchProviderItem.scss";
import WatchProvider from "../../../../models/WatchProvider";

interface WatchProviderItemProps {
    provider: WatchProvider;
    handleSelectProvider: (provider: WatchProvider) => void;
}

const WatchProviderItem: React.FC<WatchProviderItemProps> = ({
                                                                 provider,
                                                                 handleSelectProvider
                                                             }) => {

    const [isSelected, setIsSelected] = React.useState<boolean>(false);

    return (
        <div className={`watch-provider-item ${isSelected && "selected"}`} onClick={() => {
            setIsSelected(!isSelected)
            handleSelectProvider(provider);
        }}>
            <img src={`https://image.tmdb.org/t/p/original${provider.logo_path}`} alt="Watch Provider Logo"/>
            <b>{provider.provider_name}</b>
        </div>
    );
}

export default WatchProviderItem;