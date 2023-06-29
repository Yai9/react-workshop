import { useEffect, useState } from "react";
interface Data {
  id: string;
  Title: string;
  Description: string;
}
export const useFetch = () => {
  const [data, setData] = useState<Data[]>();
  const [error, setError] = useState<null | unknown>(null);
  const [loading, setLoading] = useState(true);
  const lang = localStorage.getItem("lang") || "en";
  const baseUrl = "http://localhost:1337/news";
  const fetchDataUrl = `http://localhost:1337/news?_locale=${lang}`;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(fetchDataUrl);
        const json = await res.json();
        setData(json);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };
    fetchData();
  }, [loading, fetchDataUrl]);

  const sendDataHandler = async (title: string, desc: string) => {
    setLoading(true);
    try {
      const res = await fetch(baseUrl, {
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
      const res = await fetch(`${baseUrl}/${id}`, {
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
      const res = await fetch(`${baseUrl}/${id}`, {
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
