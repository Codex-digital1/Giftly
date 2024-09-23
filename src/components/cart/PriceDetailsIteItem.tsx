import { FaBangladeshiTakaSign } from "react-icons/fa6";

const PriceDetailsIteItem = ({title, price}:{title:string, price:number}) => {
  return (
    <div className="border flex items-center justify-between px-6 py-4">
      <span>{title}</span>
      <p className="flex items-center font-bold">
        <span>{price}</span>
        <FaBangladeshiTakaSign className="text-sm" />
      </p>
    </div>
  );
};

export default PriceDetailsIteItem;
