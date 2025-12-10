// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from "firebase/firestore";
//import { use } from 'react';
const firebaseConfig = {
  apiKey: "AIzaSyBxsdGJkVcpbVEqVS6y8raVf12x2hgdvkY",
  authDomain: "react-joblisting.firebaseapp.com",
  projectId: "react-joblisting",
  storageBucket: "react-joblisting.firebasestorage.app",
  messagingSenderId: "100093303708",
  appId: "1:100093303708:web:dffd66febdc00541e88659",
  measurementId: "G-GK73D1653H"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export services
export const db = getFirestore(app);
export const auth = getAuth(app);

  const signup = async (email, password, role) => {
    const userCredentials = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredentials.user;

    await setDoc(doc(db, "users", user.uid), { 
        email: user.email,
        role : role 

     }  );
    return user;
}
export default signup