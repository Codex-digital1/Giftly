import { GoogleAuthProvider, UserCredential, User } from "firebase/auth";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, onAuthStateChanged, signOut, updateProfile } from "firebase/auth";
import { createContext, useEffect, useState, ReactNode } from "react";
import { toast } from "react-toastify";
import auth from '../Firebase/Firebase.config';


interface AuthContextType {
    user: User | null;
    loading: boolean;
    setLoading: (loading: boolean) => void;
    login: (email: string, password: string) => Promise<UserCredential>;
    createUser: (email: string, password: string) => Promise<UserCredential>;
    googleLogin: () => Promise<UserCredential>;
    logOut: () => Promise<void>;
    updateUserProfile: (name: string, photoURL: string) => Promise<void>;
    setUser: (user: User | null) => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);

interface AuthProviderProps {
    children: ReactNode;
}

// Initialize Firebase app
const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const provider = new GoogleAuthProvider();

    const createUser = async (email: string, password: string) => {
        setLoading(true);
        try {
            return await createUserWithEmailAndPassword(auth, email, password);
        } catch (error: any) {
            toast.error(error.message);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const login = async (email: string, password: string) => {
        setLoading(true);
        try {
            return await signInWithEmailAndPassword(auth, email, password);
        } catch (error: any) {
            toast.error(error.message);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const googleLogin = async () => {
        setLoading(true);
        try {
            return await signInWithPopup(auth, provider);
        } catch (error: any) {
            toast.error(error.message);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const updateUserProfile = async (name: string, photoURL: string,) => {
        if (auth.currentUser) {
          try {
            await updateProfile(auth.currentUser, { displayName: name, photoURL: photoURL});
            toast.success('Profile updated successfully!');
          } catch (error: any) {
            toast.error("Failed to update profile: " + error.message);
          }
        } else {
          toast.error("User not authenticated.");
        }
      };
    

    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user);
            setLoading(false);
        });
        return () => {
            unSubscribe();
        };
    }, []);

    const logOut = async () => {
        setLoading(true);
        try {
            await signOut(auth);
            toast.success("Logout successful");
        } catch (error: any) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    const authInfo: AuthContextType = {
        user,
        loading,
        setLoading,
        login,
        createUser,
        googleLogin,
        setUser,
        logOut,
        updateUserProfile,
    };

 

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
