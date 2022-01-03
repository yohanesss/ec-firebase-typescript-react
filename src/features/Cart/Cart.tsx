import React from "react";
import { useAuth } from "hooks/useAuth";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
// import { useDebounce } from "hooks/useDebounce";
import { CartItemsType } from "types";
import { updateDocument } from "api/firebase";

export const Cart = () => {
  const { cart, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    console.log("[user]", user);
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  const handleDeleteItem = async (catalog_code: string, uid: string) => {
    if (window.confirm("Are you sure want to delete this item?") === false)
      return;

    const currentCartProducts = cart ? [...cart.data.products] : [];
    const updatedProducts = currentCartProducts.filter(
      (p: CartItemsType) => p.catalog_code !== catalog_code
    );
    updateDocument("carts", uid, { products: updatedProducts });
  };

  // TODO: useDebounce Impl.
  const handleChangeQty = async (
    prod: CartItemsType,
    type: "add" | "minus"
  ) => {
    let qty = prod.qty;
    if (type === "minus") {
      if (qty === 1) {
        if (user) {
          await handleDeleteItem(prod.catalog_code, user.uid);
        }
        return;
      }
      qty = qty > 1 ? qty - 1 : qty;
    } else if (type === "add") {
      qty = qty + 1;
    }

    const currentCartProducts = cart ? [...cart.data.products] : [];
    const updatedProducts = currentCartProducts.map((p: CartItemsType) => {
      if (p.catalog_code === prod.catalog_code) {
        return {
          ...prod,
          qty,
        };
      }

      return p;
    });
    if (updatedProducts.length && user) {
      await updateDocument("carts", user.uid, { products: updatedProducts });
    }
  };

  const renderCartItems = () => {
    return cart?.data?.products?.map((prod: CartItemsType) => (
      <div key={prod.catalog_code} className="flex items-center border-b py-2">
        <img
          className="w-40 mr-2"
          src={
            prod.image_url.replace(
              /daruma.co.id/g,
              "daruma-procurement.co.id"
            ) || "https://via.placeholder.com/150"
          }
          alt={prod.name}
        />
        <div>
          <p>{prod.name}</p>
          <p>Qty: {prod.qty}</p>
          <button
            className="px-2 bg-slate-400 shadow-lg mr-2 hover:bg-slate-600"
            onClick={() => handleChangeQty(prod, "minus")}
          >
            -
          </button>
          <button
            className="px-2 bg-slate-400 shadow-lg m-2 hover:bg-slate-600"
            onClick={() => handleChangeQty(prod, "add")}
          >
            +
          </button>
          <button
            className="px-2 bg-red-400 shadow-lg m-2 hover:bg-red-600 text-white"
            onClick={() => {
              user && handleDeleteItem(prod.catalog_code, user.uid);
            }}
          >
            Delete Product
          </button>
        </div>
      </div>
    ));
  };

  return (
    <div className=" w-11/12 m-auto py-6">
      {cart ? (
        <>
          <h1 className="font-extrabold text-2xl mb-6">
            Total Items in Cart: {cart?.data?.products?.length}
          </h1>
          {renderCartItems()}
        </>
      ) : (
        <h1 className="m-auto text-center text-xl mt-10">
          There is no products on your cart.
          <br />
          <Link to="/" className="text-blue-600 hover:underline">
            Shop now
          </Link>
        </h1>
      )}
    </div>
  );
};
