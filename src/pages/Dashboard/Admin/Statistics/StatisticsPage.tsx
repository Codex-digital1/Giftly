import TopStatistic from "./TopStatistic";
import MidStatistic from "./MidStatistic";
import BottomStatistic from "./BottomStatistic";
import { Helmet } from "react-helmet-async";




const StatisticsPage = () => {

  return (
    <>
      <Helmet>
        <title>Giftly-Statistics</title>
      </Helmet>
      <TopStatistic></TopStatistic>
      <MidStatistic></MidStatistic>
      <BottomStatistic></BottomStatistic>
    </>
  );
};

export default StatisticsPage;
