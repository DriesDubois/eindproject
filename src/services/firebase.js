import {initializeApp} from "firebase/app";
import {getFirestore} from 'firebase/firestore';
const firebaseConfig = {
    projectId: process.env.REACT_APP_FIREBASE_ID,
};
// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
export const firestoreDB = getFirestore(firebaseApp);
console.log("initialized firebase connection");