import { useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Heart,
  Minus,
  Plus,
  X,
} from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { products } from "../../data/products";
import "./ProductDetails.css";

const COLOR_MAP = {
  Blue: { r: 55, g: 110, b: 180 },
  White: { r: 245, g: 245, b: 240 },
  Cream: { r: 218, g: 201, b: 170 },
  Black: { r: 25, g: 25, b: 25 },
  Red: { r: 190, g: 45, b: 45 },
  Green: { r: 75, g: 115, b: 70 },
  Brown: { r: 105, g: 65, b: 45 },
  Pink: { r: 220, g: 125, b: 145 },
  Beige: { r: 210, g: 195, b: 165 },
  Grey: { r: 125, g: 125, b: 125 },
};

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function rgbToHsv(r, g, b) {
  r /= 255;
  g /= 255;
  b /= 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const difference = max - min;

  let h = 0;

  if (difference !== 0) {
    if (max === r) {
      h = ((g - b) / difference) % 6;
    } else if (max === g) {
      h = (b - r) / difference + 2;
    } else {
      h = (r - g) / difference + 4;
    }
  }

  h = Math.round(h * 60);

  if (h < 0) {
    h += 360;
  }

  const s = max === 0 ? 0 : difference / max;
  const v = max;

  return { h, s, v };
}

function getColorRGB(color) {
  if (COLOR_MAP[color]) {
    return COLOR_MAP[color];
  }

  const normalized = color?.toLowerCase() || "";

  if (normalized.includes("blue")) {
    return COLOR_MAP.Blue;
  }

  if (
    normalized.includes("white") ||
    normalized.includes("ivory")
  ) {
    return COLOR_MAP.White;
  }

  if (
    normalized.includes("cream") ||
    normalized.includes("beige")
  ) {
    return COLOR_MAP.Cream;
  }

  if (normalized.includes("black")) {
    return COLOR_MAP.Black;
  }

  if (normalized.includes("green")) {
    return COLOR_MAP.Green;
  }

  if (normalized.includes("red")) {
    return COLOR_MAP.Red;
  }

  if (normalized.includes("pink")) {
    return COLOR_MAP.Pink;
  }

  if (normalized.includes("brown")) {
    return COLOR_MAP.Brown;
  }

  if (
    normalized.includes("grey") ||
    normalized.includes("gray")
  ) {
    return COLOR_MAP.Grey;
  }

  return COLOR_MAP.Cream;
}

/*
  Get the correct image from any product format.

  Supports:
  1. images: ["/image.png"]
  2. images: {
       Black: "/black.png",
       White: "/white.png"
     }
  3. image: "/image.png"
*/
function getProductImage(product) {
  if (!product) {
    return "";
  }

  if (Array.isArray(product.images)) {
    return product.images.find(Boolean) || product.image || "";
  }

  if (
    product.images &&
    typeof product.images === "object"
  ) {
    const firstImage = Object.values(product.images).find(
      Boolean
    );

    return firstImage || product.image || "";
  }

  if (typeof product.images === "string") {
    return product.images;
  }

  return product.image || "";
}

