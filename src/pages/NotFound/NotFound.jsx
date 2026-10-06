import { ArrowLeft, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import "./NotFound.css";

function NotFound() {
  return (
    <main className="not-found-page">
      <section className="not-found-inner container">
        <div className="not-found-number">404</div>

        <p className="not-found-eyebrow">
          THREADLOOM / PAGE NOT FOUND
        </p>

        <h1>
          This page
          <br />
          <em>got lost.</em>
        </h1>

        <p className="not-found-copy">
          The page you're looking for doesn't exist or may
          have moved somewhere else.
        </p>

        <div className="not-found-actions">
          <Link
            to="/"
            className="not-found-primary"
          >
            <ArrowLeft
              size={15}
              strokeWidth={1.4}
            />
            BACK HOME
          </Link>

          <Link
            to="/shop"
            className="not-found-secondary"
          >
            SHOP COLLECTION
            <ArrowRight
              size={15}
              strokeWidth={1.4}
            />
          </Link>
        </div>
      </section>
    </main>
  );
}

export default NotFound;