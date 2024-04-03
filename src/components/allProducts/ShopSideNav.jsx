import React from "react";
import Brand from "./shopBy/Brand";
import Category from "./shopBy/Category";
import Color from "./shopBy/Color";
import Price from "./shopBy/Price";

const ShopSideNav = (props) => {
  return (
    <div className="w-full flex  md:flex-col flex-row gap-6 ">
      <Category icons={true} />
      {/* <Brand />
      <Color /> */}
      <Price />
    </div>
  );
};

export default ShopSideNav;
