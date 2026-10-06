import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import "./Footer.css";

function Footer() {
  const handleNewsletterSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <footer className="footer">
      <div className="footer-main">
        <div className="footer-brand">
          <Link to="/" className="footer-logo">
            THREADLOOM
          </Link>

          <p>
            The art of everyday wear.
            <br />
            Contemporary clothing for
            <br />
            everyday expression.
          </p>

          <span className="footer-est">EST. 2026 / INDIA</span>
        </div>

        <div className="footer-column">
          <span className="footer-heading">SHOP</span>

          <Link to="/shop">NEW IN</Link>
          <Link to="/shop?category=WOMEN">WOMEN</Link>
          <Link to="/shop?category=MEN">MEN</Link>
          <Link to="/shop?category=KIDS">KIDS</Link>
          <Link to="/shop">ALL COLLECTIONS</Link>
        </div>

        <div className="footer-column">
          <span className="footer-heading">HELP</span>

          <Link to="/size-guide">SIZE GUIDE</Link>
          <Link to="/account">ACCOUNT</Link>
          <Link to="/wishlist">WISHLIST</Link>
          <Link to="/cart">BAG</Link>
          <Link to="/about">ABOUT US</Link>
        </div>

        <div className="footer-column footer-contact">
          <span className="footer-heading">CONTACT</span>

          <a href="mailto:hello@threadloom.com">
            EMAIL
            <ArrowUpRight size={13} strokeWidth={1.4} />
          </a>

          <a
            href="https://instagram.com"
            target="_blank"
            rel="noreferrer"
          >
            INSTAGRAM
            <ArrowUpRight size={13} strokeWidth={1.4} />
          </a>

          <span>CHENNAI / INDIA</span>
        </div>
      </div>

      <div className="footer-newsletter">
        <div>
          <span className="footer-heading">STAY IN THE LOOP</span>

          <h2>
            Join the
            <br />
            Threadloom list.
          </h2>
        </div>

        <form onSubmit={handleNewsletterSubmit}>
          <input
            type="email"
            placeholder="YOUR EMAIL ADDRESS"
            aria-label="Email address"
            required
          />

          <button type="submit">
            <span>SUBSCRIBE</span>
            <ArrowUpRight size={16} strokeWidth={1.4} />
          </button>
        </form>
      </div>

      <div className="footer-bottom">
        <span>© 2026 THREADLOOM</span>

        <div>
          <Link to="/about">ABOUT</Link>
          <Link to="/size-guide">SIZE GUIDE</Link>
        </div>

        <span>THE ART OF EVERYDAY WEAR</span>
      </div>
    </footer>
  );
}

export default Footer;