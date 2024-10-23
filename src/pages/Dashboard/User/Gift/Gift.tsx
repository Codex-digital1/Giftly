import { Helmet } from "react-helmet-async"
import GiftList from "../../../../components/Dashboard/Gift/GiftList/GiftList"
import SectionHeading from "../../../../components/shared/SectionHeading"

const Gift = () => {
  return (
    <div>
       <Helmet>
        <title>Giftly | Manage-gift</title>
      </Helmet>
      <SectionHeading title="Gift List"/>
      <GiftList/>
    </div>
  )
}

export default Gift