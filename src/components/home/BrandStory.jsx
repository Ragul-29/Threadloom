import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import "./BrandStory.css";

function BrandStory() {
  return (
    <section className="brand-story">
      <div className="brand-story-image">
        <motion.img
          src="https://images.unsplash.com/photo-1485968579580-b6d095142e6e?auto=format&fit=crop&w=1800&q=90"
          alt="Threadloom fashion collection"
          whileInView={{ scale: 1 }}
          initial={{ scale: 1.08 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        />

        <div className="brand-story-image-overlay" />

        <div className="brand-story-image-label">
          <span>THREADLOOM</span>
          <span>EST. 2026</span>
        </div>
      </div>

      <div className="brand-story-content">
        <div className="brand-story-label">
          <span>THREADLOOM / OUR PHILOSOPHY</span>
        </div>

        <div className="brand-story-copy">
          <motion.h2
            initial={{ opacity: 0, y: 45 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8 }}
          >
            Clothes made
            <br />
            for <em>real life.</em>
          </motion.h2>

          <p>
            Threadloom is built around the idea that everyday clothing can
            feel considered, effortless and personal.
          </p>

          <p>
            We create contemporary pieces with clean silhouettes, thoughtful
            details and an easy sense of movement.
          </p>

          <Link to="/about" className="brand-story-link">
            <span>OUR STORY</span>
            <ArrowUpRight size={17} strokeWidth={1.4} />
          </Link>
        </div>
      </div>

      <div className="brand-story-bottom">
        <span>01</span>
        <span>DESIGNED IN INDIA</span>
        <span>EVERYDAY ESSENTIALS</span>
        <span>2026</span>
      </div>
    </section>
  );
}

export default BrandStory;