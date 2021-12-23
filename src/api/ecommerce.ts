import { MainCategories } from "../types";
import axios from "axios";

export const getCategories = async () => {
  const res = await axios.get(
    "https://yoh-ecommerce.herokuapp.com/product_classes"
  );
  console.log("[res.data]", res.data);
  return res.data as MainCategories;
};
