import { useEffect, useState } from "react";
interface Data {
  id: string;
  Title: string;
  Description: string;
}
export const useFetch = (url: string) => {
  const [data, setData] = useState<Data[]>();
  const [error, setError] = useState<null | unknown>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(url);
        const json = await res.json();
        setData(json);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };
    fetchData();
  }, [url, loading]);

  const sendDataHandler = async (title: string, desc: string) => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:1337/tests", {
        headers: { "Content-Type": "application/json" },
        method: "POST",
        body: JSON.stringify({
          Title: title,
          Description: desc,
        }),
      });
      await res.json();
      setLoading(true);
    } catch (err) {
      console.error(err);
    }
  };
  const updateDataHandler = async (id: string, title: string, desc: string) => {
    try {
      const res = await fetch(`http://localhost:1337/tests/${id}`, {
        headers: { "Content-Type": "application/json" },
        method: "PUT",
        body: JSON.stringify({
          id,
          Title: title,
          Description: desc,
        }),
      });
      await res.json();
      setLoading(true);
    } catch (err) {
      console.error(err);
    }
  };

  const deletePostHandler = async (id: string) => {
    try {
      const res = await fetch(`http://localhost:1337/tests/${id}`, {
        headers: { "Content-Type": "application/json" },
        method: "DELETE",
        body: JSON.stringify({
          id,
        }),
      });
      await res.json();
      setLoading(true);
    } catch (err) {
      console.error(err);
    }
  };

  return {
    data,
    error,
    loading,
    sendDataHandler,
    updateDataHandler,
    deletePostHandler,
  };
};
