import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

import "./scss/index.scss";

import { store } from "./redux/store";
import { Provider } from "react-redux";

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { firebaseConfig } from "./api/firebase";
import { FirebaseAuthContext } from "./components/contexts/firebaseAuth";

const app = initializeApp(firebaseConfig);
const db = getFirestore();
const auth = getAuth();
console.log(app);
console.log(db);

ReactDOM.render(
  <React.StrictMode>
    <FirebaseAuthContext.Provider value={auth}>
      <Provider store={store}>
        <App />
      </Provider>
    </FirebaseAuthContext.Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
