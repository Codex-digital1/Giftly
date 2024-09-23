import React from "react";

export type myContainerProps = {
  children: React.ReactNode;
};

export type sectionHeadingProps = {
  title: string;
  subTitle?: string;
};

export type drawerPropsType ={
  drawerToggle: ()=> void,
   isOpenDrawer?: boolean
}
