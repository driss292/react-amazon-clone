import React, { useEffect, useState } from "react";
import "../Components/scss/_Header.scss";

import { Link } from "react-router-dom";

import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";

import { useStateValue } from "../StateProvider";

import SearchIcon from "@material-ui/icons/Search";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Header() {
  const [{ basket }, dispatch] = useStateValue();
  const [user, setUser] = useState({});
  const [toggleMenu, setToggleMenu] = useState(false);
  const [largeur, setLargeur] = useState(window.innerWidth);

  useEffect(() => {
    const changeWidth = () => {
      setLargeur(window.innerWidth);
    };
    window.addEventListener("resize", changeWidth);

    return () => {
      window.removeEventListener("resize", changeWidth);
    };
  }, []);
  const toggleNav = () => {
    setToggleMenu(!toggleMenu);
  };

  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
  });

  const handleAuthentication = () => {
    if (user) {
      auth.signOut();
    }
  };

  return (
    <div className="header">
      <Link to="/">
        <img
          className="header_logo"
          src="http://pngimg.com/uploads/amazon/amazon_PNG11.png"
          alt=""
        />
      </Link>
      <div className="header_search">
        <input className="header_searchInput" type="text" />
        {/* SEARCH LOGO */}
        <SearchIcon className="header_searchIcon" />
      </div>
      <div className="header_nav">
        <Link to={!user && "/login"}>
          <div onClick={handleAuthentication} className="header_option">
            <span className="header_optionLineOne">
              Hello {!user ? "Guest" : user?.email}
            </span>
            <span className="header_optionLineTwo">
              {user ? "Sign out" : "Sign in"}
            </span>
          </div>
        </Link>
        <div className="header_option">
          <span className="header_optionLineOne">Returns</span>
          <span className="header_optionLineTwo">& Orders</span>
        </div>
        <div className="header_option">
          <span className="header_optionLineOne">Your</span>
          <span className="header_optionLineTwo">Prime</span>
        </div>
      </div>
      {/* <button onClick={toggleNav}>
        <FontAwesomeIcon icon="fa-solid fa-user" />
      </button> */}
      <Link to="/checkout">
        <div className="header_optionBasket">
          <ShoppingBasketIcon />
          <span className="header_optionLineTwo header_basketCount">
            {basket?.length}
          </span>
        </div>
      </Link>
    </div>
  );
}
