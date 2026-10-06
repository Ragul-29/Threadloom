import { useMemo, useState } from "react";
import {
  Search,
  X,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

import products from "../../data/products";
import ProductCard from "../../components/product/ProductCard";
import "./Shop.css";

const PRICE_MAX = 7000;

const CATEGORIES = [
  "ALL",
  "WOMEN",
  "MEN",
  "KIDS",
];

const CATEGORY_SUBCATEGORIES = {
  ALL: ["ALL"],

  WOMEN: [
    "ALL WOMEN",
    "MODERN",
    "WESTERN",
    "TRADITIONAL",
    "TOPS",
  ],

  MEN: [
    "ALL MEN",
    "PANTS",
    "FORMAL SHIRTS",
    "CASUAL SHIRTS",
    "T-SHIRTS",
    "JACKETS",
    "FORMAL WEAR",
  ],

  KIDS: [
    "ALL KIDS",
    "BOYS",
    "GIRLS",
  ],
};

function normalize(value) {
  return String(value || "")
    .trim()
    .toUpperCase();
}

function Shop() {
  const [category, setCategory] = useState("ALL");
  const [subcategory, setSubcategory] =
    useState("ALL");

  const [maxPrice, setMaxPrice] =
    useState(PRICE_MAX);

  const [sort, setSort] =
    useState("featured");

  const [search, setSearch] =
    useState("");

  const [openSections, setOpenSections] =
    useState({
      category: true,
      subcategory: true,
      price: true,
    });

  const [mobileFiltersOpen, setMobileFiltersOpen] =
    useState(false);

  /* =====================================================
     CATEGORY COUNT
     ===================================================== */

  const getCategoryCount = (selectedCategory) => {
    if (selectedCategory === "ALL") {
      return products.length;
    }

    return products.filter(
      (product) =>
        normalize(product.category) ===
        selectedCategory
    ).length;
  };

  /* =====================================================
     KIDS CATEGORY COUNT

     GIRLS = IDs 34 - 38
     BOYS  = IDs 39 - 46
     ALL KIDS = all KIDS products
     ===================================================== */

  const getKidsCount = (style) => {
    if (style === "ALL KIDS") {
      return products.filter(
        (product) =>
          normalize(product.category) ===
          "KIDS"
      ).length;
    }

    if (style === "GIRLS") {
      return products.filter(
        (product) =>
          normalize(product.category) ===
            "KIDS" &&
          Number(product.id) >= 34 &&
          Number(product.id) <= 38
      ).length;
    }

    if (style === "BOYS") {
      return products.filter(
        (product) =>
          normalize(product.category) ===
            "KIDS" &&
          Number(product.id) >= 39 &&
          Number(product.id) <= 46
      ).length;
    }

    return 0;
  };

  /* =====================================================
     SUBCATEGORY COUNT
     ===================================================== */

  const getSubcategoryCount = (
    selectedSubcategory
  ) => {
    /* KIDS */

    if (category === "KIDS") {
      return getKidsCount(
        selectedSubcategory
      );
    }

    /* ALL WOMEN / ALL MEN */

    if (
      selectedSubcategory.startsWith("ALL ")
    ) {
      const selectedCategory =
        selectedSubcategory.replace(
          "ALL ",
          ""
        );

      return products.filter(
        (product) =>
          normalize(product.category) ===
          selectedCategory
      ).length;
    }

    /* WOMEN / MEN */

    return products.filter(
      (product) =>
        normalize(product.category) ===
          category &&
        normalize(product.subcategory) ===
          selectedSubcategory
    ).length;
  };

  /* =====================================================
     SUBCATEGORIES
     ===================================================== */

  const subcategories =
    CATEGORY_SUBCATEGORIES[category] ||
    CATEGORY_SUBCATEGORIES.ALL;

  /* =====================================================
     FILTER PRODUCTS
     ===================================================== */

  const filteredProducts = useMemo(() => {
    const searchValue =
      search.trim().toLowerCase();

    let result = products.filter(
      (product) => {
        const productCategory =
          normalize(product.category);

        const productSubcategory =
          normalize(product.subcategory);

        const productId =
          Number(product.id);

        /* SEARCH */

        const searchMatch =
          searchValue === "" ||
          String(product.name || "")
            .toLowerCase()
            .includes(searchValue) ||
          String(product.category || "")
            .toLowerCase()
            .includes(searchValue) ||
          String(product.subcategory || "")
            .toLowerCase()
            .includes(searchValue);

        /* CATEGORY */

        const categoryMatch =
          category === "ALL" ||
          productCategory === category;

        /* SUBCATEGORY */

        let subcategoryMatch = true;

        if (
          subcategory !== "ALL" &&
          !subcategory.startsWith("ALL ")
        ) {
          /* =========================================
             KIDS

             GIRLS = 34-38
             BOYS  = 39-46
             ========================================= */

          if (category === "KIDS") {
            if (subcategory === "GIRLS") {
              subcategoryMatch =
                productCategory ===
                  "KIDS" &&
                productId >= 34 &&
                productId <= 38;
            }

            if (subcategory === "BOYS") {
              subcategoryMatch =
                productCategory ===
                  "KIDS" &&
                productId >= 39 &&
                productId <= 46;
            }
          }

          /* =========================================
             WOMEN / MEN
             ========================================= */

          else {
            subcategoryMatch =
              productCategory ===
                category &&
              productSubcategory ===
                subcategory;
          }
        }

        /* PRICE */

        const priceMatch =
          Number(product.price || 0) <=
          maxPrice;

        return (
          searchMatch &&
          categoryMatch &&
          subcategoryMatch &&
          priceMatch
        );
      }
    );

    /* =================================================
       SORT
       ================================================= */

    if (sort === "price-low") {
      result.sort(
        (a, b) =>
          Number(a.price) -
          Number(b.price)
      );
    }

    if (sort === "price-high") {
      result.sort(
        (a, b) =>
          Number(b.price) -
          Number(a.price)
      );
    }

    if (sort === "name") {
      result.sort((a, b) =>
        String(a.name).localeCompare(
          String(b.name)
        )
      );
    }

    return result;
  }, [
    category,
    subcategory,
    maxPrice,
    sort,
    search,
  ]);

  /* =====================================================
     CATEGORY CHANGE
     ===================================================== */

  const handleCategoryChange = (
    newCategory
  ) => {
    setCategory(newCategory);

    if (newCategory === "ALL") {
      setSubcategory("ALL");
    } else {
      setSubcategory(
        `ALL ${newCategory}`
      );
    }
  };

  /* =====================================================
     SECTION TOGGLE
     ===================================================== */

  const toggleSection = (section) => {
    setOpenSections((current) => ({
      ...current,
      [section]:
        !current[section],
    }));
  };

  /* =====================================================
     CLEAR FILTERS
     ===================================================== */

  const clearFilters = () => {
    setCategory("ALL");
    setSubcategory("ALL");
    setMaxPrice(PRICE_MAX);
    setSort("featured");
    setSearch("");
  };

  const activeFilterCount =
    (category !== "ALL" ? 1 : 0) +
    (subcategory !== "ALL" &&
    !subcategory.startsWith("ALL ")
      ? 1
      : 0) +
    (maxPrice < PRICE_MAX ? 1 : 0);

  return (
    <main className="shop-page">

      {/* =================================================
          HEADER
          ================================================= */}

      <section className="shop-header container">

        <div>

          <p className="shop-eyebrow">
            THREADLOOM / COLLECTION
          </p>

          <h1 className="shop-title">
            Shop
            <br />
            <em>
              the collection.
            </em>
          </h1>

          <p className="shop-description">
            Discover contemporary clothing
            designed for everyday expression.
          </p>

        </div>

        <div className="shop-header-count">

          <span>
            2026 COLLECTION
          </span>

          <strong>
            {String(
              filteredProducts.length
            ).padStart(2, "0")}{" "}
            PIECES
          </strong>

        </div>

      </section>

      {/* =================================================
          TOOLBAR
          ================================================= */}

      <section className="shop-toolbar container">

        <div className="shop-search-box">

          <Search
            size={17}
            strokeWidth={1.5}
          />

          <input
            type="text"
            value={search}
            onChange={(event) =>
              setSearch(
                event.target.value
              )
            }
            placeholder="Search products..."
          />

          {search && (
            <button
              type="button"
              onClick={() =>
                setSearch("")
              }
            >
              <X size={15} />
            </button>
          )}

        </div>

        <div className="shop-category-tabs">

          {CATEGORIES.map(
            (item) => (
              <button
                key={item}
                type="button"
                className={
                  category === item
                    ? "active"
                    : ""
                }
                onClick={() =>
                  handleCategoryChange(
                    item
                  )
                }
              >
                {item}
              </button>
            )
          )}

        </div>

        <div className="shop-sort">

          <span>
            SORT
          </span>

          <select
            value={sort}
            onChange={(event) =>
              setSort(
                event.target.value
              )
            }
          >

            <option value="featured">
              Featured
            </option>

            <option value="price-low">
              Price: Low to High
            </option>

            <option value="price-high">
              Price: High to Low
            </option>

            <option value="name">
              Name: A to Z
            </option>

          </select>

        </div>

      </section>

      {/* =================================================
          MOBILE FILTER
          ================================================= */}

      <div className="mobile-filter-bar container">

        <button
          type="button"
          onClick={() =>
            setMobileFiltersOpen(true)
          }
        >
          FILTERS

          {activeFilterCount > 0 && (
            <span>
              {activeFilterCount}
            </span>
          )}
        </button>

        <span>
          {filteredProducts.length} PRODUCTS
        </span>

      </div>

      {/* =================================================
          CONTENT
          ================================================= */}

      <section className="shop-content container">

        {/* =================================================
            SIDEBAR
            ================================================= */}

        <aside
          className={`shop-sidebar ${
            mobileFiltersOpen
              ? "mobile-open"
              : ""
          }`}
        >

          <div className="mobile-filter-header">

            <strong>
              FILTERS
            </strong>

            <button
              type="button"
              onClick={() =>
                setMobileFiltersOpen(
                  false
                )
              }
            >
              <X size={19} />
            </button>

          </div>

          {/* =================================================
              CATEGORY
              ================================================= */}

          <div className="filter-section">

            <button
              type="button"
              className="filter-section-title"
              onClick={() =>
                toggleSection(
                  "category"
                )
              }
            >

              <span>
                CATEGORY
              </span>

              {openSections.category ? (
                <ChevronUp size={15} />
              ) : (
                <ChevronDown size={15} />
              )}

            </button>

            {openSections.category && (
              <div className="filter-options">

                {CATEGORIES.map(
                  (item) => {

                    const count =
                      getCategoryCount(
                        item
                      );

                    return (
                      <button
                        key={item}
                        type="button"
                        className={
                          category ===
                          item
                            ? "selected"
                            : ""
                        }
                        onClick={() =>
                          handleCategoryChange(
                            item
                          )
                        }
                      >

                        <span>
                          {item}
                        </span>

                        <small>
                          {count}
                        </small>

                      </button>
                    );
                  }
                )}

              </div>
            )}

          </div>

          {/* =================================================
              SHOP BY STYLE
              ================================================= */}

          {category !== "ALL" && (
            <div className="filter-section">

              <button
                type="button"
                className="filter-section-title"
                onClick={() =>
                  toggleSection(
                    "subcategory"
                  )
                }
              >

                <span>
                  SHOP BY STYLE
                </span>

                {openSections.subcategory ? (
                  <ChevronUp
                    size={15}
                  />
                ) : (
                  <ChevronDown
                    size={15}
                  />
                )}

              </button>

              {openSections.subcategory && (
                <div className="filter-options">

                  {subcategories.map(
                    (item) => {

                      const count =
                        getSubcategoryCount(
                          item
                        );

                      const selected =
                        subcategory ===
                        item;

                      return (
                        <button
                          key={item}
                          type="button"
                          className={
                            selected
                              ? "selected"
                              : ""
                          }
                          onClick={() =>
                            setSubcategory(
                              item
                            )
                          }
                        >

                          <span>
                            {item}
                          </span>

                          <small>
                            {count}
                          </small>

                        </button>
                      );
                    }
                  )}

                </div>
              )}

            </div>
          )}

          {/* =================================================
              PRICE

              COLOR + SIZE REMOVED
              ================================================= */}

          <div className="filter-section">

            <button
              type="button"
              className="filter-section-title"
              onClick={() =>
                toggleSection(
                  "price"
                )
              }
            >

              <span>
                PRICE
              </span>

              {openSections.price ? (
                <ChevronUp size={15} />
              ) : (
                <ChevronDown size={15} />
              )}

            </button>

            {openSections.price && (
              <div className="price-filter">

                <div className="price-values">

                  <span>
                    ₹0
                  </span>

                  <span>
                    ₹
                    {maxPrice.toLocaleString(
                      "en-IN"
                    )}
                  </span>

                </div>

                <input
                  type="range"
                  min="500"
                  max={PRICE_MAX}
                  step="100"
                  value={maxPrice}
                  onChange={(event) =>
                    setMaxPrice(
                      Number(
                        event.target.value
                      )
                    )
                  }
                />

              </div>
            )}

          </div>

          {/* CLEAR */}

          {activeFilterCount > 0 && (
            <button
              type="button"
              className="clear-filters"
              onClick={
                clearFilters
              }
            >
              CLEAR ALL FILTERS
            </button>
          )}

          {/* MOBILE APPLY */}

          <button
            type="button"
            className="mobile-apply-button"
            onClick={() =>
              setMobileFiltersOpen(
                false
              )
            }
          >
            VIEW{" "}
            {filteredProducts.length}{" "}
            PRODUCTS
          </button>

        </aside>

        {/* =================================================
            PRODUCTS
            ================================================= */}

        <div className="shop-products-area">

          <div className="shop-products-top">

            <span>
              {filteredProducts.length}{" "}
              {filteredProducts.length ===
              1
                ? "PRODUCT"
                : "PRODUCTS"}
            </span>

            {category !== "ALL" && (
              <span>
                {category}

                {subcategory !==
                  "ALL" &&
                !subcategory.startsWith(
                  "ALL "
                )
                  ? ` / ${subcategory}`
                  : ""}
              </span>
            )}

          </div>

          {filteredProducts.length >
          0 ? (

            <div className="shop-product-grid">

              {filteredProducts.map(
                (product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                  />
                )
              )}

            </div>

          ) : (

            <div className="empty-shop">

              <p>
                NO PRODUCTS FOUND
              </p>

              <h2>
                Nothing matched
                <br />
                your filters.
              </h2>

              <button
                type="button"
                onClick={
                  clearFilters
                }
              >
                CLEAR FILTERS
              </button>

            </div>

          )}

        </div>

      </section>

    </main>
  );
}

export default Shop;