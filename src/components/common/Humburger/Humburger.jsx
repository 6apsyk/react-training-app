import React, { useContext } from "react";

import hamburgerIcon from "../../../images/hamburger.svg";
import hamburgerClose from "../../../images/hamburger-close.svg";

import styles from "./Humburger.module.scss";
import cn from "classnames";
// import { Link } from 'react-router-dom'
import { useOutsideAlerter } from "../../hooks/useOutsideAlerter";
import { FirebaseAuthContext } from "../../contexts/firebaseAuth";
import { signOut } from "firebase/auth";
import { useDispatch } from "react-redux";
import { setIsAuth, setUserEmail, setUserUid } from "../../../redux/appSlice";
import { useNavigate } from "react-router-dom";

const Humburger = () => {
  let navigate = useNavigate();

  const auth = useContext(FirebaseAuthContext);
  const dispatch = useDispatch();

  const { ref, isComponentVisible, setIsComponentVisible } = useOutsideAlerter(false);

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        setIsComponentVisible(false);
        dispatch(setIsAuth(false));
        localStorage.removeItem("email");
        localStorage.removeItem("uid");
        dispatch(setUserEmail(""));
        dispatch(setUserUid(""));
      })
      .then(() => navigate("/"))
      .catch(error => console.log("ошибка выхода", error.message));
  };

  return (
    <div className={styles.wrapper} ref={ref}>
      <button
        style={{ width: 27, heigth: 27 }}
        onClick={() => setIsComponentVisible(isComponentVisible => !isComponentVisible)}
      >
        <img src={isComponentVisible ? hamburgerClose : hamburgerIcon} alt="hamburger" />
      </button>
      <nav
        className={cn(styles.menu, {
          [styles.view]: isComponentVisible === true,
        })}
      >
        <ul>
          <li>
            <button className={styles.logout} onClick={() => navigate("/workout")}>
              Workout
            </button>
          </li>
          <li>
            <button className={styles.logout} onClick={() => navigate("/new-workout")}>
              Create New
            </button>
          </li>
          <li>
            <button className={styles.logout} onClick={() => navigate("/profile")}>
              Profile
            </button>
          </li>
          <li>
            <button className={styles.logout} onClick={handleLogout}>
              Logout
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Humburger;
