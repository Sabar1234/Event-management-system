import React from "react";
import Header from "../constants/Header";
import Carousel from "../layout/carousel";
import ProductsContainer from "../constants/ProductsContainer";
import Footer from "../constants/Footer";

const Home = () => {
  return (
    <>
      <Header />
      <Carousel />
      <ProductsContainer heading={"Recommended Events"} seeAll={"See All"} />
      <Footer/>
    </>
  );
};

export default Home;
