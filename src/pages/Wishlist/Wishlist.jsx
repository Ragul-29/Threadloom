import { useEffect, useState } from "react";
import {
  ArrowRight,
  Heart,
  ShoppingBag,
  X,
} from "lucide-react";
import { Link } from "react-router-dom";
import "./Wishlist.css";

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=1200&q=90";

function Wishlist() {
  const [wishlist, setWishlist] = useState([]);

  const loadWishlist = () => {
    try {
      const savedWishlist =
        JSON.parse(
          localStorage.getItem("threadloom-wishlist")
        ) || [];

      setWishlist(
        Array.isArray(savedWishlist)
          ? savedWishlist
          : []
      );
    } catch {
      setWishlist([]);
    }
  };

  useEffect(() => {
    loadWishlist();

    window.addEventListener(
      "threadloom-wishlist-updated",
      loadWishlist
    );

    window.addEventListener(
      "wishlistUpdated",
      loadWishlist
    );

    return () => {
      window.removeEventListener(
        "threadloom-wishlist-updated",
        loadWishlist
      );

      window.removeEventListener(
        "wishlistUpdated",
        loadWishlist
      );
    };
  }, []);

  const removeFromWishlist = (productId) => {
    const updatedWishlist = wishlist.filter(
      (item) =>
        Number(item.id) !== Number(productId)
    );

    localStorage.setItem(
      "threadloom-wishlist",
      JSON.stringify(updatedWishlist)
    );

    setWishlist(updatedWishlist);

    window.dispatchEvent(
      new Event("threadloom-wishlist-updated")
    );

    window.dispatchEvent(
      new Event("wishlistUpdated")
    );
  };

  const getProductImage = (item) => {
    if (!item) {
      return FALLBACK_IMAGE;
    }

    if (item.image) {
      return item.image;
    }

    if (Array.isArray(item.images)) {
      return (
        item.images.find(Boolean) ||
        FALLBACK_IMAGE
      );
    }

    if (
      item.images &&
      typeof item.images === "object"
    ) {
      return (
        Object.values(item.images).find(Boolean) ||
        FALLBACK_IMAGE
      );
    }

    return FALLBACK_IMAGE;
  };

  const handleImageError = (event) => {
    if (
      event.currentTarget.src !==
      FALLBACK_IMAGE
    ) {
      event.currentTarget.src = FALLBACK_IMAGE;
    }
  };

  if (wishlist.length === 0) {
    return (
      <main className="wishlist-page">
        <section className="wishlist-empty container">
          <div className="wishlist-empty-icon">
            <Heart
              size={28}
              strokeWidth={1.2}
            />
          </div>

          <p className="wishlist-eyebrow">
            THREADLOOM / WISHLIST
          </p>

          <h1>
            Nothing saved
            <br />
            <em>yet.</em>
          </h1>

          <p className="wishlist-empty-text">
            Save pieces you love and come back to
            them whenever you're ready.
          </p>

          <Link
            to="/shop"
            className="wishlist-shop-button"
          >
            EXPLORE COLLECTION
            <ArrowRight
              size={15}
              strokeWidth={1.4}
            />
          </Link>
        </section>
      </main>
    );
  }

  return (
    <main className="wishlist-page">
      {/* HEADER */}

      <section className="wishlist-header container">
        <div>
          <p className="wishlist-eyebrow">
            THREADLOOM / WISHLIST
          </p>

          <h1>
            Saved
            <br />
            <em>pieces.</em>
          </h1>
        </div>

        <div className="wishlist-count">
          {wishlist.length}{" "}
          {wishlist.length === 1
            ? "ITEM"
            : "ITEMS"}
        </div>
      </section>

      {/* PRODUCTS */}

      <section className="wishlist-content container">
        <div className="wishlist-grid">
          {wishlist.map((item) => {
            const image =
              getProductImage(item);

            return (
              <article
                className="wishlist-card"
                key={item.id}
              >
                <div className="wishlist-image-wrap">
                  <Link
                    to={`/product/${item.id}`}
                    className="wishlist-image-link"
                  >
                    <img
                      src={image}
                      alt={
                        item.name ||
                        "Threadloom product"
                      }
                      className="wishlist-image"
                      loading="lazy"
                      onError={
                        handleImageError
                      }
                    />
                  </Link>

                  <button
                    type="button"
                    className="wishlist-remove"
                    onClick={() =>
                      removeFromWishlist(
                        item.id
                      )
                    }
                    aria-label={`Remove ${
                      item.name ||
                      "product"
                    } from wishlist`}
                  >
                    <X
                      size={16}
                      strokeWidth={1.4}
                    />
                  </button>

                  <Link
                    to={`/product/${item.id}`}
                    className="wishlist-view"
                  >
                    VIEW PRODUCT
                    <ArrowRight
                      size={13}
                      strokeWidth={1.4}
                    />
                  </Link>
                </div>

                <div className="wishlist-card-info">
                  <div className="wishlist-card-top">
                    <div>
                      <p className="wishlist-category">
                        {item.category}

                        {item.subcategory
                          ? ` / ${item.subcategory}`
                          : ""}
                      </p>

                      <Link
                        to={`/product/${item.id}`}
                        className="wishlist-name"
                      >
                        {item.name}
                      </Link>
                    </div>

                    <strong className="wishlist-price">
                      ₹
                      {Number(
                        item.price || 0
                      ).toLocaleString(
                        "en-IN"
                      )}
                    </strong>
                  </div>

                  {/* SIZES */}

                  {item.sizes?.length > 0 && (
                    <div className="wishlist-meta">
                      <span>SIZES</span>

                      <div className="wishlist-sizes">
                        {item.sizes.map(
                          (size) => (
                            <span key={size}>
                              {size}
                            </span>
                          )
                        )}
                      </div>
                    </div>
                  )}

                  <Link
                    to={`/product/${item.id}`}
                    className="wishlist-add-button"
                  >
                    <ShoppingBag
                      size={14}
                      strokeWidth={1.4}
                    />

                    VIEW & ADD TO BAG

                    <ArrowRight
                      size={14}
                      strokeWidth={1.4}
                    />
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </main>
  );
}

export default Wishlist;