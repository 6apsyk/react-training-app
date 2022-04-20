import hamburgerIcon from "../../../images/hamburger.svg";
import hamburgerClose from "../../../images/hamburger-close.svg";

import styles from "./Humburger.module.scss";
import cn from "classnames";
// import { Link } from 'react-router-dom'
import { useOutsideAlerter } from "../../hooks/useOutsideAlerter";
import { useDispatch, useSelector } from "react-redux";
import { setIsAuth, setUserEmail, setDocumentId, setUserStatistic } from "../../../redux/appSlice";
import { useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";

const Humburger = () => {
    let navigate = useNavigate();

    const { isAuth } = useSelector(state => state.app);

    const dispatch = useDispatch();

    const { ref, isComponentVisible, setIsComponentVisible } = useOutsideAlerter(false);

    const handleLogout = () => {
        const auth = getAuth();
        console.log("auth", auth);
        signOut(auth)
            .then(() => {
                setIsComponentVisible(false);
                dispatch(setIsAuth(false));
                localStorage.removeItem("email");
                localStorage.removeItem("documentId");
                dispatch(setUserEmail(""));
                dispatch(setDocumentId(""));
                dispatch(setUserStatistic({}));
            })
            .then(() => navigate("/"))
            .catch(error => console.log("ошибка выхода", error.message));
    };

    return (
        <div className={styles.wrapper} ref={ref}>
            <button style={{ width: 27, heigth: 27 }} onClick={() => setIsComponentVisible(isComponentVisible => !isComponentVisible)}>
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
                        <button className={styles.logout} onClick={() => isAuth && navigate("/new-workout")}>
                            Create New
                        </button>
                    </li>
                    <li>
                        <button className={styles.logout} onClick={() => isAuth && navigate("/profile")}>
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
