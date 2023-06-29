import React, { FC } from "react";
import "../styles/header.css";
import AuthForm from "../components/AuthForm";

const Header: FC = () => {
  const changeLangHandler = (lang: string) => {
    localStorage.setItem("lang", lang);
  };
  return (
    <div className="header">
      <div>Strapi v3</div>
      <ul className="languages">
        <li>
          <a href="?lang=en" onClick={() => changeLangHandler("en")}>
            EN
          </a>
        </li>
        <li>
          <a href="?lang=ja" onClick={() => changeLangHandler("ja")}>
            JA
          </a>
        </li>
      </ul>
      <AuthForm />
    </div>
  );
};

export default Header;
