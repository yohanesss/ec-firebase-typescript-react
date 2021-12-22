import { getMainBanner } from "api/contentful";
import { EntryCollection } from "contentful";
import { useEffect, useState } from "react";
import Slider from "react-slick";

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
};

export const HomeBanner = () => {
  const [banners, setBanners] = useState<EntryCollection<unknown>>();

  useEffect(() => {
    getMainBanner().then((banners) => {
      console.log("[banners]", banners);
      setBanners(banners);
    });
  }, []);

  return (
    <div>
      <Slider {...settings}>
        {/* TODO: change any type */}
        {banners?.items.map(
          (banner: any, idx) =>
            idx <= 10 && (
              <img
                key={banner?.fields?.mainImage?.fields?.file?.url}
                src={banner?.fields?.mainImage?.fields?.file?.url}
                alt={banner?.fields?.mainImage?.fields?.file?.field_name}
              />
            )
        )}
      </Slider>
    </div>
  );
};
