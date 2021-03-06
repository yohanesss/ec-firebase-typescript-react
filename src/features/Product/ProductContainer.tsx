import { getProduct } from "api/ecommerce";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ProductType } from "types";
import ClipLoader from "react-spinners/ClipLoader";
import { toLocalCurrency } from "utils/util";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "hooks/useAuth";
import {
  createNewDocument,
  db,
  getUserCart,
  updateDocument,
} from "api/firebase";
import { doc, setDoc } from "firebase/firestore";
import { GlobalNotification as ShowSuccessAddToCartNotification } from "utils/components/GlobalNotification";

export const ProductContainer = () => {
  const [product, setProduct] = useState<ProductType | null>(null);
  const [showNotification, toggleNotification] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const { key } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    key &&
      getProduct(key).then((product) => {
        setProduct(product);
        setLoading(false);
      });
  }, [key]);

  useEffect(() => {
    if (showNotification) {
      const timeout = setTimeout(() => toggleNotification(false), 3000);
      return clearTimeout(timeout);
    }
  }, [showNotification]);

  const addToCart = async () => {
    if (!user) {
      navigate("/login");
    } else {
      const { data: userCart, isExists } = await getUserCart(user.uid);
      if (!isExists) {
        await createNewDocument("carts", user.uid, {
          products: [
            {
              name: product?.name,
              catalog_code: product?.catalog_code,
              image_url: product?.images[0]?.original_url,
              price: product?.price,
              qty: 1,
            },
          ],
        });
      } else {
        const products = userCart;
        const isProductInCart =
          products?.products.filter(
            (p: { catalog_code: string }) =>
              p.catalog_code === product?.catalog_code
          ).length > 0;

        updateDocument("carts", user.uid, {
          products: isProductInCart
            ? products?.products
            : [
                ...products?.products,
                {
                  name: product?.name,
                  catalog_code: product?.catalog_code,
                  image_url: product?.images[0]?.original_url,
                  price: product?.price,
                  qty: 1,
                },
              ],
        });
      }
    }
    toggleNotification(true);
  };

  const renderSpinner = isLoading && (
    <div
      style={{ height: "calc(100vh - 200px)" }}
      className="flex items-center justify-center"
    >
      <ClipLoader color={"#000000"} loading={isLoading} size={150} />
    </div>
  );

  const renderProduct = () => {
    if (product) {
      const showOldPrice = product.price !== product.price_before_discount;
      return (
        <div className=" w-11/12 m-auto py-6">
          <Link to="/">
            <button className="ml-3 text-red-600 hover:underline">
              <FontAwesomeIcon
                style={{ fontSize: ".75em" }}
                icon={faChevronLeft}
                className="mr-2"
              />
              Go Back
            </button>
          </Link>
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
            <div className="m-2 shadow-xl">
              <img
                src={
                  product.images[0]?.original_url.replace(
                    /daruma.co.id/g,
                    "daruma-procurement.co.id"
                  ) || "https://via.placeholder.com/350"
                }
                alt={product?.name}
                className="w-full"
              />
            </div>
            <div>
              <h3 className="text-xl font-bold text-red-900">
                {product.brand_name}
              </h3>
              <h2 className="text-4xl font-bold pt-2">{product.name}</h2>
              <p className="font-bold text-gray-500 pt-2 mb-4">
                {product.catalog_code}
              </p>
              <p className="text-3xl text-red-500">
                Rp.{toLocalCurrency(product.price)}
                {showOldPrice && (
                  <span className="line-through text-base text-gray-500">
                    Rp.{product.price_before_discount}
                  </span>
                )}
              </p>
              <button
                onClick={addToCart}
                className="my-10 bg-red-500 text-white border rounded-sm px-4 py-2 hover:bg-red-800"
              >
                Add to Cart
              </button>
              <h3 className="text-xl mb-2 font-bold text-red-900">
                Specification
              </h3>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illum,
                officiis! Esse iusto veritatis consectetur? Expedita quae
                molestias libero dolores cumque quos reiciendis dolore vero! Id
                eveniet officiis porro modi asperiores?
              </p>
            </div>
          </div>
        </div>
      );
    }

    return !isLoading ? <p>No Product Available</p> : null;
  };

  return (
    <>
      <ShowSuccessAddToCartNotification
        isShow={showNotification}
        label={"Product has been added to cart!"}
      />
      {renderSpinner}
      {renderProduct()}
    </>
  );
};
