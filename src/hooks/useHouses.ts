import House from "@/types/House";
import { useEffect, useState } from "react";

interface HouseData {
    id: number;
    address: string;
    country: string;
    price: number;
}

const useHouses = () => {
    const [houses, setHouses] = useState<House[]>([]);

    useEffect(() => {
        const fetchHouses = async () => {
            const response = await fetch("/src/data/houses.json");
            const housesData: HouseData[] = await response.json();

            const houses = housesData.map(
                (h: HouseData) => new House(h.id, h.address, h.country, h.price)
            );

            setHouses(houses);
        };

        fetchHouses();

    }, []); // Empty array: the effect is executed only once when mounting the component, avoiding repeated API calls.
    return { houses, setHouses };
};

export default useHouses;