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
  giftName: string;
  _id: string;
  price: number;
  availability: string;
  giftImage?: string[];
  description?: string;
  store: string,
  brand: string,
  discount: number,
  rating: number,
  productAddBy: string,
  size: string,
  color: string,
  type: string,
  category: string,
  quantity: number
}
export interface GiftType {
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
  size?: string;
  color?: string;
  type?: string;
  category?: string;
  availability: string; 
  quantity?: number;
}




