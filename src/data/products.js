const CATALOG_IMAGE = "/threadloom-catalog.png";

const WOMEN_IMAGES = {
  1: "/women-01-anarkalis.png",
  2: "/women-02-short-kurtis.png",
  3: "/women-03-palazzo-sets.png",
  4: "/women-04-saree.png",
  5: "/women-05-leggings.png",
  6: "/women-06-skirts.png",
  7: "/women-07-bodycon.png",
  8: "/women-08-frock.png",
  9: "/women-09-wedding-lehenga.png",
  10: "/women-10-top-wear.png",
  11: "/women-11-jeans.png",
  12: "/women-12-cotton-saree.png",
  13: "/women-13-oversized-shirt.png",
  14: "/women-14-anarkali-kurta.png",
  15: "/women-15-straight-cut-kurta-set.png",
};

const MEN_IMAGES = {
  16: "/men-01-jeans.png",
  17: "/men-02-baggy-pants.png",
  18: "/men-03-formal-pants.png",
  19: "/men-04-formal-shirt.png",
  20: "/men-05-casual-shirt.png",
  21: "/men-06-tshirt.png",
  22: "/men-07-cargo-pants.png",
  23: "/men-08-suit.png",
  24: "/men-09-crew-neck.png",
  25: "/men-10-oversized-graphic.png",
  26: "/men-11-denim-jacket.png",
  27: "/men-12-bomber-jacket.png",
  28: "/men-13-overshirt-jacket.png",
  29: "/men-14-leather-jacket.png",
  30: "/men-15-utility-jacket.png",
  31: "/men-16-tailored-blazer.png",
  32: "/men-17-double-breasted-blazer.png",
  33: "/men-18-trench-coat.png",
};

const KIDS_IMAGES = {
  34: "/kids-01-floral-party-dress.png",
  35: "/kids-02-princess-tulle-dress.png",
  36: "/kids-03-cotton-frock.png",
  37: "/kids-04-denim-pinafore-dress.png",
  38: "/kids-05-ruffle-sleeve-dress.png",
  39: "/kids-06-cotton-casual-shirt.png",
  40: "/kids-07-printed-half-sleeve-shirt.png",
  41: "/kids-08-denim-shirt.png",
  42: "/kids-09-polo-tshirt.png",
  43: "/kids-10-graphic-tshirt.png",
  44: "/kids-11-striped-tshirt.png",
  45: "/kids-12-cotton-shorts-set.png",
  46: "/kids-13-cargo-jogger-set.png",
  47: "/kids-14-oversized-graphic.png",
  48: "/kids-15-cotton-jogger-set.png",
  49: "/kids-16-hoodie-jogger-set.png",
  50: "/kids-17-denim-jacket.png",
  51: "/kids-18-casual-coord-set.png",
};

const product = ({
  id,
  name,
  category,
  subcategory,
  price,
  sizes,
  description,
  crop,
}) => ({
  id,
  name,
  category,
  subcategory,
  price,
  sizes,
  availability: "In Stock",
  description,
  images: [
    WOMEN_IMAGES[id] ||
      MEN_IMAGES[id] ||
      KIDS_IMAGES[id] ||
      CATALOG_IMAGE,
  ],
  crop,
});

