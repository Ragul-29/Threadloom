import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import "./Hero.css";

const looks = [
  {
    id: "01",
    title: "FORM 01",
    image:
      "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1200&q=90",
  },
  {
    id: "02",
    title: "FORM 02",
    image:
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1200&q=90",
  },
  {
    id: "03",
    title: "FORM 03",
    image:
      "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1200&q=90",
  },
];

function Hero() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const smoothX = useSpring(mouseX, {
    stiffness: 80,
    damping: 20,
  });

  const smoothY = useSpring(mouseY, {
    stiffness: 80,
    damping: 20,
  });

  const backgroundX = useTransform(smoothX, [-500, 500], [-25, 25]);
  const backgroundY = useTransform(smoothY, [-500, 500], [-15, 15]);

  const titleX = useTransform(smoothX, [-500, 500], [-8, 8]);
  const titleY = useTransform(smoothY, [-500, 500], [-5, 5]);

  const handleMouseMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();

    const x = event.clientX - (rect.left + rect.width / 2);
    const y = event.clientY - (rect.top + rect.height / 2);

    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <section
      className="threadloom-hero"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="hero-background" />

      <motion.div
        className="hero-background-image"
        style={{
          x: backgroundX,
          y: backgroundY,
        }}
      />

      <div className="hero-grain" />

      <div className="hero-information">
        <span>EST. 2026</span>
        <span>THE ART OF EVERYDAY WEAR</span>
      </div>

      <motion.div
        className="hero-editorial"
        style={{
          x: titleX,
          y: titleY,
        }}
      >
        <motion.p
          className="hero-small-title"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          THREADLOOM / COLLECTION 01
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 80 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          THE ART
        </motion.h1>

        <motion.h1
          className="outline-title"
          initial={{ opacity: 0, y: 80 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.15 }}
        >
          OF EVERYDAY
        </motion.h1>

        <motion.h1
          initial={{ opacity: 0, y: 80 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          WEAR.
        </motion.h1>
      </motion.div>

      <div className="fashion-stage">
        {looks.map((look, index) => (
          <motion.div
            key={look.id}
            className={`fashion-card fashion-card-${index + 1}`}
            drag="x"
            dragConstraints={{
              left: -120,
              right: 120,
            }}
            dragElastic={0.25}
            whileDrag={{
              scale: 1.04,
              cursor: "grabbing",
            }}
            whileHover={{
              scale: 1.025,
            }}
            initial={{
              opacity: 0,
              y: 120,
              rotate: index === 0 ? -7 : index === 1 ? 2 : 7,
            }}
            animate={{
              opacity: 1,
              y: 0,
              rotate: index === 0 ? -7 : index === 1 ? 2 : 7,
            }}
            transition={{
              duration: 1.1,
              delay: 0.25 + index * 0.15,
              type: "spring",
              stiffness: 70,
            }}
          >
            <img
              src={look.image}
              alt={look.title}
              draggable="false"
            />

            <div className="fashion-card-overlay" />

            <div className="fashion-card-info">
              <span>{look.id}</span>
              <span>{look.title}</span>
            </div>
          </motion.div>
        ))}

        <div className="stage-glow" />
      </div>

      <div className="center-label">
        <span>DRAG</span>
        <div className="center-line" />
        <span>EXPLORE</span>
      </div>

      <div className="hero-description">
        <p>
          Contemporary silhouettes.
          <br />
          Designed for everyday expression.
        </p>
      </div>

      <Link to="/shop" className="hero-cta">
        <span>EXPLORE COLLECTION</span>

        <span className="hero-arrow">
          <ArrowUpRight size={17} strokeWidth={1.5} />
        </span>
      </Link>

      <div className="hero-side">
        <span>01</span>
        <span>THREADLOOM</span>
        <span>2026</span>
      </div>

      <div className="hero-scroll">
        <span>SCROLL TO DISCOVER</span>

        <div className="scroll-track">
          <div className="scroll-progress" />
        </div>
      </div>
    </section>
  );
}

export default Hero;