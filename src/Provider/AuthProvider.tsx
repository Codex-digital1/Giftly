import { GoogleAuthProvider, UserCredential, User } from "firebase/auth";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  onAuthStateChanged,
  signOut,
  updateProfile,
} from "firebase/auth";
import { createContext, useEffect, useState, ReactNode } from "react";
// import { toast } from "react-toastify";
import toast from "react-hot-toast";
import auth from "../Firebase/Firebase.config";
import axios from "axios";

interface AuthContextType {
    user: User | null;
    loading: boolean;
    setLoading: (loading: boolean) => void;
    login: (email: string, password: string) => Promise<UserCredential>;
    createUser: (email: string, password: string) => Promise<UserCredential>;
    googleLogin: () => Promise<UserCredential>;
    logOut: () => Promise<void>;
    updateUserProfile: (name: string) => Promise<void>;
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
  const [gifts, setGifts] = useState<GiftType[]>([]);

  const [cart, setCart] = useState<GiftType[]>(() => {
    // Load cart items from local storage on initial render
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const [wishlist, setWishlist] = useState<GiftType[]>(() => {
    // Load cart items from local storage on initial render
    const Wishlist = localStorage.getItem("wishlist");
    return Wishlist ? JSON.parse(Wishlist) : [];
  });

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
      await signInWithPopup(auth, provider);
      toast.success("Login Successfully");
    } catch (error: any) {
      toast.error(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

    const updateUserProfile = async (name: string, photoURL: string, phoneNumber:string, email: string) => {
        if (auth.currentUser) {
          try {
            await updateProfile(auth.currentUser, { displayName: name, photoURL: photoURL, phoneNumber:phoneNumber, email:email });
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
          setUser(user)
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
  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const { data } = await axios.get("http://localhost:3000/getAllGift");
        setGifts(data.data);
        // console.log(data.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  const addToCart = (gift: GiftType) => {
    const isExist = cart.find((item) => item._id === gift._id);
    if (isExist) {
      return toast.error("All Ready Added");
    }
    setCart((prevCart) => {
      const updatedCart = [...prevCart, gift];

      // Save updated cart to local storage
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      return updatedCart;
    });
    toast.success(`${gift?.giftName} add to cart successfully`);
  };

  const addToWishlist = (gift: GiftType) => {
    const isExist = wishlist.find((item) => item._id === gift._id);
    if (isExist) {
      return toast.error("All Ready Added");
    }
    setWishlist((prevWishlist) => {
      const updatedCart = [...prevWishlist, gift];

      // Save updated cart to local storage
      localStorage.setItem("wishlist", JSON.stringify(updatedCart));
      return updatedCart;
    });
    toast.success(`${gift?.giftName} add to Wishlist successfully`);
  };
  const removeToWishlist = (gift: GiftType) => {
    const updateWishlist = wishlist.filter((item) => item._id !== gift._id);
    setWishlist(() => {
      const updatedWishlist = [...updateWishlist];
      // Save updated cart to local storage
      localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
      return updatedWishlist;
    });
    toast.error(`${gift?.giftName} remove form Wishlist successfully`);
  };
  const removeToCart = (gift:object) => {
    console.log(gift);
    const updateCart = cart.filter((item) => item?._id !== gift?.id);
    setCart(() => {
      const updatedCart = [...updateCart];
      // Save updated cart to local storage
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      return updatedCart;
    });
    toast.error(`${gift?.giftName} remove form Wishlist successfully`);
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
    gifts,
    cart,
    addToCart,
    addToWishlist,
    wishlist,
    removeToWishlist,
    removeToCart

    
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
