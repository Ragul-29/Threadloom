import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  Minus,
  Plus,
  Trash2,
} from "lucide-react";
import "./Cart.css";

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=1000&q=90";

function getProductImage(item) {
  if (!item) {
    return FALLBACK_IMAGE;
  }

  if (item.image) {
    return item.image;
  }

  if (Array.isArray(item.images)) {
    return item.images.find(Boolean) || FALLBACK_IMAGE;
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
}

function getCartKey(item) {
  return (
    item?.cartKey ||
    `${item?.id || "product"}-${item?.size || "default"}`
  );
}

function Cart() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const loadCart = () => {
      try {
        const savedCart =
          JSON.parse(
            localStorage.getItem("threadloom-cart")
          ) || [];

        setCart(
          Array.isArray(savedCart)
            ? savedCart
            : []
        );
      } catch {
        setCart([]);
      }
    };

    loadCart();

    window.addEventListener(
      "threadloom-cart-updated",
      loadCart
    );

    return () => {
      window.removeEventListener(
        "threadloom-cart-updated",
        loadCart
      );
    };
  }, []);

  const updateStorage = (updatedCart) => {
    setCart(updatedCart);

    localStorage.setItem(
      "threadloom-cart",
      JSON.stringify(updatedCart)
    );

    window.dispatchEvent(
      new Event("threadloom-cart-updated")
    );
  };

  const updateQuantity = (cartKey, change) => {
    const updatedCart = cart.map((item) => {
      if (getCartKey(item) !== cartKey) {
        return item;
      }

      const currentQuantity = Number(
        item.quantity || 1
      );

      return {
        ...item,
        quantity: Math.max(
          1,
          currentQuantity + change
        ),
      };
    });

    updateStorage(updatedCart);
  };

  const removeItem = (cartKey) => {
    const updatedCart = cart.filter(
      (item) => getCartKey(item) !== cartKey
    );

    updateStorage(updatedCart);
  };

  const subtotal = useMemo(() => {
    return cart.reduce(
      (total, item) =>
        total +
        Number(item.price || 0) *
          Number(item.quantity || 1),
      0
    );
  }, [cart]);

  const shipping =
    subtotal === 0
      ? 0
      : subtotal >= 2999
        ? 0
        : 99;

  const total = subtotal + shipping;

  const itemCount = cart.reduce(
    (total, item) =>
      total + Number(item.quantity || 1),
    0
  );

  if (cart.length === 0) {
    return (
      <main className="cart-page">
        <section className="cart-empty container">
          <p className="cart-eyebrow">
            THREADLOOM / YOUR BAG
          </p>

          <h1>
            Your bag is
            <br />
            <em>empty.</em>
          </h1>

          <p className="cart-empty-text">
            Looks like you haven't added anything
            yet. Explore the collection and find
            something you love.
          </p>

          <Link
            to="/shop"
            className="cart-shop-button"
          >
            CONTINUE SHOPPING
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
    <main className="cart-page">
      {/* ==================================================
          HEADER
      ================================================== */}

      <section className="cart-header container">
        <div>
          <p className="cart-eyebrow">
            THREADLOOM / YOUR BAG
          </p>

          <h1>
            Your
            <br />
            <em>bag.</em>
          </h1>
        </div>

        <div className="cart-count">
          {itemCount} ITEMS
        </div>
      </section>

      {/* ==================================================
          CART CONTENT
      ================================================== */}

      <section className="cart-content container">
        {/* ==================================================
            ITEMS
        ================================================== */}

        <div className="cart-items">
          <div className="cart-items-heading">
            <span>PRODUCT</span>
            <span>PRICE</span>
            <span>QUANTITY</span>
            <span>TOTAL</span>
          </div>

          {cart.map((item) => {
            const quantity = Number(
              item.quantity || 1
            );

            const price = Number(
              item.price || 0
            );

            const itemTotal = price * quantity;

            const cartKey = getCartKey(item);
            const image = getProductImage(item);

            return (
              <article
                className="cart-item"
                key={cartKey}
              >
                {/* ==================================================
                    PRODUCT
                ================================================== */}

                <div className="cart-product">
                  <Link
                    to={`/product/${item.id}`}
                    className="cart-product-image"
                  >
                    <img
                      src={image}
                      alt={item.name || "Threadloom product"}
                      loading="lazy"
                      onError={(event) => {
                        if (
                          event.currentTarget.src !==
                          FALLBACK_IMAGE
                        ) {
                          event.currentTarget.src =
                            FALLBACK_IMAGE;
                        }
                      }}
                    />
                  </Link>

                  <div className="cart-product-info">
                    <Link
                      to={`/product/${item.id}`}
                      className="cart-product-name"
                    >
                      {item.name}
                    </Link>

                    <span className="cart-product-category">
                      {item.category}
                    </span>

                    {/* SIZE ONLY */}
                    {item.size && (
                      <div className="cart-variant">
                        <span>
                          SIZE: {item.size}
                        </span>
                      </div>
                    )}

                    <button
                      type="button"
                      className="cart-remove-mobile"
                      onClick={() =>
                        removeItem(cartKey)
                      }
                    >
                      <Trash2
                        size={13}
                        strokeWidth={1.4}
                      />
                      REMOVE
                    </button>
                  </div>
                </div>

                {/* ==================================================
                    PRICE
                ================================================== */}

                <div className="cart-item-price">
                  ₹
                  {price.toLocaleString("en-IN")}
                </div>

                {/* ==================================================
                    QUANTITY
                ================================================== */}

                <div className="cart-item-quantity">
                  <button
                    type="button"
                    onClick={() =>
                      updateQuantity(
                        cartKey,
                        -1
                      )
                    }
                    aria-label="Decrease quantity"
                  >
                    <Minus
                      size={13}
                      strokeWidth={1.4}
                    />
                  </button>

                  <span>{quantity}</span>

                  <button
                    type="button"
                    onClick={() =>
                      updateQuantity(
                        cartKey,
                        1
                      )
                    }
                    aria-label="Increase quantity"
                  >
                    <Plus
                      size={13}
                      strokeWidth={1.4}
                    />
                  </button>
                </div>

                {/* ==================================================
                    TOTAL
                ================================================== */}

                <div className="cart-item-total">
                  <span>
                    ₹
                    {itemTotal.toLocaleString(
                      "en-IN"
                    )}
                  </span>

                  <button
                    type="button"
                    className="cart-remove-desktop"
                    onClick={() =>
                      removeItem(cartKey)
                    }
                    aria-label={`Remove ${
                      item.name || "product"
                    }`}
                  >
                    <Trash2
                      size={14}
                      strokeWidth={1.4}
                    />
                  </button>
                </div>
              </article>
            );
          })}

          <Link
            to="/shop"
            className="cart-continue"
          >
            <ArrowLeft
              size={14}
              strokeWidth={1.4}
            />
            CONTINUE SHOPPING
          </Link>
        </div>

        {/* ==================================================
            SUMMARY
        ================================================== */}

        <aside className="cart-summary">
          <p className="cart-summary-label">
            ORDER SUMMARY
          </p>

          <div className="cart-summary-row">
            <span>SUBTOTAL</span>

            <strong>
              ₹{subtotal.toLocaleString("en-IN")}
            </strong>
          </div>

          <div className="cart-summary-row">
            <span>SHIPPING</span>

            <strong>
              {shipping === 0
                ? "FREE"
                : `₹${shipping}`}
            </strong>
          </div>

          {subtotal > 0 && subtotal < 2999 && (
            <p className="cart-shipping-note">
              Add ₹
              {(2999 - subtotal).toLocaleString(
                "en-IN"
              )}{" "}
              more for free shipping.
            </p>
          )}

          <div className="cart-summary-total">
            <span>TOTAL</span>

            <strong>
              ₹{total.toLocaleString("en-IN")}
            </strong>
          </div>

          <Link
            to="/checkout"
            className="cart-checkout-button"
          >
            PROCEED TO CHECKOUT
            <ArrowRight
              size={15}
              strokeWidth={1.4}
            />
          </Link>

          <div className="cart-summary-note">
            <span>SECURE CHECKOUT</span>
            <span>
              FREE SHIPPING OVER ₹2,999
            </span>
            <span>EASY RETURNS</span>
          </div>
        </aside>
      </section>
    </main>
  );
}

export default Cart;