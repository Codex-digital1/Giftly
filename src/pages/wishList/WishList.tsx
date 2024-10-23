import { Helmet } from "react-helmet-async";
import MyContainer from "../../components/shared/MyContainer";
import SectionHeading from "../../components/shared/SectionHeading";
import WishListItem from "../../components/wishLists/WishListItem";

const WishList = () => {
    return (
        <div>
            <Helmet>
                <title>Giftly | WishList</title>
            </Helmet>
            <MyContainer>
                <SectionHeading title="WishList" />
                <div >
                    <WishListItem />
                </div>
            </MyContainer>
        </div>
    );
};

export default WishList;