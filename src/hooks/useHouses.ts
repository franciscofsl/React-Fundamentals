import House from "@/types/House";
import { useEffect, useState } from "react";
import loadingStatus from "@/helpers/loadingStatus";

interface HouseData {
    id: number;
    address: string;
    country: string;
    price: number;
}

const useHouses = () => {
    const [houses, setHouses] = useState<House[]>([]);
    const [loadingState, setLoadingState] = useState(loadingStatus.isLoading);

    useEffect(() => {
        const fetchHouses = async () => {
            try {
                setLoadingState(loadingStatus.isLoading);
                const response = await fetch("/src/data/houses.json");
                const housesData: HouseData[] = await response.json();
                
                const houses = housesData.map(
                    (h: HouseData) => new House(h.id, h.address, h.country, h.price)
                );
                await new Promise(f => setTimeout(f, 1000));
                setLoadingState(loadingStatus.loaded);
                setHouses(houses);

            } catch {
                setLoadingState(loadingStatus.hasErrored);
            }

        };

        fetchHouses();

    }, []); // Empty array: the effect is executed only once when mounting the component, avoiding repeated API calls.
    return { houses, setHouses, loadingState };
};

export default useHouses;