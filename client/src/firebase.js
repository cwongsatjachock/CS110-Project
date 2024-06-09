// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyASzN9xcfEWDb3K8xviUclo9IXpijzneuo",
  authDomain: "cs110-project-ecb22.firebaseapp.com",
  projectId: "cs110-project-ecb22",
  storageBucket: "cs110-project-ecb22.appspot.com",
  messagingSenderId: "642231073726",
  appId: "1:642231073726:web:c6849917a36e7235ed57ef",
  measurementId: "G-2DT0XV4B26"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export { app };