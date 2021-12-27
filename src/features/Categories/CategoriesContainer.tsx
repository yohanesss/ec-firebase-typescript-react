import { getProductsCategory } from "api/ecommerce";
import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { ProductsCategory } from "types";
import ClipLoader from "react-spinners/ClipLoader";
import { ProductCategory } from ".";

const toSentenceCaseFromKey = (key: string) => {
  const sentences = key.split("-");
  const transformedSentences = sentences
    .map((words) =>
      words
        .split("")
        .map((word, index: number) =>
          index === 0 ? word.toUpperCase() : word.toLowerCase()
        )
        .join("")
    )
    .join(" ");
  return transformedSentences;
};

export const CategoriesContainer = () => {
  const [products, setProducts] = useState<null | ProductsCategory>(null);
  const [activeCategoryName, setActiveCategoryName] = useState<null | string>(
    null
  );
  const [isLoading, setIsLoading] = useState(false);
  const [searchParams] = useSearchParams();
  const { key } = useParams();
  const page = searchParams.get("page");

  useEffect(() => {
    setIsLoading(true);
    if (key) {
      setActiveCategoryName(toSentenceCaseFromKey(key));
      if (page) {
        getProductsCategory(key, +page).then((products) => {
          setProducts(products);
          setIsLoading(false);
        });
      } else {
        getProductsCategory(key).then((products) => {
          setProducts(products);
          setIsLoading(false);
        });
      }
    }
  }, [key, page]);

  const renderProducts = () => {
    const productsList =
      products?.length &&
      products.map((product) => (
        <ProductCategory key={product.key} product={product} />
      ));
    return (
      <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols5">
        {productsList}
      </div>
    );
  };

  return (
    <div className="w-11/12 m-auto pt-4">
      {isLoading ? (
        <div
          style={{ height: "calc(100vh - 200px)" }}
          className="flex items-center justify-center"
        >
          <ClipLoader color={"#000000"} loading={isLoading} size={150} />
        </div>
      ) : (
        <>
          {activeCategoryName && (
            <h1 className="font-extrabold text-2xl pt-2 pb-4">
              {activeCategoryName}
            </h1>
          )}
          {renderProducts()}
        </>
      )}
    </div>
  );
};
