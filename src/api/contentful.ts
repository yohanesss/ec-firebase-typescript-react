import * as contentful from "contentful";

declare var process: {
  env: {
    REACT_APP_CONTENTFUL_API_SPACE_ID: string;
    REACT_APP_CONTENTFUL_API_TOKEN: string;
  };
};

const MAIN_SLIDER_SYS_ID = "7vy7ccdSgwCS82QGa2Ae0i";

export const client = contentful.createClient({
  space: process.env.REACT_APP_CONTENTFUL_API_SPACE_ID,
  accessToken: process.env.REACT_APP_CONTENTFUL_API_TOKEN,
});

export const getMainBanner = async () => {
  try {
    const _mainBanners = await client.getEntries({
      content_type: "banner",
      "fields.slider.sys.id": MAIN_SLIDER_SYS_ID,
    });
    return _mainBanners;
  } catch (e) {
    if (e === "string") {
      throw new Error(e);
    }
  }
};
