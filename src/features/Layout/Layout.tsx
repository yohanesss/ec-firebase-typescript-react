import React from "react";

type LayoutProps = {
  children: React.ReactNode;
};

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div>
      <header className="h-16 w-full bg-white sticky top-0 border-b border-gray-100 shadow-md">
        <nav className=":w-full md:w-11/12 m-auto h-full p-5 flex items-center">
          <div className="w-3/12 py-4 pl-0 pr-8">
            <img
              className="h-full"
              src="https://daruma.co.id/static/madan/logo%20header.png"
              alt="logo"
            />
          </div>
          <div className="w-6/12 flex justify-center items-center">
            <input
              className="w-full leading-5 p-2 rounded-md border border-slate-200 outline-none focus:bg-neutral-100"
              type="text"
            />
          </div>
          <div className="w-3/12 flex justify-evenly items-center">
            <button>Register</button>
            <button>Login</button>
          </div>
        </nav>
      </header>
      {children}
    </div>
  );
};
