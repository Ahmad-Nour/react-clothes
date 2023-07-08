import { createContext, useState, useEffect } from "react";
import { onAuthUserStateChanged, createUserDocumentFormAuth } from "../utils/firebase/firebase.utils";

// actual value you want to access
export const UserContext = createContext({
    currentUser: null,
    setCurrentUser: () => null
});

export const UserProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const value = { currentUser, setCurrentUser };

    useEffect(() => {
        const unsubscribe = onAuthUserStateChanged(async (user) => {
            if (user)
                await createUserDocumentFormAuth(user);

            setCurrentUser(user);
        });

        return unsubscribe;
    }, []);

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>
};
