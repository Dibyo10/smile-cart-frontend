/* eslint-disable */
import { useEffect, useState } from "react";

import productsApi from "apis/products";
import { Typography, Spinner } from "neetoui";
import { LeftArrow } from "neetoicons";
import { isNotNil, prepend } from "ramda";
import { useParams, useHistory } from "react-router-dom";

import Carousel from "./Carousel";
import PageNotFound from "../commons/PageNotFound";
import Header from "../commons/Header";
import AddToCart from "components/commons/AddToCart";
import useSelectedQuantity from "hooks/useSelectedQuantity";

const Product = () => {
  const history = useHistory();
  const [isError, setIsError] = useState(false);
  const [product, setProduct] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const { slug } = useParams();
  const { selectedQuantity, setSelectedQuantity } = useSelectedQuantity(slug);

  const fetchProduct = async () => {
    try {
      const response = await productsApi.show(slug);
      setProduct(response);
    } catch {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  if (isError) return <PageNotFound />;

  useEffect(() => {
    fetchProduct();
  }, []);

  const {
    name,
    description,
    mrp,
    offerPrice,
    imageUrls,
    imageUrl,
    availableQuantity,
  } = product;

  const totalDiscounts = mrp && offerPrice ? mrp - offerPrice : 0;
  const discountPercentage =
    mrp && offerPrice ? ((totalDiscounts / mrp) * 100).toFixed(1) : 0;

  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Spinner />
      </div>
    );
  }

  return (
    <>
      <Header title={name} />
      <div className="mt-6 flex gap-4 px-6 pb-6">
        <div className="flex w-2/5 justify-center">
          {isNotNil(imageUrls) ? (
            <Carousel imageUrls={prepend(imageUrl, imageUrls)} title={name} />
          ) : (
            <img alt={name} className="w-48" src={imageUrl} />
          )}
        </div>
        <div className="w-3/5 space-y-4">
          <Typography>{description}</Typography>
          <Typography>MRP: ${mrp}</Typography>
          <Typography className="font-semibold">
            Offer price: ${offerPrice}
          </Typography>
          <Typography className="font-semibold text-green-600">
            {discountPercentage}% off
          </Typography>
          <div className="flex space-x-10">
            <AddToCart {...{ availableQuantity, slug }} />
            <Button
              className="bg-neutral-800 hover:bg-neutral-950"
              label="Buy now"
              size="large"
              to={routes.checkout}
              onClick={() => setSelectedQuantity(selectedQuantity || 1)}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Product;
