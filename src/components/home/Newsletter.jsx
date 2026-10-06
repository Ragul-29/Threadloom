import { useState } from "react";
import { ArrowRight } from "lucide-react";
import "./Newsletter.css";

function Newsletter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!email.trim()) {
      return;
    }

    setSubmitted(true);
    setEmail("");
  };

  return (
    <section className="newsletter">
      <div className="newsletter-inner">
        <div className="newsletter-label">
          <span>THREADLOOM / STAY IN THE LOOP</span>
        </div>

        <div className="newsletter-content">
          <h2>
            Something good
            <br />
            is coming.
          </h2>

          <p>
            Sign up for new collections, limited releases and stories from
            Threadloom.
          </p>

          {submitted ? (
            <div className="newsletter-success">
              <span>THANK YOU.</span>
              <p>You’re now part of the Threadloom list.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="newsletter-form">
              <input
                type="email"
                placeholder="YOUR EMAIL ADDRESS"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
                aria-label="Email address"
              />

              <button type="submit" aria-label="Subscribe">
                <span>SUBSCRIBE</span>
                <ArrowRight size={17} strokeWidth={1.4} />
              </button>
            </form>
          )}

          <span className="newsletter-note">
            By subscribing, you agree to receive Threadloom updates.
          </span>
        </div>
      </div>
    </section>
  );
}

export default Newsletter;