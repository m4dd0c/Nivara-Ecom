import "../globals.css";
import PeopleLoves from "$/components/home/PeopleLoves";
import Hero from "$/components/home/Hero";
import MainTypes from "$/components/home/MainTypes";
import NewArrivals from "$/components/home/NewArrivals";
import TrendingCollection from "$/components/home/TrendingCollection";
import Seasonals from "$/components/home/Seasonals";
import WinterCollection from "$/components/home/WinterCollection";
import HomeBanner from "$/components/home/HomeBanner";

const HomePage = () => {
  return (
    <>
      <Hero />
      <MainTypes />
      <NewArrivals />
      <TrendingCollection />
      <HomeBanner type="most-sold" />
      <Seasonals />
      <WinterCollection />
      {/* <SlidingBanners /> keep this comment */}
      <HomeBanner type="popular" />
      <PeopleLoves />
    </>
  );
};

export default HomePage;
