import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

import "./scss/index.scss";

import { store } from "./redux/store";
import { Provider } from "react-redux";

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { firebaseConfig } from "./api/firebase";
import { getAuth } from "firebase/auth";

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export const db = getFirestore();
console.log("IndexAUTH", auth);

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </React.StrictMode>,
    document.getElementById("root")
);
