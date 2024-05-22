import React from "react";
import { useLocation } from "react-router-dom";
import "./resultpage.css";
const SearchResultsPage = () => {
  // Access the location object to retrieve query parameters
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  // Extract individual query parameters
  const festivalName = searchParams.get("festival_name");
  const item = searchParams.get("item");
  const description = searchParams.get("description");
  const imgurl = searchParams.get("imgurl");

  return (
    <div class="product-container">
      <div class="product-image">
        <img
          src="https://coreldrawdesign.com/resources/previews/preview-diwali-diya-lamps-lit-with-bokeh-background-diwali-celebration-1698666636.jpg "
          alt="Product Image"
        />
      </div>
      <div class="product-details">
        <p class="product-details_id">
          {festivalName} <span id="festivalName"></span>
        </p>
        <p class="">
          {item} <span id="item"></span>
        </p>
        <p class="">
          {description} <span id="description"></span>
        </p >
        <span class="price">$100</span>

        <button class="add-to-cart">ADD TO CART</button>
      </div>
    </div>
  );
};

export default SearchResultsPage;
