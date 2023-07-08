//MUI Icons
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import VideoCallOutlinedIcon from "@mui/icons-material/VideoCallOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import ClearRoundedIcon from "@mui/icons-material/ClearRounded";
import AccountPop from "./AccountPop";

import "../Css/navbar.css";
import Logo from "../img/logo1.png";
import { useEffect, useState } from "react";
import Signup from "./Signup";
import Signin from "./Signin";
import avatar from "../img/avatar.png";
import { useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";

function Navbar() {
  const [isbtnClicked, setisbtnClicked] = useState(false);
  const [isSwitch, setisSwitched] = useState(false);
  const token = localStorage.getItem("userToken");
  const [email, setEmail] = useState();
  const [profilePic, setProfilePic] = useState();
  const [showPop, setShowPop] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      setisbtnClicked(false);
      setEmail(jwtDecode(token).email);
    }
  }, [token]);

  useEffect(() => {
    const getData = async () => {
      try {
        if (email) {
          const response = await fetch(
            `http://localhost:3000/getuserimage/${email}`
          );
          const { channelIMG } = await response.json();
          setProfilePic(channelIMG);
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    const interval = setInterval(getData, 200);

    return () => clearInterval(interval);
  }, [email]);

  return (
    <>
      <div className="navbar">
        <div className="left-bar">
          <MenuRoundedIcon
            className="menu"
            fontSize="large"
            style={{ color: "white" }}
          />
          <img
            src={Logo}
            alt="logo"
            loading="lazy"
            className="youtubeLogo"
            onClick={() => {
              navigate("/");
              window.location.reload();
            }}
          />
        </div>
        <div className="middle-bar">
          <div className="search">
            <input type="text" placeholder="Type to search" id="searchType" />
            <SearchRoundedIcon
              className="search-icon"
              fontSize="large"
              style={{ color: "rgb(160, 160, 160)" }}
            />
          </div>
        </div>
        <div
          className="right-bar"
          style={
            token
              ? { justifyContent: "space-evenly", paddingRight: "0px" }
              : { justifyContent: "space-between", paddingRight: "25px" }
          }
        >
          <VideoCallOutlinedIcon
            className="icon-btns"
            fontSize="large"
            style={{ color: "rgb(160, 160, 160)" }}
            onClick={() => {
              navigate("/studio");
            }}
          />
          <NotificationsNoneOutlinedIcon
            className="icon-btns"
            fontSize="large"
            style={{ color: "rgb(160, 160, 160)" }}
          />
          <button
            onClick={() => {
              if (isbtnClicked === false) {
                setisbtnClicked(true);
                document.body.classList.add("bg-css");
              } else {
                setisbtnClicked(false);
                document.body.classList.remove("bg-css");
              }
            }}
            className="signin"
            style={token ? { display: "none" } : { display: "flex" }}
          >
            <AccountCircleOutlinedIcon
              fontSize="medium"
              style={{ color: "rgb(0, 162, 255)" }}
            />
            <p>Signin</p>
          </button>
          <img
            src={profilePic && profilePic}
            alt="user profile pic"
            loading="lazy"
            className="profile-pic"
            style={token ? { display: "block" } : { display: "none" }}
            onClick={() => {
              if (showPop === false) {
                setShowPop(true);
              } else {
                setShowPop(false);
              }
            }}
          />
        </div>
      </div>
      <div
        className="auth-popup"
        style={
          isbtnClicked === true ? { display: "block" } : { display: "none" }
        }
      >
        <ClearRoundedIcon
          onClick={() => {
            if (isbtnClicked === false) {
              setisbtnClicked(true);
            } else {
              setisbtnClicked(false);
              document.body.classList.remove("bg-css");
            }
          }}
          className="cancel"
          fontSize="large"
          style={{ color: "gray" }}
        />
        <div
          className="signup-last"
          style={
            isSwitch === false ? { display: "block" } : { display: "none" }
          }
        >
          <Signup />
          <div className="already">
            <p>Already have an account?</p>
            <p
              onClick={() => {
                if (isSwitch === false) {
                  setisSwitched(true);
                } else {
                  setisSwitched(false);
                }
              }}
            >
              Signin
            </p>
          </div>
        </div>
        <div
          className="signin-last"
          style={isSwitch === true ? { display: "block" } : { display: "none" }}
        >
          <Signin />
          <div className="already">
            <p>Don&apos;t have an account?</p>
            <p
              onClick={() => {
                if (isSwitch === false) {
                  setisSwitched(true);
                } else {
                  setisSwitched(false);
                }
              }}
            >
              Signup
            </p>
          </div>
        </div>
      </div>
      <div
        className="ac-pop"
        style={showPop === true ? { display: "block" } : { display: "none" }}
      >
        <AccountPop />
      </div>
    </>
  );
}

export default Navbar;
