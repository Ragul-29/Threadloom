import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import products from "../../data/products";
import ProductCard from "../product/ProductCard";
import "./NewArrivals.css";

function NewArrivals() {
  const newArrivals = products.slice(0, 8);

  return (
    <section className="new-arrivals">
      <div className="new-arrivals-header">
        <div>
          <p className="section-label">
            THREADLOOM / NEW ARRIVALS
          </p>

          <h2>
            The latest
            <br />
            essentials.
          </h2>
        </div>

        <Link
          to="/shop"
          className="new-arrivals-link"
        >
          <span>SHOP ALL</span>
          <ArrowUpRight
            size={16}
            strokeWidth={1.4}
          />
        </Link>
      </div>

      <div className="new-arrivals-grid">
        {newArrivals.map((product, index) => (
          <motion.div
            key={product.id}
            className="new-arrival-item"
            initial={{
              opacity: 0,
              y: 45,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
              amount: 0.15,
            }}
            transition={{
              duration: 0.7,
              delay: (index % 4) * 0.08,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <ProductCard product={product} />
          </motion.div>
        ))}
      </div>

      <div className="new-arrivals-bottom">
        <Link to="/shop">
          <span>EXPLORE ALL PRODUCTS</span>
          <ArrowUpRight
            size={17}
            strokeWidth={1.4}
          />
        </Link>
      </div>
    </section>
  );
}

export default NewArrivals;