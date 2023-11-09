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

// create a reference to "surveys" collection
const surveysCollection = collection(firestore, "surveys");

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

        // Create a reference to the user's document in the "users" collection
        const userRef = doc(firestore, "users", user.uid);

        // Add user data directly in the "users" collection
        await setDoc(userRef, {
            name,
            authProvider: "local",
            email,
            completedSurvey: false,
        });

        console.log("User data saved successfully in the users collection.");
    } catch (err) {
        console.error(err);
        alert(err.message);
    }
};

// const registerWithEmailAndPassword = async (name, email, password) => {
//     try {
//         const res = await createUserWithEmailAndPassword(auth, email, password);
//         const user = res.user;
//         await addDoc(collection(firestore, "users"), {
//             uid: user.uid,
//             name,
//             authProvider: "local",
//             email,
//             completedSurvey: false,
//         });
//     } catch (err) {
//         console.error(err);
//         alert(err.message);
//     }
// };

const sendPasswordReset = async (email) => {
    try {
        await sendPasswordResetEmail(auth, email);
        alert("Password reset link sent!");
    } catch (err) {
        console.error(err);
        alert(err.message);
    }
};

const storeSurveyResults = async(userId, surveyData) => {
    try {
        // Create a reference to the user's document in the "user" collection
        const userRef = doc(firestore, "users", userId);

        // create a reference to the subcollection "userSurveys" within the "user"
        const userSurveysRef = collection(userRef, "userSurveys");

        // add a new document in the "userSurveys" subcollection with the survey data
        await addDoc(userSurveysRef, surveyData);

        // we don't need this method
        // // update user's profile to mark they have completed survey
        // await updateDoc(userRef, {
        //     completedSurvey: true,
        // });

        console.log("Survey data saved successfully in the subcollection of the users data.");
    
    } catch (err) {
        console.error(err);
        alert("Failed to save survey data. " + err.message);
    }

};

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