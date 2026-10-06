import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  Banknote,
  CheckCircle2,
  CreditCard,
  Smartphone,
} from "lucide-react";
import "./Checkout.css";

const CELEBRATION_PARTICLES = Array.from(
  { length: 95 },
  (_, index) => ({
    id: index,
    left: `${(index * 37) % 100}%`,
    delay: `${(index % 18) * 0.08}s`,
    duration: `${2.4 + (index % 9) * 0.18}s`,
    size: `${5 + (index % 5) * 2}px`,
    rotation: `${(index * 47) % 360}deg`,
  })
);

const FIREWORKS = Array.from(
  { length: 10 },
  (_, index) => ({
    id: index,
    left: `${12 + ((index * 17) % 76)}%`,
    top: `${14 + ((index * 23) % 45)}%`,
    delay: `${(index % 5) * 0.28}s`,
  })
);

function createOrderId() {
  const number = Math.floor(100000 + Math.random() * 900000);
  return `TL${number}`;
}

function Checkout() {
  const [cart, setCart] = useState([]);
  const [paymentMethod, setPaymentMethod] =
    useState("UPI");
  const [orderPlaced, setOrderPlaced] =
    useState(false);
  const [showTracking, setShowTracking] =
    useState(false);
  const [orderId, setOrderId] = useState("");

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  useEffect(() => {
    const savedCart =
      JSON.parse(
        localStorage.getItem("threadloom-cart")
      ) || [];

    setCart(savedCart);
  }, []);

  useEffect(() => {
    if (!orderPlaced) return;

    const timer = setTimeout(() => {
      setShowTracking(true);
    }, 4500);

    return () => clearTimeout(timer);
  }, [orderPlaced]);

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
    subtotal === 0 || subtotal >= 2999
      ? 0
      : 99;

  const total = subtotal + shipping;

  const updateField = (event) => {
    const { name, value } = event.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const placeOrder = (event) => {
    event.preventDefault();

    if (cart.length === 0) {
      alert("Your bag is empty.");
      return;
    }

    if (
      !form.firstName ||
      !form.email ||
      !form.phone ||
      !form.address ||
      !form.city ||
      !form.state ||
      !form.pincode
    ) {
      alert(
        "Please fill all required delivery details."
      );
      return;
    }

    const newOrderId = createOrderId();

    const orderData = {
      orderId: newOrderId,
      paymentMethod,
      customer: form,
      items: cart,
      subtotal,
      shipping,
      total,
      status: "Order Confirmed",
      createdAt: new Date().toISOString(),
    };

    localStorage.setItem(
      "threadloom-last-order",
      JSON.stringify(orderData)
    );

    setOrderId(newOrderId);
    setShowTracking(false);
    setOrderPlaced(true);

    localStorage.removeItem("threadloom-cart");

    window.dispatchEvent(
      new Event("threadloom-cart-updated")
    );

    window.dispatchEvent(
      new Event("cartUpdated")
    );
  };

  /* ======================================================
     ORDER SUCCESS + CELEBRATION
  ====================================================== */

  if (orderPlaced) {
    return (
      <main className="checkout-page celebration-page">
        <div className="celebration-background">
          <div className="celebration-glow glow-one" />
          <div className="celebration-glow glow-two" />
          <div className="celebration-glow glow-three" />

          {FIREWORKS.map((firework) => (
            <div
              key={firework.id}
              className="firework"
              style={{
                left: firework.left,
                top: firework.top,
                animationDelay: firework.delay,
              }}
            >
              {Array.from(
                { length: 16 },
                (_, particleIndex) => (
                  <span
                    key={particleIndex}
                    style={{
                      "--angle": `${
                        particleIndex * 22.5
                      }deg`,
                    }}
                  />
                )
              )}
            </div>
          ))}

          <div className="confetti-rain">
            {CELEBRATION_PARTICLES.map(
              (particle) => (
                <span
                  key={particle.id}
                  className="confetti-piece"
                  style={{
                    left: particle.left,
                    animationDelay:
                      particle.delay,
                    animationDuration:
                      particle.duration,
                    width: particle.size,
                    height: particle.size,
                    transform: `rotate(${particle.rotation})`,
                  }}
                />
              )
            )}
          </div>
        </div>

        <div className="checkout-success container">
          <div className="success-icon-wrap">
            <CheckCircle2
              size={58}
              strokeWidth={1.2}
            />
          </div>

          <p className="success-eyebrow">
            THREADLOOM / ORDER CONFIRMED
          </p>

          <h1>
            Thank you
            <br />
            <em>for your order.</em>
          </h1>

          <span className="success-message">
            Your Threadloom order has been
            successfully placed.
          </span>

          <div className="order-number">
            ORDER #{orderId}
          </div>

          {!showTracking && (
            <div className="celebration-status">
              <span className="status-dot" />
              Preparing your order...
            </div>
          )}

          {showTracking && (
            <div className="success-actions">
              <Link
                to={`/tracking/${orderId}`}
                className="track-order-link"
              >
                <span>TRACK YOUR ORDER</span>
                <ArrowRight
                  size={17}
                  strokeWidth={1.4}
                />
              </Link>

              <Link
                to="/shop"
                className="continue-shopping-link"
              >
                CONTINUE SHOPPING
              </Link>
            </div>
          )}
        </div>
      </main>
    );
  }

  /* ======================================================
     EMPTY CHECKOUT
  ====================================================== */

  if (cart.length === 0) {
    return (
      <main className="checkout-page">
        <div className="checkout-empty container">
          <p>THREADLOOM / CHECKOUT</p>

          <h1>
            Your bag
            <br />
            <em>is empty.</em>
          </h1>

          <Link
            to="/shop"
            className="checkout-empty-link"
          >
            SHOP COLLECTION
            <ArrowRight size={16} />
          </Link>
        </div>
      </main>
    );
  }

  /* ======================================================
     CHECKOUT
  ====================================================== */

  return (
    <main className="checkout-page">
      <section className="checkout-header container">
        <Link
          to="/cart"
          className="checkout-back"
        >
          <ArrowLeft
            size={14}
            strokeWidth={1.4}
          />
          BACK TO BAG
        </Link>

        <p>THREADLOOM / CHECKOUT</p>

        <h1>
          Complete
          <br />
          <em>your order.</em>
        </h1>
      </section>

      <section className="checkout-section-wrapper container">
        <form
          className="checkout-layout"
          onSubmit={placeOrder}
        >
          <div className="checkout-main">
            <section className="checkout-section">
              <p className="checkout-label">
                01 — DELIVERY
              </p>

              <h2>Delivery details</h2>

              <div className="checkout-form">
                <label>
                  FIRST NAME
                  <input
                    type="text"
                    name="firstName"
                    value={form.firstName}
                    onChange={updateField}
                    autoComplete="given-name"
                    required
                  />
                </label>

                <label>
                  LAST NAME
                  <input
                    type="text"
                    name="lastName"
                    value={form.lastName}
                    onChange={updateField}
                    autoComplete="family-name"
                  />
                </label>

                <label>
                  EMAIL
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={updateField}
                    autoComplete="email"
                    required
                  />
                </label>

                <label>
                  PHONE
                  <input
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={updateField}
                    autoComplete="tel"
                    required
                  />
                </label>

                <label className="full">
                  ADDRESS
                  <input
                    type="text"
                    name="address"
                    value={form.address}
                    onChange={updateField}
                    autoComplete="street-address"
                    required
                  />
                </label>

                <label>
                  CITY
                  <input
                    type="text"
                    name="city"
                    value={form.city}
                    onChange={updateField}
                    autoComplete="address-level2"
                    required
                  />
                </label>

                <label>
                  STATE
                  <input
                    type="text"
                    name="state"
                    value={form.state}
                    onChange={updateField}
                    autoComplete="address-level1"
                    required
                  />
                </label>

                <label>
                  PINCODE
                  <input
                    type="text"
                    name="pincode"
                    value={form.pincode}
                    onChange={updateField}
                    autoComplete="postal-code"
                    inputMode="numeric"
                    maxLength="6"
                    required
                  />
                </label>
              </div>
            </section>

            <section className="checkout-section">
              <p className="checkout-label">
                02 — PAYMENT
              </p>

              <h2>Payment method</h2>

              <div className="payment-options">
                <button
                  type="button"
                  className={`payment-option ${
                    paymentMethod === "UPI"
                      ? "active"
                      : ""
                  }`}
                  onClick={() =>
                    setPaymentMethod("UPI")
                  }
                >
                  <span className="payment-icon">
                    <Smartphone
                      size={18}
                      strokeWidth={1.4}
                    />
                  </span>

                  <span className="payment-copy">
                    <strong>UPI</strong>
                    <small>
                      Google Pay · PhonePe ·
                      Paytm
                    </small>
                  </span>

                  <span className="payment-radio" />
                </button>

                <button
                  type="button"
                  className={`payment-option ${
                    paymentMethod === "CARD"
                      ? "active"
                      : ""
                  }`}
                  onClick={() =>
                    setPaymentMethod("CARD")
                  }
                >
                  <span className="payment-icon">
                    <CreditCard
                      size={18}
                      strokeWidth={1.4}
                    />
                  </span>

                  <span className="payment-copy">
                    <strong>CARD</strong>
                    <small>
                      Credit / Debit Card
                    </small>
                  </span>

                  <span className="payment-radio" />
                </button>

                <button
                  type="button"
                  className={`payment-option ${
                    paymentMethod === "COD"
                      ? "active"
                      : ""
                  }`}
                  onClick={() =>
                    setPaymentMethod("COD")
                  }
                >
                  <span className="payment-icon">
                    <Banknote
                      size={18}
                      strokeWidth={1.4}
                    />
                  </span>

                  <span className="payment-copy">
                    <strong>
                      CASH ON DELIVERY
                    </strong>
                    <small>
                      Pay when your order
                      arrives
                    </small>
                  </span>

                  <span className="payment-radio" />
                </button>
              </div>

              <div className="payment-info">
                {paymentMethod === "UPI" &&
                  "You will be able to pay using your preferred UPI app."}

                {paymentMethod === "CARD" &&
                  "Card details will be securely handled by the payment gateway."}

                {paymentMethod === "COD" &&
                  "Pay when your Threadloom order is delivered."}
              </div>
            </section>

            <section className="checkout-trust">
              <div>
                <strong>SECURE CHECKOUT</strong>
                <span>
                  Your order details are handled
                  securely.
                </span>
              </div>

              <div>
                <strong>7 DAY RETURNS</strong>
                <span>
                  Easy returns within 7 days.
                </span>
              </div>
            </section>
          </div>

          <aside className="checkout-summary">
            <p className="checkout-summary-label">
              ORDER SUMMARY
            </p>

            <div className="checkout-products">
              {cart.map((item) => {
                const itemImage =
                  item.image ||
                  item.images?.[item.color] ||
                  item.images?.[
                    item.colors?.[0]
                  ] ||
                  "";

                return (
                  <div
                    className="checkout-product"
                    key={
                      item.cartKey ||
                      `${item.id}-${item.size}-${item.color}`
                    }
                  >
                    <div className="checkout-product-image">
                      <img
                        src={itemImage}
                        alt={item.name}
                      />
                    </div>

                    <div className="checkout-product-info">
                      <span>{item.name}</span>

                      <small>
                        {item.color &&
                          `Color: ${item.color}`}
                      </small>

                      <small>
                        {item.size &&
                          `Size: ${item.size}`}
                      </small>

                      <small>
                        Qty{" "}
                        {item.quantity || 1}
                      </small>
                    </div>

                    <strong>
                      ₹
                      {(
                        Number(
                          item.price || 0
                        ) *
                        Number(
                          item.quantity || 1
                        )
                      ).toLocaleString(
                        "en-IN"
                      )}
                    </strong>
                  </div>
                );
              })}
            </div>

            <div className="checkout-summary-row">
              <span>SUBTOTAL</span>

              <strong>
                ₹{subtotal.toLocaleString("en-IN")}
              </strong>
            </div>

            <div className="checkout-summary-row">
              <span>SHIPPING</span>

              <strong>
                {shipping === 0
                  ? "FREE"
                  : `₹${shipping}`}
              </strong>
            </div>

            <div className="checkout-total">
              <span>TOTAL</span>

              <strong>
                ₹{total.toLocaleString("en-IN")}
              </strong>
            </div>

            <button
              type="submit"
              className="place-order-button"
            >
              PLACE ORDER
              <ArrowRight
                size={17}
                strokeWidth={1.4}
              />
            </button>

            <p className="secure-payment">
              Secure checkout ·{" "}
              {paymentMethod}
            </p>
          </aside>
        </form>
      </section>
    </main>
  );
}

export default Checkout;