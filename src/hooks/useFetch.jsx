import { useEffect, useState } from "react";
import { fetchDataFromApi } from "../../util/api";

const useFetch = (url, params) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading("loading...");
        setData(null);
        setError(null);

        fetchDataFromApi(url, params)
            .then((res) => {
                setLoading(false);
                setData(res);
            })
            .catch((err) => {
                setLoading(false);
                console.log(err);
                setError("Something went wrong!");
            });
    }, [url]);

    return { data, loading, error };
};

export default useFetch;