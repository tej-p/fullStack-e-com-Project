import React from 'react';
import {ReactNavbar} from "overlay-navbar"
import logo from "../images/logo.png";

const styles = {
  burgerColorHover: "#86eb34",
  logo,
  logoWidth: "20vmax",
  navColor1: "white",
  logoHoverSize: "10px",
  logoHoverColor: "#86eb34",
  link1Text: "Home",
  link2Text: "Products",
  link3Text: "Contact",
  link4Text: "About",
  link1Url: "/",
  link2Url: "/products",
  link3Url: "/contact",
  link4Url: "/about",
  link1Size: "1.3vmax",
  link1Color: "#6317cf",
  nav1justifyContent: "flex-end",
  nav2justifyContent: "flex-end",
  nav3justifyContent: "flex-start",
  nav4justifyContent: "flex-start",
  link1ColorHover: "#86eb34",
  link1Margin: "1vmax",
  profileIconUrl: "/login",
  profileIconColor: "#6317cf",
  searchIconColor: "#6317cf",
  cartIconColor: "#6317cf",
  profileIconColorHover: "#86eb34",
  searchIconColorHover: "#86eb34",
  cartIconColorHover: "#86eb34",
  cartIconMargin: "1vmax"
};

export const Header = () => {
  return (
    <div>
      <ReactNavbar {...styles}/>
    </div>
  )
}

// export default Header