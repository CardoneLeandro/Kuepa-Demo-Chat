import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./navbar.style.css";
import "bootstrap/dist/css/bootstrap.min.css";

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const storedCredentials = localStorage.getItem("credentials");
    setIsLoggedIn(!!storedCredentials);
  }, [location.pathname]);

  const handleSignOut = () => {
    localStorage.removeItem("credentials");
    setIsLoggedIn(false);
    navigate("/");
  };

  return (
    <div className="navbar bg-body-tertiary">
      <div className="container-fluid justify-content-end">
        {isLoggedIn ? (
          <button
            type="button"
            className={
              isLoggedIn ? "btn btn-outline-danger" : "btn btn-primary"
            }
            onClick={isLoggedIn ? handleSignOut : () => navigate("/formPage")}
          >
            {isLoggedIn ? "Logout" : "Login"}
          </button>
        ) : null}
      </div>
    </div>
  );
};

export default Navbar;
