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
import _ from 'lodash';
import useAxiosPublic from "../Hooks/useAxiosPublic";
import { AxiosError } from "axios";

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

// Define OrderedGiftType
type OrderedGiftType = {
  _id: string;
  tran_id: string;
  product_name: string;
  product_brand: string;
  product_image: string[];
  userName: string;
  userEmail: string;
  userPhone: string;
  total_amount: number;
  order_status: string;
  payment_status: string;
  review: {
    rating: number | null;
    comment: string | null;
    reviewedAt: Date | null;
    _id: string | null;
  };
};
// Define AuthContextType
interface AuthContextType {
  user: User | null;
  allUser: any[];
  getData: any;
  loading: boolean;
  setLoading: (loading: boolean) => void;
  login: (email: string, password: string) => Promise<UserCredential>;
  createUser: (email: string, password: string) => Promise<UserCredential>;
  googleLogin: () => Promise<UserCredential>;
  logOut: () => Promise<void>;
  updateUserProfile: (name: string, photoURL: string) => Promise<void>;
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

  // ordered gift and review types
  myReviewItem: OrderedGiftType[];
  orderCheck: (id: string, mail: string) => Promise<void>;
  giftOrderCheck: OrderedGiftType | Record<string, never>;
  isModalVisible: boolean;
  setIsModalVisible: (visible: boolean) => void | undefined;
  myAllReview: (() => Promise<void> | undefined);
}

export const AuthContext = createContext<AuthContextType | null>(null);

interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const axiosPublic = useAxiosPublic()
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const provider = new GoogleAuthProvider();
  // get all user
  const [allUser, setAllUsers] = useState<any[]>([]);

  const [gifts, setGifts] = useState<GiftType[]>([]);
  const [allGifts, setAllGifts] = useState<GiftType[]>([]);

  // Define review and modal states
  const [myReviewItem, setMyReviewItem] = useState<OrderedGiftType[]>([]);
  const [giftOrderCheck, setGiftOrderCheck] = useState<OrderedGiftType | Record<string, never>>({});
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

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

  const updateUserProfile = async (name: string, photoURL: string) => {
    if (auth.currentUser) {
      try {
        await updateProfile(auth.currentUser, { displayName: name, photoURL: photoURL, });
        toast.success('Profile updated successfully!');
      } catch (error: any) {
        toast.error("Failed to update profile: " + error.message);
      }
    } else {
      toast.error("User not authenticated.");
    }
  };// save user
  const saveUser = async (user: any) => {
    const alternateImage = `https://picsum.photos/id/${_.random(1, 1000)}/200/300`;
    // console.log(user);
    const currentUser = {
      email: user?.email,
      name: user?.displayName || "Anonymous",
      profileImage: user?.photoURL || alternateImage,
      role: 'user',
      phoneNumber: user?.phoneNumber || '',
      address: {
        street: user?.street || '',
        city: user?.city || '',
        state: user?.state || '',
        zipCode: user?.zipCode || '',
        country: user?.country || '',
      },
      chat: {
        sender: user?.displayName || "Anonymous",
        receiver: "Admin"
      }
    }
    await axiosPublic.post('/users', currentUser)
      .then(response => {
        return (response.data);
      })
      .catch(error => {
        console.error('There was an error!', error);
      });

  }


  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        saveUser(user)
        setUser(user)
        // getToken(currentUser.email)
      }
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

  // Fetch all users
  const getData = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/user/getUsers`, { method: 'GET' });
      if (response.ok) {
        const users = await response.json();
        setAllUsers(users);
      } else {
        console.log('Failed to fetch users');
      }
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  useEffect(() => {
    getData();
  }, []);



  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const { data } = await axiosPublic.get("/getAllGift");
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
        const { data } = await axiosPublic.get("/getAllGift", { params: filters });
        setAllGifts(data.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    })();
  }, [filters]);

  // get review from order collection using user email
  const myAllReview = async () => {
    try {
      setLoading(true);
      const { data } = await axiosPublic.get(`/user/getReviewer/${user?.email}`);
      setMyReviewItem(data);

    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    myAllReview()
  }, [user?.email]);

  // Order check before review
  const orderCheck = async (id: string, mail: string) => {
    try {
      const { data } = await axiosPublic.get(`/${id}/${mail}`);
      if (data?.data?.tran_id) {
        setGiftOrderCheck(data.data);
        setIsModalVisible(true);
      } else {
        toast.error("No order found with this product ID and email");
      }
    } catch (error: any) {
      const axiosError = error as AxiosError;

      if(axiosError?.response){
           const errorData = axiosError?.response?.data as {message:string}
        if (axiosError?.response?.status === 404) {
          toast.error(errorData.message || "No order found");
        } else {
          toast.error("Something went wrong. Please try again later.");
        }
      }
      console.log(axiosError);
    }
  };


  // console.log(309, giftOrderCheck)

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

  // console.log("my review", myReviewItem)

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
    allUser,
    getData,

    // Add the ordered gift and review logic
    myReviewItem,
    orderCheck,
    giftOrderCheck,
    isModalVisible,
    setIsModalVisible,
    myAllReview
  };

  return (
    <AuthContext.Provider value={authInfo}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
