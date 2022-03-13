import { useEffect, useState } from "react";
import Counters from "../../common/Counters/Counters";
import Layout from "../../Layout/Layout";
import Button from "../../ui/Button/Button";
// import bgImg from '../../../images/home-bg.jpg'
import bgImg from "../../../images/bg.jpg";
import styles from "./Home.module.scss";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { collection, onSnapshot, query, where } from "firebase/firestore";

import { db } from "../../../index";
import { setUserUid } from "../../../redux/appSlice";

let snap = null;

function Home() {
  const [userStatitic, setUserStatistic] = useState({});

  const { userEmail, isAuth } = useSelector(state => state.app);
  const dispatch = useDispatch();

  const collectionStatistic = collection(db, "statistic");

  useEffect(() => {
    if (isAuth) {
      // const docRef = doc(db, "statistic", localStorage.getItem("uid"));
      // onSnapshot(docRef, doc => {
      //   console.log("Измененный документ", doc.data(), doc.id);
      // });
      const q = query(collectionStatistic, where("email", "==", `${userEmail}`));
      snap = onSnapshot(q, snapshot => {
        let stat = [];
        snapshot.docs.forEach(doc => {
          stat.push({ ...doc.data(), id: doc.id });
          // console.log(doc.data(), doc.id);
        });
        setUserStatistic(stat[0]);
        dispatch(setUserUid(stat[0].id));
        localStorage.setItem("uid", stat[0].id);
      });
    } else {
      setUserStatistic({});
    }
    return () => {
      snap();
    };
    // eslint-disable-next-line
  }, [isAuth]);

  const navigate = useNavigate();
  return (
    <Layout bgImg={bgImg}>
      <Button appearance="ligth" onClick={() => navigate("/new-workout")}>
        New
      </Button>
      <h1 className={styles.heading}>EXERCISES FOR THE SHOULDERS</h1>
      {Object.keys(userStatitic).length !== 0 ? <Counters userStatitic={userStatitic} /> : null}
    </Layout>
  );
}

export default Home;
