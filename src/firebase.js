// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getStorage} from "firebase/storage";
import {
    getFirestore,
    query,
    getDocs,
    collection,
    where,
    addDoc} from "@firebase/firestore"
import {
    GoogleAuthProvider,
    getAuth,
    signInWithPopup,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    sendPasswordResetEmail,
    signOut} from "firebase/auth";
import {useNavigation} from "react-router-dom";
import {doc, updateDoc, setDoc} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAdVvP6M7tG2mwOO1SiKyh7eQO2M2vYDSY",
    authDomain: "findmyroomie-1c447.firebaseapp.com",
    databaseURL: "https://findmyroomie-1c447-default-rtdb.firebaseio.com",
    projectId: "findmyroomie-1c447",
    storageBucket: "findmyroomie-1c447.appspot.com",
    messagingSenderId: "338332794962",
    appId: "1:338332794962:web:7949423d28e531dd211f8b"
};
const googleProvider = new GoogleAuthProvider();
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const firestore = getFirestore(app);

const signInWithGoogle = async () => {
    try{
        const res = await signInWithPopup(auth,googleProvider);
        const user = res.user;
        const q = query(collection(firestore, "users"), where ("uid", "==", user.uid));
        const docs = await  getDocs(q);
        if (docs.docs.length===0){
            await addDoc(collection(firestore,"users"),
                {
                    uid: user.uid,
                    name: user.displayName,
                    authProvider: "google",
                    email: user.email,
                });
        }

    }catch(err){
        console.error(err);
        alert(err.message);
    }
};

const logInWithEmailAndPassword = async (email,password) =>{
    try{
        await signInWithEmailAndPassword(auth,email,password);

    } catch (err){
        console.error(err);
        alert(err.message);
    }
}
const registerWithEmailAndPassword = async (name, email, password) => {
    try {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const user = res.user;
        await addDoc(collection(firestore, "users"), {
            uid: user.uid,
            name,
            authProvider: "local",
            email,
            completedSurvey: false,
        });
    } catch (err) {
        console.error(err);
        alert(err.message);
    }
};

const sendPasswordReset = async (email) => {
    try {
        await sendPasswordResetEmail(auth, email);
        alert("Password reset link sent!");
    } catch (err) {
        console.error(err);
        alert(err.message);
    }
};

const storeSurveyResults = async (uid, survey) => {
    try {
        // Create a reference to the user document
        const userRef = doc(firestore, "users", uid);

        // Update the user document with the survey data
        await setDoc(userRef, {
            survey: survey,
            completedSurvey: true,
        }, { merge: true }); // Use merge: true to update the user document without overwriting other fields
    } catch (err) {
        console.error(err);
        alert(err.message);
    }
};


/**
 * Old code
const storeSurveyResults = async (userId, surveyData) => {
    try{
        await addDoc(collection(firestore, "surveys"), {
            userId,
            surveyData,
            timestamp: new Date()
        });
        const userRef = doc(firestore, "users", userId);
        await updateDoc(userRef, {
            completedSurvey: true,
        });
    }catch (err) {
        console.error(err);
        alert(err.message);
    }
}
**/

const logout = () => {
    signOut(auth);
};

export {
    auth,
    firestore,
    signInWithGoogle,
    logInWithEmailAndPassword,
    registerWithEmailAndPassword,
    sendPasswordReset,
    storeSurveyResults,
    logout,
};

// Initialize Firebase
export const storage = getStorage();