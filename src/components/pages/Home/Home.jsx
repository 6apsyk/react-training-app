import { useEffect } from "react";
import Counters from "../../common/Counters/Counters";
import Layout from "../../Layout/Layout";
import Button from "../../ui/Button/Button";
// import bgImg from '../../../images/home-bg.jpg'
import bgImg from "../../../images/bg.jpg";
import styles from "./Home.module.scss";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { collection, getDocs, query, where } from "firebase/firestore";

import { db } from "../../../index";
import { setDocumentId, setUserStatistic } from "../../../redux/appSlice";

// let snap = null;

function Home() {
    const { userStatitic, isAuth, userEmail } = useSelector(state => state.app);
    console.log("isAuth", isAuth);
    const dispatch = useDispatch();

    const collectionStatistic = collection(db, "statistic");

    useEffect(() => {
        async function getDocument() {
            if (isAuth) {
                const q = query(collectionStatistic, where("email", "==", `${userEmail}`));
                const querySnapshot = await getDocs(q);
                querySnapshot.forEach(doc => {
                    dispatch(setDocumentId(doc.id));
                    localStorage.setItem("documentId", doc.id);
                    const { minutes, level, up, exersices, workout } = doc.data();
                    console.log(minutes, level, up, exersices, workout);
                    dispatch(setUserStatistic({ minutes, level, up, exersices, workout }));
                });
            }
            // else {
            //     setUserStatistic({});
            // }
        }
        getDocument();

        // eslint-disable-next-line
    }, [isAuth]);

    const navigate = useNavigate();
    return (
        <Layout bgImg={bgImg}>
            <Button appearance="ligth" onClick={() => isAuth && navigate("/new-workout")}>
                New
            </Button>
            <h1 className={styles.heading}>EXERCISES FOR THE SHOULDERS</h1>
            {Object.keys(userStatitic).length !== 0 ? <Counters userStatitic={userStatitic} /> : null}
        </Layout>
    );
}

export default Home;
