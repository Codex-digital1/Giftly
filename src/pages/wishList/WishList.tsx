import { Helmet } from "react-helmet-async";
import WishListItem from "../../components/wishLists/WishListItem";

const WishList = () => {
    return (
        <div>
             <Helmet>
                <title>Giftly-WishList</title>
            </Helmet>
                <WishListItem/>
        </div>
    );
};

export default WishList;