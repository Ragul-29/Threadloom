import { useMemo, useState } from "react";
import {
  ArrowRight,
  Search as SearchIcon,
  X,
} from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";
import products from "../../data/products";
import "./Search.css";

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=1200&q=90";

function Search() {
  const [searchParams, setSearchParams] = useSearchParams();

  const initialQuery = searchParams.get("q") || "";
  const [query, setQuery] = useState(initialQuery);

  const results = useMemo(() => {
    const searchTerm = query.trim().toLowerCase();

    if (!searchTerm) {
      return [];
    }

    return products.filter((product) => {
      const searchableText = [
        product.name,
        product.category,
        product.subcategory,
        product.type,
        product.description,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      return searchableText.includes(searchTerm);
    });
  }, [query]);

  const handleSearch = (event) => {
    event.preventDefault();

    const trimmedQuery = query.trim();

    if (trimmedQuery) {
      setSearchParams({ q: trimmedQuery });
    } else {
      setSearchParams({});
    }
  };

  const clearSearch = () => {
    setQuery("");
    setSearchParams({});
  };

  const getProductImage = (product) => {
    if (!product) {
      return FALLBACK_IMAGE;
    }

    if (Array.isArray(product.images)) {
      return (
        product.images.find(Boolean) ||
        FALLBACK_IMAGE
      );
    }

    if (
      product.images &&
      typeof product.images === "object"
    ) {
      return (
        Object.values(product.images).find(Boolean) ||
        FALLBACK_IMAGE
      );
    }

    return product.image || FALLBACK_IMAGE;
  };

  const handleImageError = (event) => {
    if (event.currentTarget.src !== FALLBACK_IMAGE) {
      event.currentTarget.src = FALLBACK_IMAGE;
    }
  };

  return (
    <main className="search-page">
      <section className="search-header">
        <div className="container">
          <p className="search-eyebrow">
            THREADLOOM / SEARCH
          </p>

          <h1>
            Find your
            <br />
            <em>next piece.</em>
          </h1>

          <form
            className="search-form"
            onSubmit={handleSearch}
          >
            <SearchIcon
              size={19}
              strokeWidth={1.4}
            />

            <input
              type="search"
              value={query}
              onChange={(event) =>
                setQuery(event.target.value)
              }
              placeholder="Search products, categories, styles..."
              aria-label="Search products"
            />

            {query && (
              <button
                type="button"
                className="search-clear"
                onClick={clearSearch}
                aria-label="Clear search"
              >
                <X
                  size={17}
                  strokeWidth={1.4}
                />
              </button>
            )}

            <button
              type="submit"
              className="search-submit"
            >
              SEARCH
              <ArrowRight
                size={14}
                strokeWidth={1.4}
              />
            </button>
          </form>
        </div>
      </section>

      {query.trim() ? (
        <section className="search-results-section">
          <div className="container">
            <div className="search-results-header">
              <p>SEARCH RESULTS</p>

              <span>
                {results.length}{" "}
                {results.length === 1
                  ? "RESULT"
                  : "RESULTS"}
              </span>
            </div>

            {results.length === 0 ? (
              <div className="search-no-results">
                <p className="search-no-results-label">
                  NO MATCHES FOUND
                </p>

                <h2>
                  Nothing found
                  <br />
                  for <em>"{query}"</em>
                </h2>

                <p>
                  Try searching for another product,
                  category, or style.
                </p>

                <Link
                  to="/shop"
                  className="search-shop-button"
                >
                  EXPLORE ALL PRODUCTS
                  <ArrowRight
                    size={15}
                    strokeWidth={1.4}
                  />
                </Link>
              </div>
            ) : (
              <div className="search-product-grid">
                {results.map((product) => {
                  const image =
                    getProductImage(product);

                  return (
                    <article
                      className="search-product-card"
                      key={product.id}
                    >
                      <div className="search-product-image-wrap">
                        <Link
                          to={`/product/${product.id}`}
                          className="search-product-image-link"
                        >
                          <img
                            src={image}
                            alt={product.name}
                            className="search-product-image"
                            loading="lazy"
                            onError={handleImageError}
                          />
                        </Link>

                        <span className="search-product-badge">
                          {product.availability ===
                          "In Stock"
                            ? "IN STOCK"
                            : product.availability}
                        </span>

                        <Link
                          to={`/product/${product.id}`}
                          className="search-product-view"
                        >
                          VIEW PRODUCT
                          <ArrowRight
                            size={13}
                            strokeWidth={1.4}
                          />
                        </Link>
                      </div>

                      <div className="search-product-info">
                        <p className="search-product-category">
                          {product.category}
                          {product.subcategory
                            ? ` / ${product.subcategory}`
                            : ""}
                        </p>

                        <div className="search-product-title-row">
                          <Link
                            to={`/product/${product.id}`}
                            className="search-product-name"
                          >
                            {product.name}
                          </Link>

                          <span className="search-product-price">
                            ₹
                            {Number(
                              product.price || 0
                            ).toLocaleString("en-IN")}
                          </span>
                        </div>

                        {product.sizes?.length > 0 && (
                          <div className="search-product-sizes">
                            {product.sizes.map(
                              (size) => (
                                <span key={size}>
                                  {size}
                                </span>
                              )
                            )}
                          </div>
                        )}
                      </div>
                    </article>
                  );
                })}
              </div>
            )}
          </div>
        </section>
      ) : (
        <section className="search-discover">
          <div className="container">
            <p className="search-discover-label">
              DISCOVER THREADLOOM
            </p>

            <div className="search-discover-grid">
              <Link
                to="/shop?category=WOMEN"
                className="search-discover-card"
              >
                <span>WOMEN</span>
                <ArrowRight
                  size={16}
                  strokeWidth={1.4}
                />
              </Link>

              <Link
                to="/shop?category=MEN"
                className="search-discover-card"
              >
                <span>MEN</span>
                <ArrowRight
                  size={16}
                  strokeWidth={1.4}
                />
              </Link>

              <Link
                to="/shop?category=KIDS"
                className="search-discover-card"
              >
                <span>KIDS</span>
                <ArrowRight
                  size={16}
                  strokeWidth={1.4}
                />
              </Link>

              <Link
                to="/shop?category=UNISEX"
                className="search-discover-card"
              >
                <span>UNISEX</span>
                <ArrowRight
                  size={16}
                  strokeWidth={1.4}
                />
              </Link>
            </div>
          </div>
        </section>
      )}
    </main>
  );
}

export default Search;