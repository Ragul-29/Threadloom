import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Package,
  UserRound,
  LogOut,
} from "lucide-react";
import "./Account.css";

const EMPTY_PROFILE = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
};

function Account() {
  const [activeTab, setActiveTab] = useState("profile");

  const [profile, setProfile] = useState(EMPTY_PROFILE);

  const [saved, setSaved] = useState(false);

  useEffect(() => {
    try {
      const storedProfile = JSON.parse(
        localStorage.getItem("threadloom-profile")
      );

      if (storedProfile && typeof storedProfile === "object") {
        setProfile({
          ...EMPTY_PROFILE,
          ...storedProfile,
        });
      }
    } catch {
      setProfile(EMPTY_PROFILE);
    }
  }, []);

  const updateField = (event) => {
    const { name, value } = event.target;

    setProfile((current) => ({
      ...current,
      [name]: value,
    }));

    setSaved(false);
  };

  const saveProfile = (event) => {
    event.preventDefault();

    localStorage.setItem(
      "threadloom-profile",
      JSON.stringify(profile)
    );

    setSaved(true);
  };

  const handleLogout = () => {
    alert("You are currently using guest mode.");
  };

  return (
    <section className="account-page">
      <div className="account-header">
        <p>THREADLOOM / ACCOUNT</p>

        <h1>
          Your
          <br />
          account.
        </h1>
      </div>

      <div className="account-layout">
        <aside className="account-sidebar">
          <button
            type="button"
            className={
              activeTab === "profile" ? "active" : ""
            }
            onClick={() => setActiveTab("profile")}
          >
            <UserRound size={17} />
            PROFILE
          </button>

          <button
            type="button"
            className={
              activeTab === "orders" ? "active" : ""
            }
            onClick={() => setActiveTab("orders")}
          >
            <Package size={17} />
            ORDERS
          </button>

          <Link to="/wishlist">
            WISHLIST
            <ArrowRight size={15} />
          </Link>

          <button
            type="button"
            className="account-logout"
            onClick={handleLogout}
          >
            <LogOut size={17} />
            LOG OUT
          </button>
        </aside>

        <main className="account-content">
          {activeTab === "profile" && (
            <div className="account-panel">
              <p className="account-label">
                01 — PROFILE
              </p>

              <h2>Personal details</h2>

              <form
                className="account-form"
                onSubmit={saveProfile}
              >
                <label>
                  FIRST NAME

                  <input
                    type="text"
                    name="firstName"
                    value={profile.firstName}
                    onChange={updateField}
                    placeholder="Your first name"
                    autoComplete="given-name"
                  />
                </label>

                <label>
                  LAST NAME

                  <input
                    type="text"
                    name="lastName"
                    value={profile.lastName}
                    onChange={updateField}
                    placeholder="Your last name"
                    autoComplete="family-name"
                  />
                </label>

                <label>
                  EMAIL

                  <input
                    type="email"
                    name="email"
                    value={profile.email}
                    onChange={updateField}
                    placeholder="you@example.com"
                    autoComplete="email"
                  />
                </label>

                <label>
                  PHONE

                  <input
                    type="tel"
                    name="phone"
                    value={profile.phone}
                    onChange={updateField}
                    placeholder="+91"
                    autoComplete="tel"
                  />
                </label>

                <button
                  type="submit"
                  className="account-save"
                >
                  SAVE DETAILS
                  <ArrowRight size={16} />
                </button>

                {saved && (
                  <p className="account-saved">
                    Your details have been saved.
                  </p>
                )}
              </form>
            </div>
          )}

          {activeTab === "orders" && (
            <div className="account-panel">
              <p className="account-label">
                02 — ORDERS
              </p>

              <h2>Order history</h2>

              <div className="account-empty">
                <Package
                  size={32}
                  strokeWidth={1.2}
                />

                <h3>No orders yet.</h3>

                <p>
                  Your completed Threadloom orders
                  will appear here.
                </p>

                <Link to="/shop">
                  EXPLORE COLLECTION
                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          )}
        </main>
      </div>
    </section>
  );
}

export default Account;