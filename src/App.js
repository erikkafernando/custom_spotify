import React, { useEffect, useState } from "react";
import "./App.scss";
import Login from "../src/components/login/Login";
import MainApp from "./components/mainapp/MainApp";

function App() {
  const [token, setToken] = useState("");

  useEffect(() => {
    const hash = window.location.hash;
    let token = window.localStorage.getItem("token");
    if (!token && hash) {
      token = hash
        .substring(1)
        .split("&")
        .find((elem) => elem.startsWith("access_token"))
        .split("=")[1];

      window.location.hash = "";
      window.localStorage.setItem("token", token);
    }

    setToken(token);
  }, []);

  return (
    <div className="App">
      {" "}
      {token ? <MainApp token={token} setToken={setToken} /> : <Login />}{" "}
    </div>
  );
}

export default App;
