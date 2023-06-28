import { useState } from "react";
import { getUserFromCookies, setToken, unsetToken } from "../api/api";
import "../styles/authform.css";

const AuthForm = () => {
  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });
  const [registerData, setRegisterData] = useState({
    email: "",
    username: "",
    password: "",
  });
  const [showLogin, setShowLogin] = useState(true);
  const user = getUserFromCookies();

  const handleLogin = async (e: React.FormEvent<HTMLInputElement> | any) => {
    e.preventDefault();
    const res = await fetch("http://localhost:1337/auth/local", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        identifier: loginData.username,
        password: loginData.password,
      }),
    });
    setToken({ user: await res.json() });
  };
  const handleRegister = async (e: React.FormEvent<HTMLInputElement> | any) => {
    e.preventDefault();
    const res = await fetch("http://localhost:1337/auth/local/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: registerData.email,
        username: registerData.username,
        password: registerData.password,
      }),
    });
    setToken({ user: await res.json() });
  };
  const handleLogout = () => {
    unsetToken();
  };
  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    if (showLogin) {
      setLoginData({
        ...loginData,
        [e.currentTarget.name]: e.currentTarget.value,
      });
    } else {
      setRegisterData({
        ...registerData,
        [e.currentTarget.name]: e.currentTarget.value,
      });
    }
  };
  return (
    <div className="container">
      {!user ? (
        <>
          {showLogin ? (
            <>
              <h4 className="text">Log in</h4>
              <div>
                <input
                  className="inputField"
                  type="text"
                  name="username"
                  onChange={handleChange}
                  placeholder="Enter username..."
                />
                <input
                  className="inputField"
                  type="password"
                  name="password"
                  onChange={handleChange}
                  placeholder="Enter password..."
                />
                <button
                  className="submitButton"
                  type="submit"
                  onClick={handleLogin}
                >
                  Log in
                </button>
              </div>
            </>
          ) : (
            <>
              <h4 className="text">Register</h4>
              <div>
                <input
                  className="inputField"
                  type="email"
                  name="email"
                  onChange={handleChange}
                  placeholder="Enter email..."
                />
                <input
                  className="inputField"
                  type="text"
                  name="username"
                  onChange={handleChange}
                  placeholder="Enter username..."
                />
                <input
                  className="inputField"
                  type="password"
                  name="password"
                  onChange={handleChange}
                  placeholder="Enter password..."
                />
                <button
                  className="submitButton"
                  type="submit"
                  onClick={handleRegister}
                >
                  Register
                </button>
              </div>
            </>
          )}
        </>
      ) : (
        <button className="submitButton" type="submit" onClick={handleLogout}>
          Log out
        </button>
      )}
      {!user && (
        <button
          className="submitButton"
          type="submit"
          onClick={() => setShowLogin((prev) => !prev)}
        >
          {`Switch to ${showLogin ? "Register" : "Login"}`}
        </button>
      )}
    </div>
  );
};

export default AuthForm;
