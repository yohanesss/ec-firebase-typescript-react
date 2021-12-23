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
