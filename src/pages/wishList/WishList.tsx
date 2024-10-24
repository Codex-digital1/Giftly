import { Helmet } from "react-helmet-async";
import MyContainer from "../../components/shared/MyContainer";
import WishListItem from "../../components/wishLists/WishListItem";

const WishList = () => {
    return (
        <div>
             <Helmet>
                <title>Giftly-WishList</title>
            </Helmet>
           <MyContainer>
            <div >
                <WishListItem/>
            </div>
            </MyContainer> 
        </div>
    );
};

export default WishList;