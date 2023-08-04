import firebase from 'firebase/app';
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCSzAS8yssSn4u-eVc-xKVDemg408M56ZY",
  authDomain: "guessing-game-8d46d.firebaseapp.com",
  projectId: "guessing-game-8d46d",
  storageBucket: "guessing-game-8d46d.appspot.com",
  messagingSenderId: "183081110700",
  appId: "1:183081110700:web:4330482c843f17fecce309"
};

// Inicialize o Firebase com a configuração
firebase.initializeApp(firebaseConfig);

// Exporte o Firestore
export const firestore = firebase.firestore();