import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useState } from "react";
import "./Testimonials.css";

const testimonials = [
  {
    quote:
      "The pieces feel effortless but still look considered. Exactly the kind of wardrobe I wanted.",
    name: "ANANYA R.",
    role: "THREADLOOM CUSTOMER",
  },
  {
    quote:
      "The fit, fabric and overall presentation feel much more premium than I expected.",
    name: "ARJUN M.",
    role: "THREADLOOM CUSTOMER",
  },
  {
    quote:
      "Simple silhouettes, beautiful details and pieces I can actually wear every day.",
    name: "MEERA S.",
    role: "THREADLOOM CUSTOMER",
  },
];

function Testimonials() {
  const [active, setActive] = useState(0);

  const previous = () => {
    setActive((current) =>
      current === 0 ? testimonials.length - 1 : current - 1
    );
  };

  const next = () => {
    setActive((current) =>
      current === testimonials.length - 1 ? 0 : current + 1
    );
  };

  const testimonial = testimonials[active];

  return (
    <section className="testimonials">
      <div className="testimonials-inner">
        <div className="testimonials-top">
          <span className="section-label">THREADLOOM / IN THEIR WORDS</span>

          <span className="testimonials-counter">
            {String(active + 1).padStart(2, "0")} /{" "}
            {String(testimonials.length).padStart(2, "0")}
          </span>
        </div>

        <div className="testimonials-content">
          <motion.div
            key={active}
            className="testimonial-quote"
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="testimonial-mark">“</span>

            <blockquote>{testimonial.quote}</blockquote>

            <div className="testimonial-author">
              <strong>{testimonial.name}</strong>
              <span>{testimonial.role}</span>
            </div>
          </motion.div>
        </div>

        <div className="testimonials-bottom">
          <div className="testimonial-progress">
            {testimonials.map((item, index) => (
              <button
                key={item.name}
                type="button"
                className={index === active ? "is-active" : ""}
                onClick={() => setActive(index)}
                aria-label={`View testimonial ${index + 1}`}
              />
            ))}
          </div>

          <div className="testimonial-controls">
            <button
              type="button"
              onClick={previous}
              aria-label="Previous testimonial"
            >
              <ArrowLeft size={18} strokeWidth={1.3} />
            </button>

            <button
              type="button"
              onClick={next}
              aria-label="Next testimonial"
            >
              <ArrowRight size={18} strokeWidth={1.3} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Testimonials;