import { useEffect, useMemo, useState } from "react";
import { ArrowUpRight, Heart } from "lucide-react";
import { Link } from "react-router-dom";
import "./ProductCard.css";

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=1200&q=90";

// Women product images
const WOMEN_PRODUCT_IMAGES = {
  1: "/women-01-anarkalis.png",
  2: "/women-02-short-kurtis.png",
  3: "/women-03-palazzo-sets.png",
  4: "/women-04-saree.png",
  5: "/women-05-leggings.png",
  6: "/women-06-skirts.png",
  7: "/women-07-bodycon.png",
  8: "/women-08-frock.png",
  9: "/women-09-wedding-lehenga.png",
  10: "/women-10-top-wear.png",
  11: "/women-11-jeans.png",
  12: "/women-12-cotton-saree.png",
  13: "/women-13-oversized-shirt.png",
  14: "/women-14-anarkali-kurta.png",
  15: "/women-15-straight-cut-kurta-set.png",
};

function ProductCard({ product }) {
  const [wishlisted, setWishlisted] = useState(false);
  const [imageError, setImageError] = useState(false);

  // 3D interaction states
  const [tilt, setTilt] = useState({
    rotateX: 0,
    rotateY: 0,
  });

  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    if (!product) return;

    setImageError(false);

    try {
      const wishlist =
        JSON.parse(
          localStorage.getItem("threadloom-wishlist") || "[]"
        ) || [];

      setWishlisted(
        wishlist.some(
          (item) => Number(item.id) === Number(product.id)
        )
      );
    } catch {
      setWishlisted(false);
    }
  }, [product]);

  const productImages = useMemo(() => {
    if (!product) return [];

    if (Array.isArray(product.images)) {
      return product.images.filter(Boolean);
    }

    if (product.images && typeof product.images === "object") {
      return Object.values(product.images).filter(Boolean);
    }

    if (product.image) {
      return [product.image];
    }

    return [];
  }, [product]);

  // Use local images for Women products 1-15
  const localWomenImage =
    String(product?.category || "").toUpperCase() === "WOMEN"
      ? WOMEN_PRODUCT_IMAGES[Number(product.id)]
      : null;

  const externalImage =
    productImages[0] || FALLBACK_IMAGE;

  const finalImage =
    localWomenImage || externalImage;

  // 3D tilt + image parallax
  const handleMouseMove = (event) => {
    const card = event.currentTarget;

    const rect = card.getBoundingClientRect();

    const x =
      event.clientX - rect.left;

    const y =
      event.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateY =
      ((x - centerX) / centerX) * 5;

    const rotateX =
      ((centerY - y) / centerY) * 5;

    setTilt({
      rotateX,
      rotateY,
    });
  };

  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);

    setTilt({
      rotateX: 0,
      rotateY: 0,
    });
  };

  const toggleWishlist = (event) => {
    event.preventDefault();
    event.stopPropagation();

    try {
      const wishlist =
        JSON.parse(
          localStorage.getItem("threadloom-wishlist") || "[]"
        ) || [];

      const exists = wishlist.some(
        (item) => Number(item.id) === Number(product.id)
      );

      let updatedWishlist;

      if (exists) {
        updatedWishlist = wishlist.filter(
          (item) => Number(item.id) !== Number(product.id)
        );
      } else {
        updatedWishlist = [
          ...wishlist,
          {
            id: product.id,
            name: product.name,
            category: product.category,
            subcategory: product.subcategory,
            type: product.type,
            price: product.price,
            sizes: product.sizes,
            images: product.images,
            image: finalImage,
          },
        ];
      }

      localStorage.setItem(
        "threadloom-wishlist",
        JSON.stringify(updatedWishlist)
      );

      setWishlisted(!exists);

      window.dispatchEvent(
        new Event("threadloom-wishlist-updated")
      );
    } catch {
      // Ignore malformed localStorage data
    }
  };

  if (!product) return null;

  return (
    <article
      className={`product-card ${
        isHovering ? "product-card-3d-active" : ""
      }`}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `
          perspective(1200px)
          rotateX(${tilt.rotateX}deg)
          rotateY(${tilt.rotateY}deg)
          translateZ(${isHovering ? "8px" : "0px"})
        `,
        transition: isHovering
          ? "transform 0.08s ease-out"
          : "transform 0.45s cubic-bezier(0.22, 1, 0.36, 1)",
      }}
    >
      <div className="product-card-image-wrap">
        <Link
          to={`/product/${product.id}`}
          className="product-card-image-link"
          aria-label={`View ${product.name}`}
        >
          <img
            src={imageError ? externalImage : finalImage}
            alt={product.name}
            className="product-card-image"
            loading="lazy"
            onError={() => setImageError(true)}
            style={{
              transform: isHovering
                ? `scale(1.045) translate(
                    ${tilt.rotateY * -0.7}px,
                    ${tilt.rotateX * -0.7}px
                  )`
                : "scale(1) translate(0, 0)",
              transition: isHovering
                ? "transform 0.12s ease-out"
                : "transform 0.5s cubic-bezier(0.22, 1, 0.36, 1)",
            }}
          />
        </Link>

        <div className="product-card-top">
          <span className="product-card-badge">
            {product.availability === "In Stock"
              ? "IN STOCK"
              : product.availability}
          </span>

          <button
            type="button"
            className={`product-wishlist ${
              wishlisted ? "active" : ""
            }`}
            onClick={toggleWishlist}
            aria-label={
              wishlisted
                ? "Remove from wishlist"
                : "Add to wishlist"
            }
          >
            <Heart
              size={16}
              strokeWidth={1.4}
              fill={wishlisted ? "currentColor" : "none"}
            />
          </button>
        </div>

        <Link
          to={`/product/${product.id}`}
          className="product-quick-view"
        >
          VIEW PRODUCT

          <ArrowUpRight
            size={13}
            strokeWidth={1.4}
          />
        </Link>
      </div>

      <div className="product-card-info">
        <div className="product-card-category">
          {product.category}

          {product.subcategory
            ? ` / ${product.subcategory}`
            : ""}
        </div>

        <Link
          to={`/product/${product.id}`}
          className="product-card-name"
        >
          {product.name}
        </Link>

        <div className="product-card-bottom">
          <span className="product-card-price">
            ₹{Number(product.price).toLocaleString("en-IN")}
          </span>
        </div>

        {product.sizes?.length > 0 && (
          <div className="product-card-sizes">
            {product.sizes.map((size) => (
              <span key={size}>{size}</span>
            ))}
          </div>
        )}
      </div>
    </article>
  );
}

export default ProductCard;