/*
  Product image with optional garment recoloring.
*/
function ProductColorImage({
  src,
  mask,
  alt,
  color,
  className = "",
}) {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!src || !canvasRef.current) {
      return;
    }

    let cancelled = false;

    const canvas = canvasRef.current;

    const context = canvas.getContext("2d", {
      willReadFrequently: true,
    });

    if (!context) {
      return;
    }

    const baseImage = new Image();
    const maskImage = new Image();

    baseImage.crossOrigin = "anonymous";
    maskImage.crossOrigin = "anonymous";

    const render = () => {
      if (
        cancelled ||
        !baseImage.complete ||
        baseImage.naturalWidth === 0
      ) {
        return;
      }

      const width = baseImage.naturalWidth;
      const height = baseImage.naturalHeight;

      canvas.width = width;
      canvas.height = height;

      context.clearRect(
        0,
        0,
        width,
        height
      );

      context.drawImage(
        baseImage,
        0,
        0,
        width,
        height
      );

      /*
        If no mask exists, keep the
        original image unchanged.
      */
      if (
        !mask ||
        !maskImage.complete ||
        maskImage.naturalWidth === 0
      ) {
        return;
      }

      const maskCanvas =
        document.createElement("canvas");

      maskCanvas.width = width;
      maskCanvas.height = height;

      const maskContext =
        maskCanvas.getContext("2d", {
          willReadFrequently: true,
        });

      if (!maskContext) {
        return;
      }

      maskContext.drawImage(
        maskImage,
        0,
        0,
        width,
        height
      );

      const imageData =
        context.getImageData(
          0,
          0,
          width,
          height
        );

      const maskData =
        maskContext.getImageData(
          0,
          0,
          width,
          height
        );

      const pixels = imageData.data;
      const maskPixels = maskData.data;

      const target = getColorRGB(color);

      const targetHsv = rgbToHsv(
        target.r,
        target.g,
        target.b
      );

      for (
        let index = 0;
        index < pixels.length;
        index += 4
      ) {
        const maskRed = maskPixels[index];
        const maskGreen =
          maskPixels[index + 1];
        const maskBlue =
          maskPixels[index + 2];
        const maskAlpha =
          maskPixels[index + 3];

        const maskValue =
          ((maskRed +
            maskGreen +
            maskBlue) /
            3) *
          (maskAlpha / 255);

        if (maskValue < 8) {
          continue;
        }

        const amount = maskValue / 255;

        const originalR = pixels[index];
        const originalG =
          pixels[index + 1];
        const originalB =
          pixels[index + 2];

        const originalHsv = rgbToHsv(
          originalR,
          originalG,
          originalB
        );

        const brightness =
          originalHsv.v;

        const targetBrightness =
          Math.max(
            targetHsv.v,
            0.15
          );

        const lighting = clamp(
          brightness /
            targetBrightness,
          0.45,
          1.35
        );

        let newR =
          target.r * lighting;

        let newG =
          target.g * lighting;

        let newB =
          target.b * lighting;

        if (brightness < 0.35) {
          const shadow =
            brightness / 0.35;

          newR *= shadow;
          newG *= shadow;
          newB *= shadow;
        }

        pixels[index] =
          originalR * (1 - amount) +
          newR * amount;

        pixels[index + 1] =
          originalG * (1 - amount) +
          newG * amount;

        pixels[index + 2] =
          originalB * (1 - amount) +
          newB * amount;
      }

      context.putImageData(
        imageData,
        0,
        0
      );
    };

    baseImage.onload = render;
    maskImage.onload = render;

    baseImage.onerror = () => {
      console.warn(
        "Could not load product image:",
        src
      );
    };

    maskImage.onerror = () => {
      render();
    };

    baseImage.src = src;

    if (mask) {
      maskImage.src = mask;
    }

    return () => {
      cancelled = true;

      baseImage.onload = null;
      baseImage.onerror = null;

      maskImage.onload = null;
      maskImage.onerror = null;
    };
  }, [src, mask, color]);

  return (
    <canvas
      ref={canvasRef}
      className={`product-main-image ${className}`}
      aria-label={alt}
      role="img"
    />
  );
}

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const product = useMemo(
    () =>
      products.find(
        (item) =>
          String(item.id) ===
          String(id)
      ),
    [id]
  );

  const [selectedColor, setSelectedColor] =
    useState("");

  const [selectedSize, setSelectedSize] =
    useState("");

  const [quantity, setQuantity] =
    useState(1);

  const [wishlisted, setWishlisted] =
    useState(false);

  const [zoomOpen, setZoomOpen] =
    useState(false);

  const [added, setAdded] =
    useState(false);

  /*
    PRODUCT IMAGES
  */
  const productImages = useMemo(() => {
    if (!product) {
      return [];
    }

    if (
      product.images &&
      typeof product.images ===
        "object" &&
      !Array.isArray(product.images)
    ) {
      return Object.entries(
        product.images
      ).map(
        ([color, image]) => ({
          color,
          image,
        })
      );
    }

    if (Array.isArray(product.images)) {
      return product.images.map(
        (image, index) => ({
          color:
            product.colors?.[index] ||
            product.colors?.[0] ||
            "",
          image,
        })
      );
    }

    if (product.image) {
      return [
        {
          color:
            product.colors?.[0] ||
            "",
          image:
            product.image,
        },
      ];
    }

    return [];
  }, [product]);

  /*
    Always use the first real product image
    as the base photograph.
  */
  const originalImage =
    productImages[0]?.image ||
    getProductImage(product);

  /*
    Product mask.
  */
  const garmentMask = product
    ? `/product-masks/${product.id}.png`
    : "";

  /*
    INITIAL STATE
  */
  useEffect(() => {
    if (!product) {
      return;
    }

    const wishlist =
      JSON.parse(
        localStorage.getItem(
          "threadloom-wishlist"
        )
      ) || [];

    setSelectedColor(
      product.colors?.[0] || ""
    );

    setSelectedSize("");

    setQuantity(1);

    setAdded(false);

    setWishlisted(
      wishlist.some(
        (item) =>
          Number(item.id) ===
          Number(product.id)
      )
    );
  }, [product]);

  /*
    RELATED PRODUCTS
  */
  const relatedProducts = useMemo(() => {
    if (!product) {
      return [];
    }

    return products
      .filter(
        (item) =>
          item.id !== product.id &&
          item.category ===
            product.category
      )
      .slice(0, 4);
  }, [product]);

  /*
    PRODUCT NOT FOUND
  */
  if (!product) {
    return (
      <section className="product-not-found">
        <p>
          THREADLOOM / PRODUCT
        </p>

        <h1>
          Product not found.
        </h1>

        <Link to="/shop">
          BACK TO SHOP
        </Link>
      </section>
    );
  }

  /*
    COLOR CHANGE
  */
  const handleColorChange = (
    color
  ) => {
    setSelectedColor(color);
    setAdded(false);
  };

  /*
    QUANTITY
  */
  const decreaseQuantity = () => {
    setQuantity(
      (current) =>
        Math.max(
          1,
          current - 1
        )
    );
  };

  const increaseQuantity = () => {
    setQuantity(
      (current) =>
        current + 1
    );
  };

  /*
    WISHLIST
  */
  const toggleWishlist = () => {
    const wishlist =
      JSON.parse(
        localStorage.getItem(
          "threadloom-wishlist"
        )
      ) || [];

    const exists =
      wishlist.some(
        (item) =>
          Number(item.id) ===
          Number(product.id)
      );

    let updatedWishlist;

    if (exists) {
      updatedWishlist =
        wishlist.filter(
          (item) =>
            Number(item.id) !==
            Number(product.id)
        );
    } else {
      updatedWishlist = [
        ...wishlist,
        {
          id: product.id,
          name: product.name,
          category:
            product.category,
          subcategory:
            product.subcategory,
          price: product.price,
          colors:
            product.colors,
          sizes:
            product.sizes,
          images:
            product.images,
          selectedColor,
          image:
            originalImage,
        },
      ];
    }

    localStorage.setItem(
      "threadloom-wishlist",
      JSON.stringify(
        updatedWishlist
      )
    );

    setWishlisted(!exists);

    window.dispatchEvent(
      new Event(
        "threadloom-wishlist-updated"
      )
    );
  };

  /*
    ADD TO CART
  */
  const handleAddToCart = () => {
    if (
      product.sizes?.length > 0 &&
      !selectedSize
    ) {
      alert(
        "Please select a size."
      );
      return;
    }

    const cart =
      JSON.parse(
        localStorage.getItem(
          "threadloom-cart"
        )
      ) || [];

    const cartKey =
      `${product.id}-${selectedColor}-${selectedSize}`;

    const existingIndex =
      cart.findIndex(
        (item) =>
          item.cartKey ===
          cartKey
      );

    const updatedCart = [
      ...cart,
    ];

    if (existingIndex !== -1) {
      updatedCart[
        existingIndex
      ] = {
        ...updatedCart[
          existingIndex
        ],
        quantity:
          updatedCart[
            existingIndex
          ].quantity +
          quantity,
      };
    } else {
      updatedCart.push({
        cartKey,
        id: product.id,
        name: product.name,
        category:
          product.category,
        subcategory:
          product.subcategory,
        price: product.price,
        quantity,
        size: selectedSize,
        color: selectedColor,
        image: originalImage,
        images:
          product.images,
      });
    }

    localStorage.setItem(
      "threadloom-cart",
      JSON.stringify(
        updatedCart
      )
    );

    window.dispatchEvent(
      new Event(
        "threadloom-cart-updated"
      )
    );

    setAdded(true);
  };

  return (
    <main className="product-details-page">

      {/* BREADCRUMB */}

      <div className="product-breadcrumb container">
        <Link to="/shop">
          SHOP
        </Link>

        <span>/</span>

        <span>
          {product.category}
        </span>

        <span>/</span>

        <span>
          {product.subcategory}
        </span>
      </div>

      {/* MAIN PRODUCT */}

      <section className="product-main container">

        {/* IMAGE */}

        <div className="product-gallery">

          <div className="product-main-image-wrap">

            <ProductColorImage
              src={originalImage}
              mask={garmentMask}
              alt={`${product.name} in ${selectedColor}`}
              color={selectedColor}
            />

            <button
              type="button"
              className="product-image-zoom"
              onClick={() =>
                setZoomOpen(true)
              }
            >
              CLICK TO ZOOM
            </button>

          </div>

        </div>

        {/* PRODUCT INFO */}

        <div className="product-info">

          <div className="product-info-top">

            <p className="product-info-category">
              {product.category} /{" "}
              {product.subcategory}
            </p>

            <button
              type="button"
              className={`product-detail-wishlist ${
                wishlisted
                  ? "active"
                  : ""
              }`}
              onClick={
                toggleWishlist
              }
              aria-label={
                wishlisted
                  ? "Remove from wishlist"
                  : "Add to wishlist"
              }
            >
              <Heart
                size={20}
                strokeWidth={1.3}
                fill={
                  wishlisted
                    ? "currentColor"
                    : "none"
                }
              />
            </button>

          </div>

          <h1 className="product-detail-title">
            {product.name}
          </h1>

          <p className="product-detail-price">
            ₹
            {product.price.toLocaleString(
              "en-IN"
            )}
          </p>

          <div className="product-detail-line" />

          <p className="product-detail-description">
            {product.description}
          </p>

          {/* COLOR */}

          {product.colors?.length > 0 && (
            <div className="product-option">

              <div className="product-option-heading">

                <span>
                  COLOR
                </span>

                <strong>
                  {selectedColor}
                </strong>

              </div>

              <div className="product-detail-colors">

                {product.colors.map(
                  (color) => (
                    <button
                      key={color}
                      type="button"
                      className={`product-detail-color ${
                        selectedColor ===
                        color
                          ? "selected"
                          : ""
                      }`}
                      onClick={() =>
                        handleColorChange(
                          color
                        )
                      }
                    >

                      <span
                        className={`detail-color-swatch color-${color
                          .toLowerCase()
                          .replace(
                            /\s+/g,
                            "-"
                          )}`}
                      />

                      <span>
                        {color}
                      </span>

                    </button>
                  )
                )}

              </div>

            </div>
          )}

          {/* SIZE */}

          {product.sizes?.length > 0 && (
            <div className="product-option">

              <div className="product-option-heading">

                <span>
                  SIZE
                </span>

                <Link to="/size-guide">
                  SIZE GUIDE
                  <ArrowUpRight
                    size={12}
                    strokeWidth={1.4}
                  />
                </Link>

              </div>

              <div className="product-detail-sizes">

                {product.sizes.map(
                  (size) => (
                    <button
                      key={size}
                      type="button"
                      className={
                        selectedSize ===
                        size
                          ? "selected"
                          : ""
                      }
                      onClick={() =>
                        setSelectedSize(
                          size
                        )
                      }
                    >
                      {size}
                    </button>
                  )
                )}

              </div>

            </div>
          )}

          {/* QUANTITY */}

          <div className="product-option">

            <div className="product-option-heading">
              <span>
                QUANTITY
              </span>
            </div>

            <div className="product-quantity">

              <button
                type="button"
                onClick={
                  decreaseQuantity
                }
                aria-label="Decrease quantity"
              >
                <Minus
                  size={15}
                  strokeWidth={1.4}
                />
              </button>

              <span>
                {quantity}
              </span>

              <button
                type="button"
                onClick={
                  increaseQuantity
                }
                aria-label="Increase quantity"
              >
                <Plus
                  size={15}
                  strokeWidth={1.4}
                />
              </button>

            </div>

          </div>

          {/* ADD TO CART */}

          <button
            type="button"
            className={`product-add-cart ${
              added ? "added" : ""
            }`}
            onClick={
              handleAddToCart
            }
          >

            <span>
              {added
                ? "ADDED TO BAG"
                : "ADD TO BAG"}
            </span>

            <ArrowUpRight
              size={17}
              strokeWidth={1.4}
            />

          </button>

          {added && (
            <button
              type="button"
              className="product-view-cart"
              onClick={() =>
                navigate("/cart")
              }
            >
              VIEW BAG

              <ArrowRight
                size={14}
                strokeWidth={1.4}
              />
            </button>
          )}

          {/* DETAILS */}

          <div className="product-extra-details">

            <div>
              <span>
                AVAILABILITY
              </span>

              <strong>
                {product.availability}
              </strong>
            </div>

            <div>
              <span>
                PRODUCT TYPE
              </span>

              <strong>
                {product.type}
              </strong>
            </div>

            <div>
              <span>
                STYLE
              </span>

              <strong>
                {product.subcategory}
              </strong>
            </div>

          </div>

        </div>

      </section>

      {/* RELATED PRODUCTS */}

      {relatedProducts.length > 0 && (
        <section className="related-products container">

          <div className="related-products-heading">

            <div>

              <p>
                THREADLOOM / YOU MAY ALSO LIKE
              </p>

              <h2>
                Complete
                <br />
                <em>
                  the look.
                </em>
              </h2>

            </div>

            <Link to="/shop">
              VIEW ALL

              <ArrowUpRight
                size={14}
                strokeWidth={1.4}
              />
            </Link>

          </div>

          <div className="related-products-grid">

            {relatedProducts.map(
              (item) => {

                /*
                  FIX:
                  Always resolve the actual
                  product image correctly.

                  Old code was:

                  item.images?.[
                    item.colors?.[0]
                  ]

                  That fails when images
                  is an array.
                */

                const image =
                  getProductImage(item);

                return (
                  <Link
                    key={item.id}
                    to={`/product/${item.id}`}
                    className="related-product-card"
                  >

                    <div className="related-product-image">

                      {image ? (
                        <img
                          src={image}
                          alt={item.name}
                          loading="lazy"
                          onError={(event) => {
                            event.currentTarget.style.display =
                              "none";
                          }}
                        />
                      ) : (
                        <div
                          style={{
                            width: "100%",
                            height: "100%",
                            background:
                              "#eeeae3",
                          }}
                        />
                      )}

                    </div>

                    <div className="related-product-info">

                      <span>
                        {item.category} /{" "}
                        {item.subcategory}
                      </span>

                      <strong>
                        {item.name}
                      </strong>

                      <p>
                        ₹
                        {item.price.toLocaleString(
                          "en-IN"
                        )}
                      </p>

                    </div>

                  </Link>
                );
              }
            )}

          </div>

        </section>
      )}

      {/* ZOOM */}

      {zoomOpen && (
        <div
          className="product-zoom-modal"
          onClick={() =>
            setZoomOpen(false)
          }
        >

          <button
            type="button"
            className="product-zoom-close"
            onClick={() =>
              setZoomOpen(false)
            }
            aria-label="Close zoom"
          >
            <X
              size={22}
              strokeWidth={1.3}
            />
          </button>

          <ProductColorImage
            src={originalImage}
            mask={garmentMask}
            alt={product.name}
            color={selectedColor}
          />

        </div>
      )}

    </main>
  );
}

export default ProductDetails;