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
import toast from "react-hot-toast";
import auth from "../Firebase/Firebase.config";
import axios from "axios";

// Define GiftType
type GiftType = {
  _id: string;
  giftName: string;
  store: string;
  brand: string;
  discount: number;
  price: number;
  rating: number;
  giftImage: string;
  productAddBy: string;
  description: string;
  size: string;
  color: string;
  type: string;
  category: string;
  availability: boolean;
  quantity: number;
};

// Define AuthContextType
interface AuthContextType {
  user: User | null;
  loading: boolean;
  setLoading: (loading: boolean) => void;
  login: (email: string, password: string) => Promise<UserCredential>;
  createUser: (email: string, password: string) => Promise<UserCredential>;
  googleLogin: () => Promise<UserCredential>;
  logOut: () => Promise<void>;
  updateUserProfile: (name: string, photoURL: string, phoneNumber: string, email: string) => Promise<void>;
  setUser: (user: User | null) => void;
  gifts?: GiftType[];
  allGifts?: GiftType[];
  cart: GiftType[];
  addToCart: (gift: GiftType) => void;
  addToWishlist: (gift: GiftType) => void;
  wishlist: GiftType[];
  removeToWishlist: (gift: GiftType) => void;
  removeToCart: (gift: GiftType) => void;
  handleFilterChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  filters: {
    category: string;
    priceMin: number;
    priceMax: number;
    rating: number;
    availability: string;
    sortBy: string;
    search: string;
  };
}

export const AuthContext = createContext<AuthContextType | null>(null);

interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const provider = new GoogleAuthProvider();
  const [gifts, setGifts] = useState<GiftType[]>([]);
  const [allGifts, setAllGifts] = useState<GiftType[]>([]);

  const [cart, setCart] = useState<GiftType[]>(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const [wishlist, setWishlist] = useState<GiftType[]>(() => {
    const savedWishlist = localStorage.getItem("wishlist");
    return savedWishlist ? JSON.parse(savedWishlist) : [];
  });

  const [filters, setFilters] = useState({
    category: '',
    priceMin: 0,
    priceMax: 5000,
    rating: 0,
    availability: 'all',
    sortBy: '',
    search: ''
  });

  const createUser = async (email: string, password: string): Promise<UserCredential> => {
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

  const login = async (email: string, password: string): Promise<UserCredential> => {
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

  const googleLogin = async (): Promise<UserCredential> => {
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, provider);
      toast.success("Login Successfully");
      return result;
    } catch (error: any) {
      toast.error(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const updateUserProfile = async (name: string, photoURL: string, phoneNumber: string, email: string) => {
    if (auth.currentUser) {
      try {
        await updateProfile(auth.currentUser, { displayName: name, photoURL, phoneNumber, email });
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

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const { data } = await axios.get("http://localhost:3000/getAllGift");
        setGifts(data.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    })();
  }, [filters]);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const { data } = await axios.get("http://localhost:3000/getAllGift", { params: filters });
        setAllGifts(data.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    })();
  }, [filters]);

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    e.preventDefault();
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const addToCart = (gift: GiftType) => {
    const isExist = cart.find((item) => item._id === gift._id);
    if (isExist) {
      return toast.error("Already Added");
    }
    setCart((prevCart) => {
      const updatedCart = [...prevCart, gift];
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      return updatedCart;
    });
    toast.success(`${gift.giftName} added to cart successfully`);
  };

  const addToWishlist = (gift: GiftType) => {
    const isExist = wishlist.find((item) => item._id === gift._id);
    if (isExist) {
      return toast.error("Already Added");
    }
    setWishlist((prevWishlist) => {
      const updatedWishlist = [...prevWishlist, gift];
      localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
      return updatedWishlist;
    });
    toast.success(`${gift.giftName} added to Wishlist successfully`);
  };

  const removeToWishlist = (gift: GiftType) => {
    const updatedWishlist = wishlist.filter((item) => item._id !== gift._id);
    setWishlist(updatedWishlist);
    localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
    toast.error(`${gift.giftName} removed from Wishlist successfully`);
  };

  const removeToCart = (gift: GiftType) => {
    const updatedCart = cart.filter((item) => item._id !== gift._id);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    toast.error(`${gift.giftName} removed from Cart successfully`);
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
    allGifts,
    cart,
    addToCart,
    addToWishlist,
    wishlist,
    removeToWishlist,
    removeToCart,
    handleFilterChange,
    filters,
  };

  return (
    <AuthContext.Provider value={authInfo}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
