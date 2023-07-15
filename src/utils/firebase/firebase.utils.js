import { initializeApp } from 'firebase/app';
import {
    getAuth,
    signInWithRedirect,
    signInWithPopup,
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged
} from 'firebase/auth';
import {
    getFirestore,
    doc,
    getDoc,
    setDoc,
    collection,
    writeBatch,
    query,
    getDocs
} from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyCTptEVW08M0RUnjfCU-_NN5JdHIFwQKSs",
    authDomain: "recat-clothes-store.firebaseapp.com",
    projectId: "recat-clothes-store",
    storageBucket: "recat-clothes-store.appspot.com",
    messagingSenderId: "168379687084",
    appId: "1:168379687084:web:e52c2f5f9d3e498178ff09"
};


// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
    prompt: "select_account"
});

export const addCollectionAndDocument = async (collectionKey, objectsToAdd) => {
    const collectionRef = collection(db, collectionKey);
    const batch = writeBatch(db);
    objectsToAdd.forEach(object => {
        const docRef = doc(collectionRef, object.title.toLowerCase());
        batch.set(docRef, object);
    });
    await batch.commit();
    console.log('done');
};

export const getCategoriesAndDocuments = async () => {
    const collectionRef = collection(db, 'categories');
    const q = query(collectionRef);
    const querySnapshot = await getDocs(q);
    const categoriesMap = querySnapshot.docs.reduce((acc, docSnapshot) => {
        const { title, items } = docSnapshot.data();
        acc[title.toLowerCase()] = items;
        return acc;
    }, {});
    return categoriesMap;
};

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider);
export const db = getFirestore();
export const createUserDocumentFormAuth = async (userAuth) => {
    if (!userAuth)
        return;

    const userDocRef = doc(db, 'users', userAuth.uid);
    const userSnapshot = await getDoc(userDocRef);
    if (!userSnapshot.exists()) {
        const { displayName, email } = userAuth;
        var createdAt = new Date();
        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt
            })
        } catch (error) {
            console.log('error creating the user', error.message);
        }
    }

    return userDocRef;
}

export const createUserByEmailAndPassword = async (email, password) => {
    if (!email || !password)
        return;
    var res = await createUserWithEmailAndPassword(auth, email, password);
    return res;
}

export const signInUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password)
        return;
    var res = await signInWithEmailAndPassword(auth, email, password);
    return res;
}

export const signOutUser = async () => await signOut(auth);

export const onAuthUserStateChanged = (callback) => onAuthStateChanged(auth, callback);