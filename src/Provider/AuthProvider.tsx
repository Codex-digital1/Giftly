import { GoogleAuthProvider, UserCredential, sendPasswordResetEmail } from "firebase/auth";
import {User} from '../../src/types/Types'
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
import { FetchNextPageOptions, InfiniteData, InfiniteQueryObserverResult, QueryObserverResult, RefetchOptions, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useInfiniteQuery } from "@tanstack/react-query";
// Define GiftType
type GiftType = {
  _id: string;
  giftName: string;
  store: string;
  brand: string;
  discount: number;
  price: number;
  rating: number;
  giftImage: any;
  productAddBy: string;
  description: string;
  size: string;
  color: string;
  type: string;
  category: string;
  availability: (boolean | string);
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
    // tran_id: string | null;
    // ReviewerName: string | null;
    // ReviewerProfileImage: string | null;
    reviewedAt: Date | null;
    _id: string | null;
  };
};

interface CurrentUser {
  _id: string;
  email: string;
  name: string;
  profileImage?: string;
  role?: string;
  phoneNumber?: string;
  address?: {
    street?: string;
    city?: string;
    state?: string;
    zipCode?: string;
    country?: string;
  };
  chat: {
    sender: string;
    receiver: string;
  };

}


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
  refetch: (options?: RefetchOptions) => Promise<QueryObserverResult<any, Error>>;
  logOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  updateUserProfile: (name: string, photoURL: string) => Promise<void>;
  setUser: (user: User | null) => void;
  gifts?: GiftType[];
  allGifts?: GiftType[];
  isFetchingNextPage?: boolean;
  hasNextPage?: boolean;
  fetchNextPage?: (options?: FetchNextPageOptions) => 
    Promise<InfiniteQueryObserverResult<InfiniteData<any, unknown>, Error>>;
  allGifts1?: GiftType[];
  cart: GiftType[];
  addToCart: (gift: GiftType) => void;
  addToWishlist: (gift: GiftType) => void;
  wishlist: GiftType[];
  removeToWishlist: (gift: GiftType) => void;
  removeToCart: (gift: GiftType) => void;
  handleSearchChange: (searchValue:string) => void;
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

  // chat feature >>>
  getReceiverData: ((receiverName: string) => Promise<void>) | undefined
  currentUser: CurrentUser | null;
  setCurrentUser: (user: CurrentUser | null) => void;
  receiverInfo: CurrentUser | null
  sender: string | null
  receiver: string | null
  setSender: React.Dispatch<React.SetStateAction<string | null>>
  setReceiver: React.Dispatch<React.SetStateAction<string | null>>
  updateReceiverName: ((receiverName: string) => Promise<void>) | undefined
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
  // const [currentUser, setCurrentUser] = useState(null);
  // chat feature >>>
  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null);
  const [sender, setSender] = useState<string | null>(null);
  const [receiver, setReceiver] = useState<string | null>(null);
  const [receiverInfo, setReceiverInfo] = useState<CurrentUser | null>(null)
 

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
    priceMax: 5000000,
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
    if (auth?.currentUser) {
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
  // Get token from server
  const getToken = async (email:string) => {
    try {
      const { data } = await axiosPublic.post(
        `/jwt`,
        { email },
        { withCredentials: true }
      )
      console.log(data);
      return data
    } catch (error) {
      console.log(error);
    }
  }
 


  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        getToken(user?.email ?? '')
        setUser((prevUser) => {
          if (!prevUser) return null; // Handle case where there is no previous user
        
          return {
            ...prevUser,
            phoneNumber: prevUser.phoneNumber ?? undefined, // Convert null to undefined
            emailVerified: true,
            isAnonymous: false,
          };
        });
        setTimeout(() => {
          saveUser(user);
          getAUser(user?.email ?? "")
        }, 2000);
        // getToken(currentUser.email)
      }
      setLoading(false);
    });
    return () => {
      unSubscribe();
    };
  }, []);


    const getAUser=async(email:string)=>{
      setLoading(true);
    
      await axiosPublic.get(`/getAUser/${email}`)
      .then(response => {
        // console.log(response.data.data);
        setUser(prev => ({ ...prev, ...response?.data?.data })); 
    setLoading(false);

// console.log(user);
      })
      .catch(error => {
        console.error('There was an error!', error);
      });
    }
  

  
  const logOut = async () => {
    setLoading(true)
    try{
      await axiosPublic(`/logout`, {
        withCredentials: true,
      }).then(response => {
        console.log(response.data);
    })
      setUser(null)
      toast.success("Logout successful");
      return await signOut(auth)
    }catch(err:any){
      toast.error(err?.message || '');
      console.log(err);
    }finally {
      setLoading(false);
    }
    
   
  }


  const resetPassword = (email:string) => {
    return sendPasswordResetEmail(auth, email)
  }

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

  // get current user by email
  const getSingleUser = async () => {
    try {
      setLoading?.(true);
      const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/user/getUser/${user?.email}`, { method: 'GET' });
      if (response.ok) {
        const currentGetUser = await response.json();
        setCurrentUser(currentGetUser);
        setLoading?.(false);
      } else {
        console.log('Failed to fetch user data');
      }
    } catch (error) {
      console.error('Error fetching user:', error);
    }finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (user?.email) {
      getSingleUser();
    }
  }, [user?.email]);


  const { data: allGifts1, refetch } = useQuery({
    queryKey: ['all-gift'],
    queryFn: async () => {
      try {
        setLoading(true);
        const { data } = await axiosPublic.get("/getAllGift")
        return data?.data

      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
  })
  // console.log(allGifts1);p
 
  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const { data } = await axiosPublic.get("/getAllGiftForHome",);
        setGifts(data?.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // Define the API response structure
interface GiftsResponse {
  data: GiftType[];
}
// Define the filters type
interface Filters {
  category?: string;
  priceMin?: number;
  priceMax?: number;
  rating?: number;
  availability?: string;
  sortBy?: string;
  search?: string;
}
// Fetch function for infinite query
const fetchGifts = async ({
  pageParam = 1,
  queryKey,
}: {
  pageParam?: number;
  queryKey: [string, Filters];
}): Promise<GiftsResponse> => {
  const [, filters] = queryKey; // Extract filters from queryKey
  const response = await axiosPublic.get<GiftsResponse>("/getAllGift", {
    params: { ...filters, page: pageParam, limit: 12 },
  });
  return response.data;
};
 // Update the way useInfiniteQuery is called (object form)
 const {
  data: fetchGifts12,
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
} = useInfiniteQuery<GiftsResponse>({
  queryKey: ["gifts", filters],
  // @ts-ignore
  queryFn: fetchGifts ,
  getNextPageParam: (lastPage, allPages) => {
    const currentPage = allPages.length;
    return lastPage.data.length > 0 ? currentPage + 1 : undefined;
  },
});
useEffect(()=>{
  // @ts-ignore
  setAllGifts(fetchGifts12?.pages.flatMap((page) => page?.data) || []);
},[fetchGifts12])

  

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

      if (axiosError?.response) {
        const errorData = axiosError?.response?.data as { message: string }
        if (axiosError?.response?.status === 404) {
          toast.error(errorData.message || "No order found");
        } else {
          toast.error("Something went wrong. Please try again later.");
        }
      }

      console.log(axiosError);
    }
  };


  // <<<--------chat feature-------->>>

  // Function to get the current  receiver data
  const getReceiverData = async (receiverName: string) => {

 
    try {

      const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/user/getReceiver/${receiverName}`, { method: 'GET', });


      if (res?.ok) {
        const getCurrentReceiver = await res.json();
 
        setReceiverInfo(getCurrentReceiver);

      } else {
        console.log('Failed to get current receiver');
      }
    } catch (error) {
      console.error('Error updating receiver:', error);
    }
  };

  const updateReceiverName = async (receiverName: string): Promise<void> => {
    try {
      const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/user/updateReceiver/${currentUser?._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ receiver: receiverName }),
      });

      if (response.ok) {
        const updatedUser = await response.json();
 
        setCurrentUser(updatedUser);
        setSender(updatedUser?.chat.sender)
        setReceiver(updatedUser?.chat.receiver)
      } else {
        console.log('Failed to update receiver');
      }
    } catch (error) {
      console.error('Error updating receiver:', error);
    }
  };


  // console.log(309, giftOrderCheck)

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    e.preventDefault();
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleSearchChange = (searchValue:string) => {
    setFilters({ ...filters, search: searchValue });
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


  // auth-info
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
    // all gift page
    allGifts,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    allGifts1,
    refetch,
    cart,
    addToCart,
    addToWishlist,
    wishlist,
    removeToWishlist,
    removeToCart,
    handleFilterChange,
    handleSearchChange,
    filters,
    allUser,
    getData,
    resetPassword,

    // Add the ordered gift and review logic
    myReviewItem,
    orderCheck,
    giftOrderCheck,
    isModalVisible,
    setIsModalVisible,
    myAllReview,

    // get current user by email
    currentUser,
    setCurrentUser,

    // chat feature >>>
    getReceiverData,
    receiverInfo,
    sender,
    receiver,
    setSender,
    setReceiver,
    updateReceiverName

  };

  return (
    <AuthContext.Provider value={authInfo}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
