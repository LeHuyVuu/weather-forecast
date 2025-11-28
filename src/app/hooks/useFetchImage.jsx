import { useEffect, useState } from "react";



const DEFAULT_HEADERS = {
    Accept: "application/json",
    // Authorization: `Bearer ${import.meta.env.APP_ID}`,
};

export default function useFetchImage({ url = "", method = "GET", headers = {} }) {
    const [data, setData] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);

        fetch(`${url}`, {
            method,
            headers: {
                ...DEFAULT_HEADERS,
                ...headers,
            },
        })
            .then(async (res) => {
                const data = await res.json();
                setData(data);
            })
            .catch((err) => {
                console.error(err);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, [url, method, JSON.stringify(headers)]);

    return { isLoading, data };
}