import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import "./FeaturedCollection.css";

const collections = [
  {
    number: "01",
    title: "THE EVERYDAY",
    subtitle: "Essential silhouettes",
    image:
      "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1600&q=90",
    category: "UNISEX",
  },
  {
    number: "02",
    title: "SOFT STRUCTURE",
    subtitle: "Modern womenswear",
    image:
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1600&q=90",
    category: "WOMEN",
  },
  {
    number: "03",
    title: "STUDIO FORM",
    subtitle: "Contemporary menswear",
    image:
      "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1600&q=90",
    category: "MEN",
  },
];

function FeaturedCollection() {
  return (
    <section className="featured-collection">
      <div className="featured-header">
        <div>
          <p className="section-label">THREADLOOM / COLLECTIONS</p>
          <h2>
            Designed for
            <br />
            everyday life.
          </h2>
        </div>

        <Link to="/shop" className="featured-view-all">
          <span>VIEW ALL</span>
          <ArrowUpRight size={16} strokeWidth={1.4} />
        </Link>
      </div>

      <div className="featured-list">
        {collections.map((collection, index) => (
          <motion.article
            key={collection.number}
            className="featured-item"
            initial={{ opacity: 0, y: 70 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{
              duration: 0.8,
              delay: index * 0.12,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <Link
              to={`/shop?category=${collection.category}`}
              className="featured-card"
            >
              <div className="featured-image-wrap">
                <motion.img
                  src={collection.image}
                  alt={collection.title}
                  loading={index === 0 ? "eager" : "lazy"}
                  whileHover={{ scale: 1.045 }}
                  transition={{ duration: 0.7 }}
                />

                <div className="featured-image-overlay" />

                <div className="featured-number">
                  {collection.number}
                </div>

                <div className="featured-arrow">
                  <ArrowUpRight size={20} strokeWidth={1.3} />
                </div>
              </div>

              <div className="featured-card-info">
                <div>
                  <span>{collection.subtitle}</span>
                  <h3>{collection.title}</h3>
                </div>

                <span className="featured-category">
                  {collection.category}
                </span>
              </div>
            </Link>
          </motion.article>
        ))}
      </div>
    </section>
  );
}

export default FeaturedCollection;