import { Asset, ContentfulCollection, Entry, Field } from "contentful";

import { MainImageType } from "interfaces";

export type BannerImage = {
  endDate: string;
  linkTo: string;
  linkUrl: string;
  mainImage: Asset;
  mobileImage: Asset;
};

export const homeBanner: ContentfulCollection<Entry<string>> = {
  items: [],
};
