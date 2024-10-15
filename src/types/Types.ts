import React from "react";

export type myContainerProps = {
  children: React.ReactNode;
};

export type sectionHeadingProps = {
  title: string;
  subTitle?: string;
};

export type drawerPropsType = {
  drawerToggle: () => void,
  isOpenDrawer?: boolean
}

// interfaces/Gift.ts
export interface Gift {
  _id: string;
  giftName: string;
  store: string;
  brand: string;
  discount: number;
  price: number;
  rating: number;
<<<<<<< HEAD
  giftImage:any;  // This is an array of strings (image URLs)
=======
  giftImage:any;  
>>>>>>> 49bcf8670de6d2692220bfde38ca3c3c9f9be2b8
  productAddBy: string;
  description: string;
  size: string;
  color: string;
  type: string;
  category: string;
  availability: (boolean | string);
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
  giftImage: string;
  productAddBy: string;
  description: string;
  size?: string;
  color?: string;
  type?: string;
  category?: string;
  availability: boolean; 
  quantity?: number;
}

export type OrderTypes = {
  _id: string;
  createdAt: string;
  order_status: string;
  payment_status: string;
  productId: string;
  product_brand: string;
  product_image: any;
  product_name: string;
  total_amount: number;
  tran_id: string;
  updatedAt: string;
  userEmail: string;
  userName: string;
  userPhone: string;
};

export type OrderTypesProps = {
  order: {
    _id: string;
    createdAt: string;
    order_status: string;
    payment_status: string;
    productId: string;
    product_brand: string;
    product_image: any;
    product_name: string;
    total_amount: number;
    tran_id: string;
    updatedAt: string;
    userEmail: string;
    userName: string;
    userPhone: string;
  };
};







