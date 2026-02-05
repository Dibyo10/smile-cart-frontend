import { useEffect, useState } from "react";

import productsApi from "apis/products";
import { Typography, Spinner } from "neetoui";
import { isNotNil, append } from "ramda";

import Carousel from "./Carousel";

const Product = () => {
  const [product, setProduct] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const fetchProduct = async () => {
    try {
      const product = await productsApi.show();
      setProduct(product);
    } catch (error) {
      console.error("Error fetching product data", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  const { name, description, mrp, offer_price, image_urls, image_url } =
    product;

  const totalDiscounts = mrp && offer_price ? mrp - offer_price : 0;
  const discountPercentage =
    mrp && offer_price ? ((totalDiscounts / mrp) * 100).toFixed(1) : 0;

  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="px-6 pb-6">
      <div>
        <Typography className="py-2 text-4xl font-semibold" style="h1">
          {name}
        </Typography>
        <hr className="border-2 border-black" />
      </div>
      <div className="mt-16 flex gap-4">
        <div className="flex w-2/5 justify-center">
          <div className="flex justify-center gap-16">
            {isNotNil(image_urls) ? (
              <Carousel
                imageUrls={append(image_url, image_urls)}
                title={name}
              />
            ) : (
              <img alt={name} className="w-48" src={image_url} />
            )}
          </div>
        </div>
        <div className="w-3/5 space-y-4">
          <Typography>{description}</Typography>
          <Typography>MRP: ${mrp}</Typography>
          <Typography className="font-semibold">
            Offer price: ${offer_price}
          </Typography>
          <Typography className="font-semibold text-green-600">
            {discountPercentage}% off
          </Typography>
        </div>
      </div>
    </div>
  );
};

export default Product;
