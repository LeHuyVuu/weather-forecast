/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";

/**
 * Custom hook for fetching data from APIs
 * @param {Object} params - Fetch parameters
 * @param {string} params.url - Full API URL (should include API key if needed)
 * @param {string} params.method - HTTP method (default: "GET")
 * @param {Object} params.headers - Additional headers
 * @returns {Object} { isLoading, data }
 */

const DEFAULT_HEADERS = {
    Accept: "application/json",
};

export default function useFetch({ url = "", method = "GET", headers = {} }) {
    const [data, setData] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (!url) return;
        
        setIsLoading(true);

        fetch(url, {
            method,
            headers: {
                ...DEFAULT_HEADERS,
                ...headers,
            },
        })
            .then(async (res) => {
                if (!res.ok) {
                    throw new Error(`HTTP error! status: ${res.status}`);
                }
                const data = await res.json();
                setData(data);
            })
            .catch((err) => {
                console.error("Fetch error:", err);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, [url, method, JSON.stringify(headers)]);

    return { isLoading, data };
}



