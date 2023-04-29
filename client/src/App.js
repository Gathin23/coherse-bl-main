import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Developer from "./pages/Developer/Developer";
import Mentor from "./pages/Mentor/Mentor";
import "./App.css";

import { AppContext } from "./context/AppContext";

function App() {
  const [user, setUser] = useState(null);
  const [isMentor, setIsMentor] = useState(false);
  const [isDeveloper, setIsDeveloper] = useState(false);

  const setUserInput = (query) => {
    localStorage.setItem("query", query);
  };

  const getUser = async () => {
    try {
      const url = `${process.env.REACT_APP_API_URL}/auth/login/success`;
      const { data } = await axios.get(url, { withCredentials: true });
      setUser(data.user._json);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  const handleMentorClick = () => {
    setIsMentor(true);
  };

  const handleDeveloperClick = () => {
    setIsDeveloper(true);
  };

  return (
    <div className="container">
      <Routes>
        <Route
          exact
          path="/"
          element={
            user ? (
              <Home
                user={user}
                handleDeveloperClick={handleDeveloperClick}
                handleMentorClick={handleMentorClick}
              />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          exact
          path="/login"
          element={user ? <Navigate to="/" /> : <Login />}
        />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/developer"
          element={<Developer setUserInput={setUserInput} />}
        />
        <Route path="/mentor" element={<Mentor />} />
      </Routes>
    </div>
  );
}

export default App;
