import { useState } from "react";
import { useFetch } from "../hooks/useFetch";
import List from "./List";
import Posts from "./Posts";

const Cards = () => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const {
    data,
    error,
    loading,
    sendDataHandler,
    updateDataHandler,
    deletePostHandler,
  } = useFetch();

  if (error) return <p>Error</p>;

  return (
    <div className="wrapper">
      <div className="card">
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            marginTop: "10px",
            marginBottom: "10px",
          }}
        >
          <label>Title</label>
          <input
            type="text"
            placeholder="Title"
            style={{ borderRadius: "5px", padding: "8px", border: "none" }}
            onChange={(e) => setTitle(e.target.value)}
          />
          <label>Description</label>
          <input
            type="text"
            placeholder="Description"
            style={{ borderRadius: "5px", padding: "8px", border: "none" }}
            onChange={(e) => setDesc(e.target.value)}
          />
          <button
            style={{
              backgroundColor: "purple",
              width: "100px",
              height: "30px",
              padding: "5px",
              borderRadius: "5px",
              outline: "none",
              border: "none",
              color: "white",
              cursor: "pointer",
              fontWeight: "bold",
            }}
            onClick={() => sendDataHandler(title, desc)}
          >
            Create post
          </button>
        </div>
      </div>
      <Posts
        data={data || undefined}
        deletePostHandler={deletePostHandler}
        desc={desc}
        title={title}
        loading={loading}
        setDesc={setDesc}
        setTitle={setTitle}
        updateDataHandler={updateDataHandler}
      />
      <List />
    </div>
  );
};
export default Cards;
