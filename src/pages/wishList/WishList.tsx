import MyContainer from "../../components/shared/MyContainer";
import SectionHeading from "../../components/shared/SectionHeading";
import WishListItem from "../../components/wishLists/WishListItem";

const WishList = () => {
    return (
        <div>
           <MyContainer>
            <SectionHeading title="WishList"/>
            <div >
                <WishListItem/>
            </div>
            </MyContainer> 
        </div>
    );
};

export default WishList;