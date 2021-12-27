import { Asset } from "contentful";

export type BannerImage = {
  endDate: string;
  linkTo: string;
  linkUrl: string;
  mainImage: Asset;
  mobileImage: Asset;
};

export type MainCategories = {
  key_path: string;
  count: number;
  name: string;
  key: string;
}[];

export type ProductType = {
  uid: number;
  name: string;
  key: string;
  catalog_code: string;
  product_class: string;
  images: {
    original_url: string;
    display_order: number;
    caption: null | string;
  }[];
  brand_name: string;
  mpn: string;
  basic_unit: string;
  primary_image_url: null | string;
  price_before_discount: number;
  price: number;
  has_availability: boolean;
  stock_quantity: number;
  indent_quantity: number;
  stock_availability: string;
  indent_availability: string;
  price_list: [];
};
export type ProductsCategory = ProductType[];
