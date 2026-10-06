import { useEffect, useState } from "react";
import {
  Check,
  Package,
  Truck,
  MapPin,
  ArrowLeft,
  ArrowRight,
} from "lucide-react";
import { Link, useParams } from "react-router-dom";
import "./Tracking.css";

const TRACKING_STEPS = [
  {
    key: "orderReceived",
    title: "Order Received",
    description: "Your order has been received successfully.",
    icon: Package,
  },
  {
    key: "orderConfirmed",
    title: "Order Confirmed",
    description:
      "Your payment has been confirmed and your order is being prepared.",
    icon: Check,
  },
  {
    key: "shipped",
    title: "Shipped",
    description:
      "Your package has been handed over to our delivery partner.",
    icon: Package,
  },
  {
    key: "outForDelivery",
    title: "Out for Delivery",
    description:
      "Your package is on the way to your delivery address.",
    icon: Truck,
  },
  {
    key: "delivered",
    title: "Delivered",
    description:
      "Your Threadloom order has been delivered.",
    icon: MapPin,
  },
];

function Tracking() {
  const { orderId } = useParams();

  const [order, setOrder] = useState(null);

  useEffect(() => {
    const savedOrder =
      JSON.parse(localStorage.getItem("threadloom-last-order")) ||
      JSON.parse(localStorage.getItem("threadloom-order"));

    if (savedOrder) {
      setOrder(savedOrder);
    }
  }, []);

  const tracking = order?.tracking || {
    orderReceived: true,
    orderConfirmed: true,
    shipped: false,
    outForDelivery: false,
    delivered: false,
  };

  const isCompleted = (key) => Boolean(tracking[key]);

  const getCurrentStatus = () => {
    if (tracking.delivered) return "DELIVERED";
    if (tracking.outForDelivery) return "OUT FOR DELIVERY";
    if (tracking.shipped) return "SHIPPED";
    if (tracking.orderConfirmed) return "ORDER CONFIRMED";
    return "ORDER RECEIVED";
  };

  const displayOrderId = order?.orderId || orderId || "TL00000";

  return (
    <main className="tracking-page">

      <section className="tracking-header container">
        <Link to="/shop" className="tracking-back">
          <ArrowLeft size={15} strokeWidth={1.4} />
          CONTINUE SHOPPING
        </Link>

        <p className="tracking-eyebrow">
          THREADLOOM / ORDER TRACKING
        </p>

        <h1>
          Track your
          <br />
          <em>order.</em>
        </h1>
      </section>

      <section className="tracking-summary container">

        <div className="tracking-order-info">
          <span>ORDER NUMBER</span>
          <strong>#{displayOrderId}</strong>
        </div>

        <div className="tracking-order-info">
          <span>CURRENT STATUS</span>
          <strong>{getCurrentStatus()}</strong>
        </div>

        <div className="tracking-order-info">
          <span>TOTAL</span>
          <strong>
            ₹
            {Number(order?.total || 0).toLocaleString("en-IN")}
          </strong>
        </div>

      </section>

      <section className="tracking-content container">

        <div className="tracking-title-row">

          <div>
            <p>ORDER JOURNEY</p>

            <h2>
              Your order
              <br />
              is on its way.
            </h2>
          </div>

          <div className="tracking-status-badge">
            {getCurrentStatus()}
          </div>

        </div>

        <div className="tracking-timeline">

          {TRACKING_STEPS.map((step, index) => {
            const completed = isCompleted(step.key);
            const Icon = step.icon;
            const isLast =
              index === TRACKING_STEPS.length - 1;

            return (
              <div
                key={step.key}
                className={`tracking-step ${
                  completed ? "completed" : ""
                }`}
              >

                <div className="tracking-step-marker">

                  <div className="tracking-icon">
                    {completed ? (
                      <Check
                        size={18}
                        strokeWidth={1.8}
                      />
                    ) : (
                      <Icon
                        size={18}
                        strokeWidth={1.3}
                      />
                    )}
                  </div>

                  {!isLast && (
                    <span className="tracking-line" />
                  )}

                </div>

                <div className="tracking-step-content">

                  <div className="tracking-step-heading">

                    <div>
                      <span className="tracking-step-number">
                        0{index + 1}
                      </span>

                      <h3>{step.title}</h3>
                    </div>

                    <span
                      className={`tracking-step-status ${
                        completed ? "done" : ""
                      }`}
                    >
                      {completed
                        ? "COMPLETED"
                        : "PENDING"}
                    </span>

                  </div>

                  <p>{step.description}</p>

                </div>

              </div>
            );
          })}

        </div>

      </section>

      {order?.items?.length > 0 && (
        <section className="tracking-products container">

          <div className="tracking-products-header">

            <div>
              <p>ORDER DETAILS</p>

              <h2>
                Your
                <br />
                <em>items.</em>
              </h2>
            </div>

            <Link to="/shop">
              SHOP MORE
              <ArrowRight
                size={15}
                strokeWidth={1.4}
              />
            </Link>

          </div>

          <div className="tracking-products-grid">

            {order.items.map((item, index) => {

              const image =
                item.image ||
                (Array.isArray(item.images)
                  ? item.images[0]
                  : "");

              return (
                <div
                  className="tracking-product"
                  key={
                    item.cartKey ||
                    `${item.id}-${index}`
                  }
                >

                  <div className="tracking-product-image">

                    {image ? (
                      <img
                        src={image}
                        alt={item.name}
                      />
                    ) : (
                      <div className="tracking-product-placeholder">
                        THREADLOOM
                      </div>
                    )}

                  </div>

                  <div className="tracking-product-info">

                    <p>
                      {item.category}
                      {item.subcategory
                        ? ` / ${item.subcategory}`
                        : ""}
                    </p>

                    <h3>{item.name}</h3>

                    {item.size && (
                      <span>
                        SIZE: {item.size}
                      </span>
                    )}

                    {item.color && (
                      <span>
                        COLOR: {item.color}
                      </span>
                    )}

                    <strong>
                      ₹
                      {Number(
                        item.price || 0
                      ).toLocaleString("en-IN")}
                    </strong>

                  </div>

                </div>
              );
            })}

          </div>

        </section>
      )}

      <section className="tracking-delivery container">

        <div>
          <p>DELIVERY ADDRESS</p>

          <h3>
            {order?.customer?.firstName || "Customer"}{" "}
            {order?.customer?.lastName || ""}
          </h3>

          <span>
            {order?.customer?.address ||
              "Delivery address"}
          </span>

          <span>
            {order?.customer?.city || ""}
            {order?.customer?.state
              ? `, ${order.customer.state}`
              : ""}
          </span>

          <span>
            {order?.customer?.pincode || ""}
          </span>
        </div>

        <div>
          <p>PAYMENT</p>

          <h3>
            {order?.paymentMethod || "PAYMENT"}
          </h3>

          <span>
            Payment confirmed
          </span>
        </div>

      </section>

      <section className="tracking-footer container">

        <p>
          THANK YOU FOR SHOPPING
          WITH THREADLOOM.
        </p>

        <h2>
          The art of
          <br />
          <em>everyday wear.</em>
        </h2>

        <Link
          to="/shop"
          className="tracking-shop-button"
        >
          SHOP COLLECTION

          <ArrowRight
            size={16}
            strokeWidth={1.4}
          />
        </Link>

      </section>

    </main>
  );
}

export default Tracking;