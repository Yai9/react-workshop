import React, { FC, useEffect, useState } from "react";
import "../styles/homepage.css";
import Loader from "./Loader";

interface Data {
  id: string;
  Title: string;
  Image: {
    formats: {
      small: {
        url: string;
      };
    };
  }[];
}

const List: FC = () => {
  const [data, setData] = useState<Data>();
  const [error, setError] = useState<null | unknown>(null);
  const [loading, setLoading] = useState(false);

  const baseImgUrl = "http://localhost:1337";
  useEffect(() => {
    const lang = localStorage.getItem("lang") || "en";
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await fetch(`http://localhost:1337/list?_locale=${lang}`);
        const json = await res.json();
        setData(json);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  if (error) return <div>Error</div>;
  return (
    <div className="wrapper">
      <div className="card">
        {loading ? (
          <Loader />
        ) : (
          <>
            <h2>List</h2>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                marginTop: "10px",
                marginBottom: "10px",
              }}
            >
              <div>{data?.Title}</div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyItems: "center",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "10px",
                }}
              >
                {data?.Image.map((img) => (
                  <img
                    key={img.formats.small.url}
                    src={baseImgUrl + img.formats.small.url}
                    alt={img.formats.small.url}
                    width="400px"
                    height="300px"
                    style={{ borderRadius: "10px" }}
                  />
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default List;
