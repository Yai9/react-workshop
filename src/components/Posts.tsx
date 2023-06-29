import { Dispatch, FC, SetStateAction } from "react";
import Loader from "./Loader";
interface Data {
  id: string;
  Title: string;
  Description: string;
}

interface PostData {
  title: string;
  desc: string;
  data: Data[] | undefined;
  loading: boolean;
  setTitle: Dispatch<SetStateAction<string>>;
  setDesc: Dispatch<SetStateAction<string>>;
  updateDataHandler: (itemId: string, title: string, desc: string) => void;
  deletePostHandler: (itemId: string) => void;
}

const Posts: FC<PostData> = ({
  title,
  desc,
  data,
  loading,
  setTitle,
  setDesc,
  updateDataHandler,
  deletePostHandler,
}) => {
  return (
    <div>
      {data?.map((item) => (
        <div className="card" key={item.id}>
          {loading ? (
            <Loader />
          ) : (
            <>
              <span style={{ fontSize: "18px" }}>
                Post Id: <span style={{ fontWeight: "bold" }}>{item.id}</span>
              </span>
              <div id={item.id} key={item.id}>
                <h2>{item.Title}</h2>
                <p>{item.Description}</p>
              </div>

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
                  style={{
                    borderRadius: "5px",
                    padding: "8px",
                    border: "none",
                  }}
                  onChange={(e) => setTitle(e.target.value)}
                />
                <label>Description</label>
                <input
                  type="text"
                  placeholder="Description"
                  style={{
                    borderRadius: "5px",
                    padding: "8px",
                    border: "none",
                  }}
                  onChange={(e) => setDesc(e.target.value)}
                />

                <button
                  style={{
                    backgroundColor: "purple",
                    width: "100px",
                    height: "30px",
                    padding: "8px",
                    borderRadius: "5px",
                    outline: "none",
                    border: "none",
                    color: "white",
                    cursor: "pointer",
                    fontWeight: "bold",
                  }}
                  onClick={() => updateDataHandler(item.id, title, desc)}
                >
                  Update data
                </button>
                <button
                  style={{
                    backgroundColor: "#913724",
                    width: "100px",
                    height: "30px",
                    padding: "8px",
                    borderRadius: "5px",
                    outline: "none",
                    border: "none",
                    color: "white",
                    cursor: "pointer",
                    fontWeight: "bold",
                  }}
                  onClick={() => deletePostHandler(item.id)}
                >
                  Delete post
                </button>
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default Posts;
