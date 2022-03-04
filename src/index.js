import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

import "./scss/index.scss";
// import { QueryClient, QueryClientProvider } from "react-query";
// import { ReactQueryDevtools } from "react-query/devtools";

// const queryClient = new QueryClient();

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { firebaseConfig } from "./api/firebase";
import { FirebaseAuthContext } from "./components/contexts/firebaseAuth";

const app = initializeApp(firebaseConfig);
const db = getFirestore();
const auth = getAuth();

ReactDOM.render(
  <React.StrictMode>
    <FirebaseAuthContext.Provider value={auth}>
      <App />
    </FirebaseAuthContext.Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
