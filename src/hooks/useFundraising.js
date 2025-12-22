import { useEffect, useState, useCallback } from "react";
import { fetchFundraising } from "../utils/fundraisingApi.js";

export const useFundraising = () => {
  const [cards, setCards] = useState(() => {
    // Load cached data if available
    const cached = localStorage.getItem("fundraisingCache");
    return cached ? JSON.parse(cached) : [];
  });

  const [loading, setLoading] = useState(cards.length === 0);
  const [error, setError] = useState(null);

  // MAIN FETCH FUNCTION
  const loadData = useCallback(async () => {
    try {
      setLoading(true);
      const data = await fetchFundraising();

      if (Array.isArray(data)) {
        setCards(data);
        localStorage.setItem("fundraisingCache", JSON.stringify(data)); // Save cache
      }

      setError(null);
    } catch (err) {
      console.error("Fundraising fetch error:", err);
      setError("Unable to load fundraising data");
    } finally {
      setLoading(false);
    }
  }, []);

  // AUTO FETCH ON MOUNT
  useEffect(() => {
    loadData(); // First fetch
  }, [loadData]);

  // AUTO REFRESH EVERY 30 SECONDS
  useEffect(() => {
    const interval = setInterval(() => {
      loadData();
    }, 30000);

    return () => clearInterval(interval);
  }, [loadData]);

  return { cards, loading, error, refetch: loadData };
};