const products = [
  // =====================================================
  // WOMEN — 15 PRODUCTS
  // =====================================================

  product({
    id: 1,
    name: "Anarkalis",
    category: "WOMEN",
    subcategory: "ANARKALIS",
    price: 3499,
    sizes: ["S", "M", "L", "XL"],
    description:
      "Elegant embroidered Anarkali dress with a premium festive silhouette.",
    crop: { x: 8, y: 86, w: 112, h: 212 },
  }),

  product({
    id: 2,
    name: "Short Kurtis",
    category: "WOMEN",
    subcategory: "WESTERN",
    price: 1299,
    sizes: ["S", "M", "L", "XL"],
    description:
      "Printed short kurti designed for effortless everyday styling.",
    crop: { x: 130, y: 86, w: 112, h: 212 },
  }),

  product({
    id: 3,
    name: "Palazzo Sets",
    category: "WOMEN",
    subcategory: "TRADITIONAL",
    price: 2699,
    sizes: ["S", "M", "L", "XL"],
    description:
      "Elegant palazzo kurta set with a relaxed premium fit.",
    crop: { x: 251, y: 86, w: 112, h: 212 },
  }),

  product({
    id: 4,
    name: "Saree",
    category: "WOMEN",
    subcategory: "TRADITIONAL",
    price: 3199,
    sizes: ["S", "M", "L", "XL"],
    description:
      "Rich silk saree with a refined traditional gold border.",
    crop: { x: 372, y: 86, w: 112, h: 212 },
  }),

  product({
    id: 5,
    name: "Leggings",
    category: "WOMEN",
    subcategory: "WESTERN",
    price: 799,
    sizes: ["S", "M", "L", "XL"],
    description:
      "Comfortable stretch cotton leggings for everyday wear.",
    crop: { x: 493, y: 86, w: 112, h: 212 },
  }),

  product({
    id: 6,
    name: "Skirts",
    category: "WOMEN",
    subcategory: "WESTERN",
    price: 1499,
    sizes: ["XS", "S", "M", "L"],
    description:
      "Floral midi skirt with an elegant feminine silhouette.",
    crop: { x: 8, y: 389, w: 112, h: 201 },
  }),

  product({
    id: 7,
    name: "Bodycon",
    category: "WOMEN",
    subcategory: "MODERN",
    price: 1999,
    sizes: ["XS", "S", "M", "L"],
    description:
      "Minimal bodycon dress designed for a clean contemporary look.",
    crop: { x: 130, y: 389, w: 112, h: 201 },
  }),

  product({
    id: 8,
    name: "Frock",
    category: "WOMEN",
    subcategory: "MODERN",
    price: 1699,
    sizes: ["S", "M", "L", "XL"],
    description:
      "Tiered frock dress with a soft and playful silhouette.",
    crop: { x: 251, y: 389, w: 112, h: 201 },
  }),

  product({
    id: 9,
    name: "Wedding Lehenga",
    category: "WOMEN",
    subcategory: "TRADITIONAL",
    price: 4499,
    sizes: ["S", "M", "L", "XL"],
    description:
      "Embellished lehenga designed for festive occasions.",
    crop: { x: 372, y: 389, w: 112, h: 201 },
  }),

  product({
    id: 10,
    name: "Top Wear",
    category: "WOMEN",
    subcategory: "TOPS",
    price: 1199,
    sizes: ["S", "M", "L", "XL"],
    description:
      "Ruffle sleeve top with a refined everyday aesthetic.",
    crop: { x: 493, y: 389, w: 112, h: 201 },
  }),

  product({
    id: 11,
    name: "Jeans",
    category: "WOMEN",
    subcategory: "WESTERN",
    price: 1699,
    sizes: ["26", "28", "30", "32"],
    description:
      "High waist jeans with a clean modern fit.",
    crop: { x: 8, y: 704, w: 112, h: 193 },
  }),

  product({
    id: 12,
    name: "Cotton Saree",
    category: "WOMEN",
    subcategory: "TRADITIONAL",
    price: 1899,
    sizes: ["S", "M", "L", "XL"],
    description:
      "Lightweight cotton saree with an elegant everyday finish.",
    crop: { x: 130, y: 704, w: 112, h: 193 },
  }),

  product({
    id: 13,
    name: "Oversized Shirt",
    category: "WOMEN",
    subcategory: "TOPS",
    price: 1499,
    sizes: ["S", "M", "L", "XL"],
    description:
      "Relaxed oversized white shirt for effortless styling.",
    crop: { x: 251, y: 704, w: 112, h: 193 },
  }),

  product({
    id: 14,
    name: "Anarkali Kurta",
    category: "WOMEN",
    subcategory: "ANARKALIS",
    price: 2999,
    sizes: ["S", "M", "L", "XL"],
    description:
      "Elegant navy Anarkali kurta with a premium festive finish.",
    crop: { x: 372, y: 704, w: 112, h: 193 },
  }),

  product({
    id: 15,
    name: "Straight-Cut Kurta Set",
    category: "WOMEN",
    subcategory: "TRADITIONAL",
    price: 2499,
    sizes: ["S", "M", "L", "XL"],
    description:
      "Mustard straight-cut kurta set for modern ethnic styling.",
    crop: { x: 493, y: 704, w: 112, h: 193 },
  }),

  // =====================================================
  // MEN — 18 PRODUCTS
  // =====================================================

  product({
    id: 16,
    name: "Jeans",
    category: "MEN",
    subcategory: "PANTS",
    price: 1799,
    sizes: ["28", "30", "32", "34"],
    description:
      "Classic slim-fit denim jeans for everyday styling.",
    crop: { x: 628, y: 86, w: 91, h: 203 },
  }),

  product({
    id: 17,
    name: "Baggy Pants",
    category: "MEN",
    subcategory: "PANTS",
    price: 1699,
    sizes: ["28", "30", "32", "34"],
    description:
      "Relaxed baggy pants with a contemporary streetwear fit.",
    crop: { x: 731, y: 86, w: 91, h: 203 },
  }),

  product({
    id: 18,
    name: "Formal Pants",
    category: "MEN",
    subcategory: "PANTS",
    price: 1999,
    sizes: ["28", "30", "32", "34"],
    description:
      "Tailored formal trousers designed for polished occasions.",
    crop: { x: 834, y: 86, w: 91, h: 203 },
  }),

  product({
    id: 19,
    name: "Formal Shirt",
    category: "MEN",
    subcategory: "FORMAL SHIRTS",
    price: 1999,
    sizes: ["S", "M", "L", "XL"],
    description:
      "Classic light-blue formal shirt with a clean tailored fit.",
    crop: { x: 937, y: 86, w: 91, h: 203 },
  }),

  product({
    id: 20,
    name: "Casual Shirt",
    category: "MEN",
    subcategory: "CASUAL SHIRTS",
    price: 1699,
    sizes: ["S", "M", "L", "XL"],
    description:
      "Casual denim shirt designed for everyday wear.",
    crop: { x: 1040, y: 86, w: 91, h: 203 },
  }),

  product({
    id: 21,
    name: "T-Shirt",
    category: "MEN",
    subcategory: "T-SHIRTS",
    price: 999,
    sizes: ["S", "M", "L", "XL"],
    description:
      "Essential white cotton T-shirt with a comfortable fit.",
    crop: { x: 628, y: 322, w: 91, h: 200 },
  }),

  product({
    id: 22,
    name: "Cargo Pants",
    category: "MEN",
    subcategory: "PANTS",
    price: 1999,
    sizes: ["28", "30", "32", "34"],
    description:
      "Utility cargo pants with a relaxed contemporary fit.",
    crop: { x: 731, y: 322, w: 91, h: 200 },
  }),

  product({
    id: 23,
    name: "Suit",
    category: "MEN",
    subcategory: "FORMAL WEAR",
    price: 5999,
    sizes: ["S", "M", "L", "XL"],
    description:
      "Premium formal suit designed for special occasions.",
    crop: { x: 834, y: 322, w: 91, h: 200 },
  }),

  product({
    id: 24,
    name: "Classic Crew Neck T-Shirt",
    category: "MEN",
    subcategory: "T-SHIRTS",
    price: 999,
    sizes: ["S", "M", "L", "XL"],
    description:
      "Classic crew neck T-shirt made for everyday comfort.",
    crop: { x: 937, y: 322, w: 91, h: 200 },
  }),

  product({
    id: 25,
    name: "Oversized Graphic T-Shirt",
    category: "MEN",
    subcategory: "T-SHIRTS",
    price: 1299,
    sizes: ["S", "M", "L", "XL"],
    description:
      "Oversized graphic T-shirt with a bold streetwear look.",
    crop: { x: 1040, y: 322, w: 91, h: 200 },
  }),

  product({
    id: 26,
    name: "Denim Jacket",
    category: "MEN",
    subcategory: "JACKETS",
    price: 2999,
    sizes: ["S", "M", "L", "XL"],
    description:
      "Classic blue denim jacket with a structured casual fit.",
    crop: { x: 628, y: 566, w: 91, h: 200 },
  }),

  product({
    id: 27,
    name: "Bomber Jacket",
    category: "MEN",
    subcategory: "JACKETS",
    price: 3499,
    sizes: ["S", "M", "L", "XL"],
    description:
      "Premium black bomber jacket with a modern silhouette.",
    crop: { x: 731, y: 566, w: 91, h: 200 },
  }),

  product({
    id: 28,
    name: "Overshirt Jacket",
    category: "MEN",
    subcategory: "JACKETS",
    price: 2999,
    sizes: ["S", "M", "L", "XL"],
    description:
      "Layer-friendly overshirt jacket with utility styling.",
    crop: { x: 834, y: 566, w: 91, h: 200 },
  }),

  product({
    id: 29,
    name: "Leather Jacket",
    category: "MEN",
    subcategory: "JACKETS",
    price: 4499,
    sizes: ["S", "M", "L", "XL"],
    description:
      "Premium black leather jacket with a clean masculine fit.",
    crop: { x: 937, y: 566, w: 91, h: 200 },
  }),

  product({
    id: 30,
    name: "Utility Jacket",
    category: "MEN",
    subcategory: "JACKETS",
    price: 3499,
    sizes: ["S", "M", "L", "XL"],
    description:
      "Functional utility jacket with a modern structured finish.",
    crop: { x: 1040, y: 566, w: 91, h: 200 },
  }),

  product({
    id: 31,
    name: "Tailored Blazer",
    category: "MEN",
    subcategory: "FORMAL WEAR",
    price: 4999,
    sizes: ["S", "M", "L", "XL"],
    description:
      "Classic black tailored blazer for formal styling.",
    crop: { x: 628, y: 791, w: 91, h: 175 },
  }),

  product({
    id: 32,
    name: "Double-Breasted Blazer",
    category: "MEN",
    subcategory: "FORMAL WEAR",
    price: 5499,
    sizes: ["S", "M", "L", "XL"],
    description:
      "Refined double-breasted blazer with a premium silhouette.",
    crop: { x: 731, y: 791, w: 91, h: 175 },
  }),

  product({
    id: 33,
    name: "Trench Coat",
    category: "MEN",
    subcategory: "JACKETS",
    price: 5999,
    sizes: ["S", "M", "L", "XL"],
    description:
      "Premium trench coat with a sophisticated structured fit.",
    crop: { x: 834, y: 791, w: 91, h: 175 },
  }),

  // =====================================================
  // KIDS — GIRLS — 5 PRODUCTS
  // =====================================================

  product({
    id: 34,
    name: "Floral Party Dress",
    category: "KIDS",
    subcategory: "DRESSES",
    price: 1599,
    sizes: ["2Y", "4Y", "6Y", "8Y"],
    description:
      "Pretty floral party dress designed for special occasions.",
    crop: { x: 1145, y: 102, w: 67, h: 168 },
  }),

  product({
    id: 35,
    name: "Princess Tulle Dress",
    category: "KIDS",
    subcategory: "DRESSES",
    price: 1799,
    sizes: ["2Y", "4Y", "6Y", "8Y"],
    description:
      "Elegant princess tulle dress with a soft playful finish.",
    crop: { x: 1222, y: 102, w: 67, h: 168 },
  }),

  product({
    id: 36,
    name: "Cotton Frock",
    category: "KIDS",
    subcategory: "DRESSES",
    price: 1299,
    sizes: ["2Y", "4Y", "6Y", "8Y"],
    description:
      "Comfortable cotton frock for everyday kidswear.",
    crop: { x: 1300, y: 102, w: 67, h: 168 },
  }),

  product({
    id: 37,
    name: "Denim Pinafore Dress",
    category: "KIDS",
    subcategory: "DRESSES",
    price: 1499,
    sizes: ["2Y", "4Y", "6Y", "8Y"],
    description:
      "Cute denim pinafore dress with a timeless casual style.",
    crop: { x: 1378, y: 102, w: 67, h: 168 },
  }),

  product({
    id: 38,
    name: "Ruffle Sleeve Dress",
    category: "KIDS",
    subcategory: "DRESSES",
    price: 1299,
    sizes: ["2Y", "4Y", "6Y", "8Y"],
    description:
      "Soft pink ruffle sleeve dress for everyday occasions.",
    crop: { x: 1456, y: 102, w: 67, h: 168 },
  }),

  // =====================================================
  // KIDS — BOYS — 8 PRODUCTS
  // =====================================================

  product({
    id: 39,
    name: "Cotton Casual Shirt",
    category: "KIDS",
    subcategory: "SHIRTS",
    price: 999,
    sizes: ["2Y", "4Y", "6Y", "8Y"],
    description:
      "Light-blue cotton casual shirt for boys.",
    crop: { x: 1144, y: 372, w: 76, h: 168 },
  }),

  product({
    id: 40,
    name: "Printed Half-Sleeve Shirt",
    category: "KIDS",
    subcategory: "SHIRTS",
    price: 1099,
    sizes: ["2Y", "4Y", "6Y", "8Y"],
    description:
      "Printed half-sleeve shirt with a playful everyday design.",
    crop: { x: 1230, y: 372, w: 76, h: 168 },
  }),

  product({
    id: 41,
    name: "Denim Shirt",
    category: "KIDS",
    subcategory: "SHIRTS",
    price: 1299,
    sizes: ["2Y", "4Y", "6Y", "8Y"],
    description:
      "Classic denim shirt for casual kidswear styling.",
    crop: { x: 1315, y: 372, w: 76, h: 168 },
  }),

  product({
    id: 42,
    name: "Polo T-Shirt",
    category: "KIDS",
    subcategory: "T-SHIRTS",
    price: 999,
    sizes: ["2Y", "4Y", "6Y", "8Y"],
    description:
      "Classic navy polo T-shirt for boys.",
    crop: { x: 1400, y: 372, w: 76, h: 168 },
  }),

  product({
    id: 43,
    name: "Graphic T-Shirt",
    category: "KIDS",
    subcategory: "T-SHIRTS",
    price: 999,
    sizes: ["2Y", "4Y", "6Y", "8Y"],
    description:
      "Fun graphic T-shirt designed for everyday wear.",
    crop: { x: 1144, y: 609, w: 76, h: 168 },
  }),

  product({
    id: 44,
    name: "Striped T-Shirt",
    category: "KIDS",
    subcategory: "T-SHIRTS",
    price: 899,
    sizes: ["2Y", "4Y", "6Y", "8Y"],
    description:
      "Classic striped T-shirt with a comfortable kids fit.",
    crop: { x: 1230, y: 609, w: 76, h: 168 },
  }),

  product({
    id: 45,
    name: "Cotton Shorts Set",
    category: "KIDS",
    subcategory: "SETS",
    price: 1299,
    sizes: ["2Y", "4Y", "6Y", "8Y"],
    description:
      "Comfortable cotton shorts set for active days.",
    crop: { x: 1315, y: 609, w: 76, h: 168 },
  }),

  product({
    id: 46,
    name: "Cargo Jogger Set",
    category: "KIDS",
    subcategory: "SETS",
    price: 1499,
    sizes: ["2Y", "4Y", "6Y", "8Y"],
    description:
      "Relaxed cargo jogger set with utility-inspired styling.",
    crop: { x: 1400, y: 609, w: 76, h: 168 },
  }),

  // =====================================================
  // KIDS — UNISEX — 5 PRODUCTS
  // =====================================================

  product({
    id: 47,
    name: "Oversized Graphic T-Shirt",
    category: "KIDS",
    subcategory: "T-SHIRTS",
    price: 1199,
    sizes: ["4Y", "6Y", "8Y", "10Y"],
    description:
      "Oversized graphic T-shirt for a modern unisex look.",
    crop: { x: 1146, y: 837, w: 67, h: 115 },
  }),

  product({
    id: 48,
    name: "Cotton Jogger Set",
    category: "KIDS",
    subcategory: "SETS",
    price: 1499,
    sizes: ["4Y", "6Y", "8Y", "10Y"],
    description:
      "Soft cotton jogger set designed for everyday comfort.",
    crop: { x: 1224, y: 837, w: 67, h: 115 },
  }),

  product({
    id: 49,
    name: "Hoodie & Jogger Set",
    category: "KIDS",
    subcategory: "SETS",
    price: 1899,
    sizes: ["4Y", "6Y", "8Y", "10Y"],
    description:
      "Comfortable hoodie and jogger set for casual days.",
    crop: { x: 1300, y: 837, w: 67, h: 115 },
  }),

  product({
    id: 50,
    name: "Denim Jacket",
    category: "KIDS",
    subcategory: "JACKETS",
    price: 1799,
    sizes: ["4Y", "6Y", "8Y", "10Y"],
    description:
      "Classic denim jacket with a versatile unisex fit.",
    crop: { x: 1379, y: 837, w: 67, h: 115 },
  }),

  product({
    id: 51,
    name: "Casual Co-Ord Set",
    category: "KIDS",
    subcategory: "SETS",
    price: 1499,
    sizes: ["4Y", "6Y", "8Y", "10Y"],
    description:
      "Relaxed casual co-ord set designed for everyday wear.",
    crop: { x: 1457, y: 837, w: 67, h: 115 },
  }),
];

export { products };

export default products;