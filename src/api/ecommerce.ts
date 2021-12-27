import { ProductsCategory, ProductType } from "./../types";
import { MainCategories } from "../types";
import axios from "axios";

export const getCategories = async () => {
  const res = await axios.get(
    "https://yoh-ecommerce.herokuapp.com/product_classes"
  );
  return res.data as MainCategories;
};

export const getProductsCategory = async (
  key: string,
  page: number = 1,
  limit: number = 20
) => {
  const res = await axios.get(
    `https://yoh-ecommerce.herokuapp.com/products?product_class_like=${key}&_page=${page}&_limit=${limit}`
  );

  return res.data as ProductsCategory;
};

export const getProduct = async (uid: string) => {
  const res = await axios.get(
    `https://yoh-ecommerce.herokuapp.com/products?uid=${uid}`
  );
  return res.data[0] as ProductType;
};
