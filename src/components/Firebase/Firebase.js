//import firebase from "firebase/compat/app";
// import "firebase/compat/auth"

//Creamos la constante App 
import { initializeApp } from "firebase/app";

/* Importamos las funciones propias de la base de datos como getFirestore etc... */

import { getFirestore } from "@firebase/firestore";
// import { getAuth } from "firebase/auth";


/* Configuracion de firestore crud-fire-react */
const firebaseConfig = {
  apiKey: "AIzaSyDN8RE5_1Cl54nFOjoyQ2Ww9aTo0d_MYM4",
  authDomain: "crud-fire-react-2ded0.firebaseapp.com",
  projectId: "crud-fire-react-2ded0",
  storageBucket: "crud-fire-react-2ded0.appspot.com",
  messagingSenderId: "140415912611",
  appId: "1:140415912611:web:642aaf26221be9484d0d16",
};

// VARIABLES BASICAS
export const app = initializeApp(firebaseConfig);
// export const auth = getAuth(app);
export const db = getFirestore(app);
//export const storage = getStorage();
