import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Search,
  Heart,
  UserRound,
  ShoppingBag,
  Menu,
  X,
  ArrowUpRight,
} from "lucide-react";
import "./Navbar.css";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [wishlistCount, setWishlistCount] = useState(0);

  const updateCounts = () => {
    try {
      const savedCart = JSON.parse(
        localStorage.getItem("threadloom-cart")
      );

      const savedWishlist = JSON.parse(
        localStorage.getItem("threadloom-wishlist")
      );

      const cart = Array.isArray(savedCart)
        ? savedCart
        : [];

      const wishlist = Array.isArray(savedWishlist)
        ? savedWishlist
        : [];

      const totalCart = cart.reduce(
        (total, item) =>
          total + Number(item?.quantity || 1),
        0
      );

      setCartCount(totalCart);
      setWishlistCount(wishlist.length);
    } catch {
      setCartCount(0);
      setWishlistCount(0);
    }
  };

  useEffect(() => {
    updateCounts();

    window.addEventListener(
      "storage",
      updateCounts
    );

    window.addEventListener(
      "cartUpdated",
      updateCounts
    );

    window.addEventListener(
      "threadloom-cart-updated",
      updateCounts
    );

    window.addEventListener(
      "wishlistUpdated",
      updateCounts
    );

    window.addEventListener(
      "threadloom-wishlist-updated",
      updateCounts
    );

    return () => {
      window.removeEventListener(
        "storage",
        updateCounts
      );

      window.removeEventListener(
        "cartUpdated",
        updateCounts
      );

      window.removeEventListener(
        "threadloom-cart-updated",
        updateCounts
      );

      window.removeEventListener(
        "wishlistUpdated",
        updateCounts
      );

      window.removeEventListener(
        "threadloom-wishlist-updated",
        updateCounts
      );
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen
      ? "hidden"
      : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const navItems = [
    {
      label: "NEW IN",
      path: "/shop",
    },
    {
      label: "WOMEN",
      path: "/shop?category=WOMEN",
    },
    {
      label: "MEN",
      path: "/shop?category=MEN",
    },
    {
      label: "KIDS",
      path: "/shop?category=KIDS",
    },
    {
      label: "COLLECTIONS",
      path: "/shop",
    },
    {
      label: "JOURNAL",
      path: "/about",
    },
  ];

  return (
    <>
      <header className="navbar">
        <div className="navbar-inner">
          <div className="navbar-mobile-menu">
            <button
              type="button"
              aria-label={
                menuOpen
                  ? "Close menu"
                  : "Open menu"
              }
              aria-expanded={menuOpen}
              onClick={() =>
                setMenuOpen(
                  (current) => !current
                )
              }
            >
              {menuOpen ? (
                <X size={20} />
              ) : (
                <Menu size={20} />
              )}
            </button>
          </div>

          <nav
            className="navbar-left"
            aria-label="Primary navigation"
          >
            {navItems
              .slice(0, 3)
              .map((item) => (
                <Link
                  key={item.label}
                  to={item.path}
                  onClick={closeMenu}
                >
                  {item.label}
                </Link>
              ))}
          </nav>

          <Link
            to="/"
            className="navbar-logo"
            onClick={closeMenu}
            aria-label="Threadloom home"
          >
            <span>THREADLOOM</span>
            <small>EST. 2026</small>
            <em>
              THE ART OF EVERYDAY WEAR
            </em>
          </Link>

          <nav
            className="navbar-right"
            aria-label="Secondary navigation"
          >
            {navItems
              .slice(3)
              .map((item) => (
                <Link
                  key={item.label}
                  to={item.path}
                  onClick={closeMenu}
                >
                  {item.label}
                </Link>
              ))}

            <Link
              to="/search"
              className="navbar-icon"
              aria-label="Search"
              title="Search"
              onClick={closeMenu}
            >
              <Search
                size={18}
                strokeWidth={1.5}
              />
            </Link>

            <Link
              to="/wishlist"
              className="navbar-icon navbar-count-icon"
              aria-label="Wishlist"
              title="Wishlist"
              onClick={closeMenu}
            >
              <Heart
                size={18}
                strokeWidth={1.5}
              />

              {wishlistCount > 0 && (
                <span className="navbar-count">
                  {wishlistCount}
                </span>
              )}
            </Link>

            <Link
              to="/account"
              className="navbar-icon"
              aria-label="Account"
              title="Account"
              onClick={closeMenu}
            >
              <UserRound
                size={18}
                strokeWidth={1.5}
              />
            </Link>

            <Link
              to="/cart"
              className="navbar-icon navbar-count-icon"
              aria-label="Shopping bag"
              title="Shopping bag"
              onClick={closeMenu}
            >
              <ShoppingBag
                size={18}
                strokeWidth={1.5}
              />

              {cartCount > 0 && (
                <span className="navbar-count">
                  {cartCount}
                </span>
              )}
            </Link>
          </nav>
        </div>
      </header>

      <div
        className={`mobile-menu ${
          menuOpen ? "is-open" : ""
        }`}
      >
        <div className="mobile-menu-inner">
          <div className="mobile-menu-top">
            <span>THREADLOOM / MENU</span>

            <button
              type="button"
              onClick={closeMenu}
              aria-label="Close menu"
            >
              <X size={20} />
            </button>
          </div>

          <nav
            className="mobile-nav"
            aria-label="Mobile navigation"
          >
            {navItems.map((item) => (
              <Link
                key={item.label}
                to={item.path}
                onClick={closeMenu}
              >
                <span>{item.label}</span>
                <ArrowUpRight
                  size={18}
                  strokeWidth={1.4}
                />
              </Link>
            ))}
          </nav>

          <div className="mobile-menu-links">
            <Link
              to="/search"
              onClick={closeMenu}
            >
              SEARCH
            </Link>

            <Link
              to="/wishlist"
              onClick={closeMenu}
            >
              WISHLIST{" "}
              {wishlistCount > 0
                ? `(${wishlistCount})`
                : ""}
            </Link>

            <Link
              to="/account"
              onClick={closeMenu}
            >
              ACCOUNT
            </Link>

            <Link
              to="/cart"
              onClick={closeMenu}
            >
              BAG{" "}
              {cartCount > 0
                ? `(${cartCount})`
                : ""}
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;