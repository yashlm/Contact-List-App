import firebase from "firebase/compat/app";
import "firebase/compat/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCdtoMfvuLxOULoNpziceqMrMBlj4_Qp6g",
    authDomain: "contact-list-app-60cda.firebaseapp.com",
    projectId: "contact-list-app-60cda",
    storageBucket: "contact-list-app-60cda.appspot.com",
    messagingSenderId: "342774178900",
    appId: "1:342774178900:web:148b6b60f4d68a097839c1"
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

  export { db };