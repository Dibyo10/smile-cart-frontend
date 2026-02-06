import { useEffect, useState } from "react";

import productsApi from "apis/products";
import useDebounce from "hooks/useDebounce";
import { Search } from "neetoicons";
import { Input, NoData, Spinner, Typography } from "neetoui";
import { isEmpty } from "ramda";

import ProductListItem from "./ProductListItem";

import Header from "../commons/Header";

/* eslint-disable no-unused-vars */
const ProductList = () => {
  const [searchKey, setSearchKey] = useState("");
  const debouncedSearchKey = useDebounce(searchKey);
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const data = await productsApi.fetch({ searchTerm: debouncedSearchKey });
      setProducts(data.products);
    } catch (error) {
      console.log("An error occurred:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [debouncedSearchKey]);

  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="flex h-screen flex-col">
      <Header
        shouldShowBackButton={false}
        title="Smile cart"
        actionBlock={
          <Input
            placeholder="Search products"
            prefix={<Search />}
            type="search"
            value={searchKey}
            onChange={event => setSearchKey(event.target.value)}
          />
        }
      />
      <div className="flex flex-col">
        <div className="m-2">
          <Typography className="mx-6 mb-2 mt-6" style="h1" weight="semibold">
            Smile Cart
          </Typography>
          <hr className="neeto-ui-bg-black h-1" />
        </div>
        {isEmpty(products) ? (
          <NoData className="h-full w-full" title="No products to show" />
        ) : (
          <div className="grid grid-cols-2 justify-items-center gap-y-8 p-4 md:grid-cols-3 lg:grid-cols-4">
            {products.map(product => (
              <ProductListItem key={product.slug} {...product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductList;
