import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getCategories } from "api/ecommerce";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MainCategories } from "types";

export const HeaderNav = () => {
  const [showMenu, toggleShowMenu] = useState(false);
  const [categories, setCategories] = useState<null | MainCategories>(null);

  useEffect(() => {
    getCategories().then(
      (categories) => categories && setCategories(categories)
    );
  }, []);

  const renderMenu = () => {
    const renderCategories = categories?.map(
      (category) =>
        category.name.trim().length > 0 &&
        category.name.toLowerCase() !== "default" &&
        category.name.toLowerCase() !== "power-tools" && (
          <Link
            key={category.key}
            to={`/categories/${category.key}`}
            onClick={() => toggleShowMenu(false)}
          >
            <li className="p-2 hover:bg-gray-400 cursor-pointer">
              {category.name}
            </li>
          </Link>
        )
    );

    return (
      showMenu && (
        <div className="absolute top-7 left-0 bg-gray-200">
          <ul
            style={{ minWidth: 400 }}
            onMouseLeave={() => toggleShowMenu(false)}
          >
            {renderCategories}
          </ul>
        </div>
      )
    );
  };

  return (
    <div className="relative">
      <button
        className="flex items-center"
        onMouseEnter={() => toggleShowMenu(true)}
      >
        <span className="pr-2">Category</span>{" "}
        <FontAwesomeIcon style={{ fontSize: ".75em" }} icon={faChevronDown} />
      </button>
      {renderMenu()}
    </div>
  );
};
