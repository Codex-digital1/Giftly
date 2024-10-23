import { Helmet } from "react-helmet-async";
import CartItem from "../../components/cart/CartItem";
import MyContainer from "../../components/shared/MyContainer";
import SectionHeading from "../../components/shared/SectionHeading";

const Cart = () => {
    return (
        <div>
            <Helmet>
                <title>Giftly | Cart</title>
            </Helmet>
            <MyContainer>
                <SectionHeading title="My Cart List" />
                {/* Cart Item */}
                <CartItem />
                {/* <PriceDetails/> */}
            </MyContainer>
        </div>
    );
};

export default Cart;