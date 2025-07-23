import { useEffect, useState, useCallback, useOptimistic } from "react";
import loadingStatus from "../helpers/loadingStatus";
import type { Bid } from "../types/Bid";

const useBids = (houseId: number) => {
  const [bids, setBids] = useState<Bid[]>([]);
  const [loadingState, setLoadingState] = useState(loadingStatus.isLoading);
  const [optimisticBids, addOptimisticBids] = useOptimistic(bids, (bids, newbid) => [...bids, newbid]);

  // Función para obtener bids del localStorage
  const getBidsFromStorage = useCallback((houseId: number): Bid[] => {
    try {
      const storedBids = localStorage.getItem(`bids_${houseId}`);
      return storedBids ? JSON.parse(storedBids) : [];
    } catch (error) {
      console.error("Error reading bids from localStorage:", error);
      return [];
    }
  }, []);

  // Función para guardar bids en localStorage
  const saveBidsToStorage = useCallback((houseId: number, bids: Bid[]): void => {
    try {
      localStorage.setItem(`bids_${houseId}`, JSON.stringify(bids));
    } catch (error) {
      console.error("Error saving bids to localStorage:", error);
    }
  }, []);

  // Función para inicializar datos de ejemplo si no existen
  const initializeExampleBids = useCallback((houseId: number): Bid[] => {
    const existingBids = getBidsFromStorage(houseId);
    if (existingBids.length === 0) {
      // Solo agregar datos de ejemplo para las primeras casas
      if (houseId <= 3) {
        const exampleBids: Bid[] = [
          {
            id: 1,
            houseId,
            bidder: "John Doe",
            amount: 250000 + (houseId * 10000),
            timestamp: new Date(Date.now() - 86400000).toISOString() // 1 día atrás
          },
          {
            id: 2,
            houseId,
            bidder: "Jane Smith",
            amount: 260000 + (houseId * 10000),
            timestamp: new Date(Date.now() - 43200000).toISOString() // 12 horas atrás
          }
        ];
        saveBidsToStorage(houseId, exampleBids);
        return exampleBids;
      }
    }
    return existingBids;
  }, [getBidsFromStorage, saveBidsToStorage]);

  useEffect(() => {
    const fetchBids = () => {
      setLoadingState(loadingStatus.isLoading);
      try {
        const storedBids = initializeExampleBids(houseId);
        setBids(storedBids);
        setLoadingState(loadingStatus.loaded);
      } catch (error) {
        console.error("Error fetching bids:", error);
        setLoadingState(loadingStatus.hasErrored);
      }
    };
    
    if (houseId) {
      fetchBids();
    }
  }, [houseId, initializeExampleBids]);

  const addBid = useCallback((bid: Bid): void => {
    // Generar un ID único para la bid
    const newBid: Bid = {
      ...bid,
      id: Date.now() + Math.random(), // ID único simple
      timestamp: new Date().toISOString()
    };
    
    addOptimisticBids(newBid);
    const updatedBids = [...bids, newBid];
    setBids(updatedBids);
    saveBidsToStorage(houseId, updatedBids);
  }, [bids, houseId, saveBidsToStorage]);

  return { bids: optimisticBids, loadingState, addBid };
};

export default useBids;
