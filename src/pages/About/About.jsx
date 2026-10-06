import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import "./About.css";

function About() {
  return (
    <main className="about-page">
      {/* HERO */}
      <section className="about-hero">
        <div className="container about-hero-inner">
          <p className="about-eyebrow">
            THREADLOOM / OUR STORY
          </p>

          <h1>
            Clothing
            <br />
            <em>with character.</em>
          </h1>

          <p className="about-hero-copy">
            We create modern clothing for people who want their
            everyday wardrobe to feel considered, expressive,
            and personal.
          </p>
        </div>
      </section>

      {/* STORY */}
      <section className="about-story">
        <div className="container about-story-grid">
          <div className="about-story-label">
            <p className="section-label">
              01 / THE THREAD
            </p>
          </div>

          <div className="about-story-content">
            <h2>
              Designed for
              <br />
              <em>everyday expression.</em>
            </h2>

            <p>
              Threadloom started with a simple idea: clothing
              should feel personal. Not just something you wear,
              but something that becomes part of how you move
              through the world.
            </p>

            <p>
              From everyday essentials to statement pieces,
              every collection is shaped around clean
              silhouettes, thoughtful details, and timeless
              style.
            </p>

            <Link
              to="/shop"
              className="about-inline-link"
            >
              EXPLORE THE COLLECTION
              <ArrowRight
                size={15}
                strokeWidth={1.4}
              />
            </Link>
          </div>
        </div>
      </section>

      {/* VALUES */}
      <section className="about-values">
        <div className="container">
          <div className="about-values-header">
            <p className="section-label">
              02 / WHAT WE BELIEVE
            </p>

            <h2>
              Less noise.
              <br />
              <em>More character.</em>
            </h2>
          </div>

          <div className="about-values-grid">
            <article className="about-value">
              <span>01</span>

              <h3>CONSIDERED DESIGN</h3>

              <p>
                Clean shapes, balanced proportions, and
                details that make every piece feel intentional.
              </p>
            </article>

            <article className="about-value">
              <span>02</span>

              <h3>EVERYDAY VERSATILITY</h3>

              <p>
                Pieces designed to move between different
                moments, moods, and ways of life.
              </p>
            </article>

            <article className="about-value">
              <span>03</span>

              <h3>PERSONAL STYLE</h3>

              <p>
                Fashion should give you room to express
                yourself rather than tell you who to be.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* EDITORIAL */}
      <section className="about-editorial">
        <div className="about-editorial-image">
          <img
            src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1800&q=85"
            alt="Threadloom fashion editorial"
            loading="lazy"
          />
        </div>

        <div className="about-editorial-overlay">
          <p className="section-label">
            03 / THE EDIT
          </p>

          <h2>
            Made to be
            <br />
            <em>remembered.</em>
          </h2>
        </div>
      </section>

      {/* COMMUNITY */}
      <section className="about-community">
        <div className="container about-community-inner">
          <p className="section-label">
            04 / JOIN THE STORY
          </p>

          <h2>
            Wear it.
            <br />
            <em>Make it yours.</em>
          </h2>

          <p>
            Discover new collections, styling ideas, and the
            people shaping the Threadloom community.
          </p>

          <a
            href="https://www.instagram.com/"
            target="_blank"
            rel="noreferrer"
            className="about-community-link"
          >
            FOLLOW THREADLOOM
            <ArrowRight
              size={15}
              strokeWidth={1.4}
            />
          </a>
        </div>
      </section>
    </main>
  );
}

export default About;