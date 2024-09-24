import { sectionHeadingProps } from "../../types/Types";

const SectionHeading = ({ title, subTitle }: sectionHeadingProps) => {
  return (
    <div className="text-center mb-6 md:mb-10">
      {/* This is Sub Heading */}
      <h5 className="text-primary text-center  font-light my-3 font-great-vibes text-3xl">{subTitle}</h5>
      <h2 className="font-medium text-3xl text-center uppercase text-[#333333]">{title}</h2>
    </div>
  );
};

export default SectionHeading;
