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
  giftImage: any; // This is an array of strings (image URLs)
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
  sheduleDate: string;
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
    product_image: any;
    product_name: string;
    total_amount: number;
    tran_id: string;
    updatedAt: string;
    userEmail: string;
    userName: string;
    userPhone: string;
    sheduleDate: string;
    isShedule: string;
  };
};







