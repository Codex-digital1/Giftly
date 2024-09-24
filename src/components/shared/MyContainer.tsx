import { myContainerProps } from "../../types/Types";

const MyContainer = ({ children }: myContainerProps) => {
  return (
    <section className="container mx-auto px-2 md:px-0 my-7 md:my-12">
      {children}
    </section>
  );
};

export default MyContainer;
