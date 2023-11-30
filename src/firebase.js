// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getStorage, ref, uploadBytes, getDownloadURL} from "firebase/storage";
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
    onAuthStateChanged,
    signInWithPopup,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    sendPasswordResetEmail,
    signOut} from "firebase/auth";
import {useNavigation} from "react-router-dom";
import {doc, updateDoc, setDoc, getDoc} from "firebase/firestore";
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
const storage = getStorage(app);
const onAuthStateChange = onAuthStateChanged;

const signInWithGoogle = async () => {
    try{
        const res = await signInWithPopup(auth,googleProvider);
        const user = res.user;
        const q = query(collection(firestore, "users"), where ("uid", "==", user.uid));
        const docs = await  getDocs(q);
        if (docs.docs.length===0){

             // Set the document ID as the users uid
            const userRef = doc(firestore, "users", user.uid);

            await setDoc(userRef, {
                uid: user.uid,
                name: user.displayName,
                authProvider: "google",
                email: user.email,
                profileImage: user.photoURL, // Save google profile image URL
                completedSurvey: false,
            });
        }

        // Create an empty userChats document
        await createUserChatsDocument(user.uid, user.displayName);
        
        // Create an empty userMatches document
        await createUserMatchesDocument(user.uid);

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

const registerWithEmailAndPassword = async (name, email, password, profileImage) => {
    try {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const user = res.user;


        // upload profile image to storage reference
        const storageRef = ref(storage, `profileImages/${user.uid}`);
        await uploadBytes(storageRef, profileImage);

        // download url for image
        const downloadURL = await getDownloadURL(storageRef);
        
        // Set the document ID as the users uid
        const userRef = doc(firestore, "users", user.uid); 

        // promise is used to wait for both profile image to upload and firestore doc to update before continuing
        await setDoc(userRef, {
            uid: user.uid,
            name,
            authProvider: "local",
            email,
            profileImage: downloadURL, // Save the download URL in Firestore
            completedSurvey: false,
        })

        // Create an empty userChats document
        await createUserChatsDocument(user.uid, name);
        
        // Create an empty userMatches document
        await createUserMatchesDocument(user.uid);

        console.log("User data saved successfully in the users collection.");
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

// new code
const createUserChatsDocument = async (userId, name) => {
    try {
        const userChatsRef = doc(firestore, "userChats", userId);
        const timestamp = new Date();

        // Specify the structure for the userChats document
        const chatData = {
            date: timestamp,
            lastMessage: {
                text: "test", // Not sure what to put here - talk to Carter (Siah)
            },
            userInfo: {
                name: name,
                photoImage: "test", // need to implement adding photo functionality
                uid: userId,
            },
        };

        // set doc to chatData structure
        await setDoc(userChatsRef, chatData);

        console.log("UserChats document created sucessfully for user: " + userId);

    } catch (err) {
        console.error(err);
        alert("Failed to create UserChats document. " + err.message);
    }
}


const storeSurveyResults = async (userId, surveyData) => {
    try {
        const timestamp = new Date();
        surveyData.timestamp = timestamp;
        
        // Check if the user document exists
        const userRef = doc(firestore, "users", userId);
        const userDoc = await getDoc(userRef);

        if (userDoc.exists()) {
            // Update the users survey completion
            await updateDoc(userRef, { completedSurvey: true });
            
            // set document id as uid
            const surveyRef = doc(collection(firestore, "surveys"), userId);

            await setDoc(surveyRef, {
                uid: userId,
                surveyData: surveyData
            });

            console.log("Survey data saved successfully in the surveys collection.");
        } else {
            console.error("User document doesn't exist for user: " + userId);
        }

    } catch (err) {
        console.error(err);
        alert("Failed to save survey data. " + err.message);
    }
};


const removeMatchFromFirestore = async (currentUser, match) => {
    try {
        const userRef = doc(firestore, "users", currentUser.uid);
        await updateDoc(userRef, {
            matches: firestore.FieldValue.arrayRemove({
                uid: match.uid,
                status: 'not interested',
            }),
        });
    } catch (error) {
        console.error("Error marking match as not interested in Firestore:", error);
    }
};

// for matches page
const getUserDataByUID = async (uid) => {
    try {
        const userRef = doc(firestore, "users", uid);
        const userDoc = await getDoc(userRef);

        if (userDoc.exists()) {
            return userDoc.data();
        } else {
            console.error(`User document not found for UID: ${uid}`);
            return null;
        }
    } catch (error) {
        console.error("Error fetching user data:", error);
        return null;
    }
};

const updateMatchesForNewUser = async (newUserId) => {
    try {
        const usersQuerySnapshot = await getDocs(collection(firestore, "users"));

        // Loop through all users except the new user
        for (const userDoc of usersQuerySnapshot.docs) {
            const userId = userDoc.id;
            if (userId !== newUserId) {
                const matchesRef = doc(firestore, "matches", userId);

                // Update matches for other users by adding the new user to the matches map
                await updateDoc(matchesRef, {
                    [`matches.${newUserId}`]: {
                        uid: newUserId,
                        status: "pending",
                    },
                });
            }
        }

        console.log(`Matches updated for new user: ${newUserId}`);
    } catch (err) {
        console.error(err);
        alert("Failed to update matches for new user. " + err.message);
    }
};

//createUserMatchesDocument function to updates matches only for the current user
const createUserMatchesDocument = async (userId) => {
    try {
        const matchesRef = doc(firestore, "matches", userId);
        const timestamp = new Date();

        //structure for the matches doc
        const matchesDocData = {
            date: timestamp,
            matches: {},
        };

        await setDoc(matchesRef, matchesDocData);

        console.log("Matches document created successfully for user: " + userId);

        // Update matches for other users by adding the new user to their matches map
        await updateMatchesForNewUser(userId);
    } catch (err) {
        console.error(err);
        alert("Failed to create Matches document. " + err.message);
    }
};


const logout = () => {
    signOut(auth);
};



export{
    auth,
    onAuthStateChanged,
    firestore,
    signInWithGoogle,
    logInWithEmailAndPassword,
    registerWithEmailAndPassword,
    sendPasswordReset,
    storeSurveyResults,
    logout,
    app,
    createUserChatsDocument,
    storage,
    removeMatchFromFirestore,
    getUserDataByUID,
};

// Initialize Firebase
