import { Link } from "react-router-dom";
import { HeaderNav } from ".";

export const Header = () => {
  return (
    <header className="h-16 w-full bg-white sticky top-0 border-b border-gray-100 shadow-md z-10">
      <nav className=":w-full md:w-11/12 m-auto h-full p-5 flex items-center">
        <div className="w-2/12 py-4 pl-0 pr-8">
          <Link to="/">
            <img
              className="h-full max-h-10"
              src="https://daruma.co.id/static/madan/logo%20header.png"
              alt="logo"
            />
          </Link>
        </div>
        <div className="w-2/12 py-4 pl-0 pr-8">
          <HeaderNav />
        </div>
        <div className="w-6/12 flex justify-center items-center">
          <input
            className="w-full leading-5 p-2 rounded-md border border-slate-200 outline-none focus:bg-neutral-100"
            type="text"
          />
        </div>
        <div className="w-2/12 flex justify-evenly items-center">
          <Link to="/login">
            <button className="hover:underline">Register / Login</button>
          </Link>
        </div>
      </nav>
    </header>
  );
};
