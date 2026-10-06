import ProductCard from "./ProductCard";
import "./ProductGrid.css";

function ProductGrid({ products = [] }) {
  if (products.length === 0) {
    return (
      <div className="product-grid-empty">
        <p>No products available.</p>
      </div>
    );
  }

  return (
    <div className="product-grid">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
        />
      ))}
    </div>
  );
}

export default ProductGrid;