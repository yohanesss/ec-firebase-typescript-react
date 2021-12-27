import ReactPlaceholder from "react-placeholder/lib";
import { ProductType } from "types";
import "react-placeholder/lib/reactPlaceholder.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import { toLocalCurrency } from "utils/util";

type ProductCategoryProps = {
  product: ProductType;
};

export const ProductCategory = ({ product }: ProductCategoryProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const productPrice = toLocalCurrency(+product.price);
  const productPriceBeforeDiscount = toLocalCurrency(
    +product.price_before_discount
  );

  return (
    <Link to={`/products/${product.uid}`}>
      <div
        className="w-11/12 bg-white rounded-lg shadow-lg p-2 transition-all hover:-translate-y-1 cursor-pointer"
        key={product.key}
      >
        <ReactPlaceholder
          showLoadingAnimation
          type="rect"
          ready={imageLoaded}
          style={{ height: 170 }}
        >
          <span className="hidden"></span>
        </ReactPlaceholder>
        <img
          className="w-full"
          src={
            product.images[0]?.original_url.replace(
              /daruma.co.id/g,
              "daruma-procurement.co.id"
            ) || "https://via.placeholder.com/150"
          }
          onLoad={() => setImageLoaded(true)}
          alt={product.name}
        />
        <p className="text-gray-500 pt-2">
          IDR {productPrice}{" "}
          {product.price !== product.price_before_discount ? (
            <span className="line-through text-red-500 opacity-75 text-xs">
              {productPriceBeforeDiscount}
            </span>
          ) : null}
        </p>
        <p className="pb-2 font-medium text-xs">{product.catalog_code}</p>
        <p className="break-words line-clamp-2 leading-5">{product.name}</p>
      </div>
    </Link>
  );
};
