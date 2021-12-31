import React from "react";
import { useAuth } from "hooks/useAuth";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

export const Cart = () => {
  const { cart, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    console.log("[user]", user);
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  const renderCartItems = () => {
    return cart?.data?.products?.map(
      (prod: {
        catalog_code: string;
        name: string;
        price: number;
        qty: number;
        image_url: string;
      }) => (
        <div
          key={prod.catalog_code}
          className="flex items-center border-b py-2"
        >
          <img
            className="w-40"
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
          </div>
        </div>
      )
    );
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
