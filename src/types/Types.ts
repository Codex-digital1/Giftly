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
  giftImage:any;  // This is an array of strings (image URLs)
  productAddBy: string;
  description: string;
  size: string;
  color: string;
  type: string;
  category: string;
  availability: boolean;
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




