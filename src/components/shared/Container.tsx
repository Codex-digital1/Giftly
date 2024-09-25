import React, { FC } from 'react';

interface ContainerProps {
  children: React.ReactNode; // Allow children to be passed
}

const Container: FC<ContainerProps> = ({ children }) => {
  return (
    <div className='w-full mx-auto  xl:px-20 md:px-10 sm:px-2 px-4'>
      {children}
    </div>
  );
};

export default Container;
