import React, { FC } from "react";
import { getUserFromCookies } from "../api/api";
import Cards from "../components/Cards";
import "../styles/homepage.css";

const Homepage: FC = () => {
  const user = getUserFromCookies();
  return (
    <div>
      {user ? (
        <Cards />
      ) : (
        <div>
          <h1 style={{ textAlign: "center", color: "white" }}>
            Log in to view all features.
          </h1>
        </div>
      )}
    </div>
  );
};

export default Homepage;
