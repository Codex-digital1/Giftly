import CartItem from "../../components/cart/CartItem";
import PriceDetails from "../../components/cart/PriceDetails";
import MyContainer from "../../components/shared/MyContainer";
import SectionHeading from "../../components/shared/SectionHeading";

const Cart = () => {
    return (
        <div>
        <MyContainer>
         <SectionHeading title="My Cart List"/>
         {/* Cart Item */}
             <CartItem/>
             {/* Price Details */}
             <PriceDetails/>
         </MyContainer> 
     </div>
    );
};

export default Cart;