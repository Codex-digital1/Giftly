import React from "react";

export type myContainerProps = {
  children: React.ReactNode;
};

export type sectionHeadingProps = {
  title: string;
  subTitle?: string;
};

// export type drawerPropsType = {
//   drawerToggle: () => void,
//   isOpenDrawer?: boolean
// }

// interfaces/Gift.ts
export interface Gift {
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
  availability: boolean | string;
  quantity: number;
}

export interface GiftType {
  _id: string;
  giftName: string;
  store: string;
  brand: string;
  discount: number;
  price: number;
  rating: number;
  giftImage: [string];
  productAddBy: string;
  description: string;
  size?: string;
  color?: string;
  type?: string;
  category?: string;
  availability: string | boolean; 
  quantity?: number;
}

export type OrderTypes = {
  _id: string;
  createdAt: string;
  order_status: string;
  payment_status: string;
  productId: string;
  product_brand: string;
  product_image: [string];
  product_name: string;
  total_amount: number;
  tran_id: string;
  updatedAt: string;
  userEmail: string;
  userName: string;
  userPhone: string;
  scheduleDate: string;
  isShedule: string;
};

export type OrderTypesProps = {
  order: {
    _id: string;
    createdAt: string;
    order_status: string;
    payment_status: string;
    productId: string;
    product_brand: string;
    product_image: [string];
    product_name: string;
    total_amount: number;
    tran_id: string;
    updatedAt: string;
    userEmail: string;
    userName: string;
    userPhone: string;
    scheduleDate: string;
    isShedule: string;
  };
};

interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

interface Chat {
  sender: string;
  receiver: string;
}
export declare interface UserMetadata {
  /** Time the user was created. */
  readonly creationTime?: string;
  /** Time the user last signed in. */
  readonly lastSignInTime?: string;
}
export declare interface UserInfo {
  /**
   * The display name of the user.
   */
  readonly displayName: string | undefined | null ;
  /**
   * The email of the user.
   */
  readonly email: string | null;
  /**
   * The phone number normalized based on the E.164 standard (e.g. +16505550101) for the
   * user.
   *
   * @remarks
   * This is null if the user has no phone credential linked to the account.
   */
  readonly phoneNumber?: string | undefined | null;
  /**
   * The profile photo URL of the user.
   */
  readonly photoURL: string | undefined | null;
  /**
   * The provider used to authenticate the user.
   */
  readonly providerId: string;
  /**
   * The user's unique ID, scoped to the project.
   */
  readonly uid: string;
}
export declare interface Feedback {
  rating: number 
  comment: string 
  _id: string 
  ReviewerName: string; 
  ReviewerProfileImage: string 
  reviewedAt: Date
  ReviewId:string 
}

export interface User extends UserInfo {
  readonly emailVerified: boolean;
  readonly isAnonymous: boolean;
  readonly metadata: UserMetadata;
  readonly providerData: UserInfo[];
  readonly refreshToken: string;
  readonly tenantId: string | null;

  // Optional: Add `?` to avoid undefined issues (if necessary).
  _id?: string;
  name?: string;
  role?: string;
  profileImage?: string;
  phoneNumber?: string;
  address?: Address;
  chat?: Chat;
  createdAt?: string;
  __v?: number;

  auth?: any;
  proactiveRefresh?: any;
  reloadListener?: (() => void) | null;
  reloadUserInfo?: any;
  stsTokenManager?: any;
  accessToken?: string;

  delete(): Promise<void>;
  getIdToken(forceRefresh?: boolean): Promise<string>;
  getIdTokenResult(forceRefresh?: boolean): Promise<IdTokenResult>;
  reload(): Promise<void>;
  toJSON(): object;
}


export declare interface IdTokenResult {
  /**
   * The authentication time formatted as a UTC string.
   *
   * @remarks
   * This is the time the user authenticated (signed in) and not the time the token was refreshed.
   */
  authTime: string;
  /** The ID token expiration time formatted as a UTC string. */
  expirationTime: string;
  /** The ID token issuance time formatted as a UTC string. */
  issuedAtTime: string;
  /**
   * The sign-in provider through which the ID token was obtained (anonymous, custom, phone,
   * password, etc).
   *
   * @remarks
   * Note, this does not map to provider IDs.
   */
  signInProvider: string | null;
  /**
   * The type of second factor associated with this session, provided the user was multi-factor
   * authenticated (eg. phone, etc).
   */
  signInSecondFactor: string | null;
  /** The Firebase Auth ID token JWT string. */
  token: string;
  /**
   * The entire payload claims of the ID token including the standard reserved claims as well as
   * the custom claims.
   */
  claims: ParsedToken;
}


export declare interface ParsedToken {
  /** Expiration time of the token. */
  'exp'?: string;
  /** UID of the user. */
  'sub'?: string;
  /** Time at which authentication was performed. */
  'auth_time'?: string;
  /** Issuance time of the token. */
  'iat'?: string;
  /** Firebase specific claims, containing the provider(s) used to authenticate the user. */
  'firebase'?: {
      'sign_in_provider'?: string;
      'sign_in_second_factor'?: string;
      'identities'?: Record<string, string>;
  };
  /** Map of any additional custom claims. */
  [key: string]: unknown;
}



// manage reviews for testimonial
// types/ReviewTypes.ts

export interface Review {
  ReviewerName: string | null;
  ReviewerProfileImage: string | null;
  comment: string | null;
  rating: number | null;
  reviewedAt: string | null;
}

export interface OrderInfo {
  _id: string;
  createdAt: string;
  isShedule: boolean;
  order_status: string;
  payment_status: string;
  productId: string;
  product_brand: string;
  product_image: string[];
  product_name: string;
  review: Review;
  scheduleDate: string | null;
  sheduleDate: string;
  total_amount: number;
  tran_id: string;
  updatedAt: string;
  userEmail: string;
  userName: string;
  userPhone: string;
}



export interface TOrder {
  _id: string;
  tran_id: string;
  productIds: string[];
  userName: string;
  userEmail: string;
  userPhone: string;
  total_amount: number;
  payment_status: string;
  order_status: string;
  isShedule: boolean;
  scheduleDate: string; // ISO string
  wrap: string;
  message: string;
  createdAt: string;
  updatedAt: string;
  productDetails?: TProductDetail[];
  productReviews?: TProductReview[];
}

export interface TProductDetail {
  _id: string;
  giftName: string;
  store: string;
  brand: string;
  discount: number;
  price: number;
  rating: number;
  giftImage: string[];
  productAddBy: string;
  description: string;
  size: string;
  color: string;
  type: string;
  category: string;
  availability: string;
  quantity: number;
  createdAt: string;
  updatedAt: string;
}

export interface TProductReview {
  _id: string;
  productId: string;
  userEmail: string;
  ReviewerName: string;
  ReviewerProfileImage: string;
  review: {
    rating: number;
    comment: string;
    reviewedAt: string;
  };
  createdAt: string;
  updatedAt: string;
}

